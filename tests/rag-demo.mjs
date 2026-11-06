import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRenderer, nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { baseCompile } from '@intlify/message-compiler'
import ts from 'typescript'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const compile = source => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
}).outputText
const moduleUrl = code => 'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
const dataUrl = moduleUrl(compile(read('src/data/ragDemo.ts')))
const { ragQuestions, ragPipeline } = await import(dataUrl)
assert.equal(new Set(ragQuestions.map(question => question.id)).size, ragQuestions.length, 'Questions need unique IDs')
assert.equal(new Set(ragQuestions.map(question => question.questionKey)).size, ragQuestions.length, 'Questions need unique translation keys')
const questionById = new Map(ragQuestions.map(question => [question.id, question]))
for (const question of ragQuestions) {
  assert.ok(question.relatedIds.length >= 2, 'Every answer needs related follow-up questions')
  assert.equal(new Set(question.relatedIds).size, question.relatedIds.length, 'Related questions must be unique')
  for (const id of question.relatedIds) {
    assert.ok(questionById.has(id), 'Related question must exist: ' + id)
    assert.notEqual(id, question.id, 'A question must not recommend itself')
  }
}
assert.deepEqual(new Set(questionById.get('q23').relatedIds), new Set(['q3', 'q5', 'q24', 'q6']), 'Career overview must lead to Fictor, Atalaia, INSS and self-employment')
assert.ok(ragQuestions.slice(0, 6).some(question => question.id === 'q21'), 'Personal introduction must be visible initially')
assert.ok(ragQuestions.slice(0, 6).some(question => question.id === 'q23'), 'Career overview must be visible initially')
const source = compile(read('src/composables/useRagDemoSimulation.ts'))
  .replace("from 'vue'", 'from ' + JSON.stringify(import.meta.resolve('vue')))
  .replace("from 'vue-i18n'", 'from ' + JSON.stringify(import.meta.resolve('vue-i18n')))
  .replace("from '@/data/ragDemo'", 'from ' + JSON.stringify(dataUrl))
const { useRagDemoSimulation } = await import(moduleUrl(source))
const messages = {
  'pt-BR': JSON.parse(read('src/locales/pt-BR.json')),
  'en-US': JSON.parse(read('src/locales/en-US.json'))
}
const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages })
const renderer = createRenderer({
  createComment: () => ({}), insert() {}, remove() {}, parentNode: () => null, nextSibling: () => null
})
const media = { matches: true }
globalThis.window = { matchMedia: () => media }
const originalSetTimeout = globalThis.setTimeout
const originalClearTimeout = globalThis.clearTimeout
let timerId = 0
const timers = new Map()
globalThis.setTimeout = callback => { timers.set(++timerId, callback); return timerId }
globalThis.clearTimeout = id => timers.delete(id)
let demo
const app = renderer.createApp({ setup() { demo = useRagDemoSimulation(); return () => null } })
app.use(i18n)
app.mount({})

for (const locale of Object.keys(messages)) {
  i18n.global.locale.value = locale
  await nextTick()
  for (const node of ragPipeline) {
    assert.notEqual(i18n.global.t(node.labelKey), node.labelKey, 'Every pipeline label must be translated')
  }
  for (const [index, question] of ragQuestions.entries()) {
    for (const key of [question.questionKey, question.answerKey, ...question.chunks.map(chunk => chunk.textKey)]) {
      const message = key.split('.').reduce((value, part) => value?.[part], messages[locale])
      assert.equal(typeof message, 'string', 'Missing translation: ' + key)
      baseCompile(message, { onError: error => { throw error } })
    }
    assert.notEqual(i18n.global.t(question.questionKey), question.questionKey, 'Every question must be translated')
    assert.notEqual(i18n.global.t(question.answerKey), question.answerKey, 'Every answer must be translated')
    await demo.ask(index)
    assert.equal(demo.askIndex.value, index)
    assert.equal(demo.askLoading.value, false)
    assert.equal(demo.pipeStep.value, 5)
    assert.equal(demo.askAnswer.value, i18n.global.t(question.answerKey))
    for (const [chunkIndex, chunk] of question.chunks.entries()) {
      assert.equal(demo.askChunks.value[chunkIndex].text, i18n.global.t(chunk.textKey))
      assert.notEqual(demo.askChunks.value[chunkIndex].text, chunk.textKey, 'Every excerpt must be translated')
      assert.ok(existsSync(new URL('../' + chunk.src.split('#')[0], import.meta.url)), 'Context source must exist: ' + chunk.src)
    }
    assert.equal(timers.size, 0, 'Reduced motion skips simulated delays and typing')
  }
}
const previousIndex = demo.askIndex.value
await demo.ask(-1)
await demo.ask(ragQuestions.length)
assert.equal(demo.askIndex.value, previousIndex, 'Invalid selections preserve the previous answer')

media.matches = false
const streaming = demo.ask(0)
assert.equal(demo.askLoading.value, true)
await demo.ask(1)
assert.equal(demo.askIndex.value, 0, 'A second request cannot interrupt the current one')
let ticks = 0
while (timers.size && ticks++ < 1000) {
  const [id, callback] = timers.entries().next().value
  timers.delete(id)
  callback()
  await Promise.resolve()
}
assert.ok(ticks < 1000, 'The response must finish')
await streaming
assert.equal(demo.askAnswer.value, i18n.global.t(ragQuestions[0].answerKey), 'Streaming preserves the complete answer')
assert.equal(demo.askLoading.value, false)

const cancelled = demo.ask(1)
i18n.global.locale.value = 'pt-BR'
await nextTick()
await cancelled
assert.equal(timers.size, 0, 'Changing language cancels pending work')
assert.equal(demo.askIndex.value, null)
assert.equal(demo.askAnswer.value, '')
assert.equal(demo.askLoading.value, false)

const unmounted = demo.ask(2)
app.unmount()
await unmounted
assert.equal(timers.size, 0, 'Unmount releases the pending timer')
assert.equal(demo.askLoading.value, false)
globalThis.setTimeout = originalSetTimeout
globalThis.clearTimeout = originalClearTimeout
console.log('RAG demo checked: personal introduction, career follow-ups, related questions, translations, context, complete answers, reduced motion, invalid selections and cancellation.')
