import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRenderer, nextTick, ref } from 'vue'
import ts from 'typescript'

const load = async name => {
  const source = readFileSync(new URL('../src/composables/' + name + '.ts', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } })
  const code = outputText.replace("from 'vue'", 'from ' + JSON.stringify(import.meta.resolve('vue')))
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
}
const renderer = createRenderer({
  createComment: () => ({}), insert() {}, remove() {}, parentNode: () => null, nextSibling: () => null
})
const mount = setup => renderer.createApp({ setup() { setup(); return () => null } })
const reduced = Object.assign(new EventTarget(), { matches: false })
const pointer = Object.assign(new EventTarget(), { matches: true })
globalThis.window = Object.assign(new EventTarget(), {
  matchMedia: query => query.includes('reduced-motion') ? reduced : pointer,
  innerWidth: 1200, innerHeight: 800, devicePixelRatio: 2
})
globalThis.document = Object.assign(new EventTarget(), { hidden: false, querySelector: () => ({ getBoundingClientRect: () => ({ height: 76 }) }) })
let observer
globalThis.IntersectionObserver = class {
  constructor(callback, options) { this.callback = callback; this.options = options; observer = this }
  observe(target) { this.target = target; this.setVisible(true) }
  unobserve() {}
  setVisible(value) { this.callback([{ target: this.target, isIntersecting: value }]) }
  disconnect() { this.disconnected = true }
}

const { useHeroMotion } = await load('useHeroMotion')
let heroTop = 0
const hero = Object.assign(new EventTarget(), { getBoundingClientRect: () => ({ left: 0, top: heroTop, width: 1200, height: 600 }) })
const offsets = new Map()
const orb = { style: { setProperty: (key, value) => offsets.set(key, value) } }
const move = (x, y, type = 'mouse') => hero.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: x, clientY: y, pointerType: type }))
const centered = () => assert.deepEqual([...offsets.values()], ['0px', '0px'])
let active
let motion
const app = mount(() => { motion = useHeroMotion(ref(hero), ref(orb)); active = motion.active })
app.mount({})
assert.equal(active.value, true)
assert.equal(observer.options.rootMargin, '-76px 0px 0px', 'The fixed header is excluded from the visible area')
move(1200, 600)
assert.deepEqual([...offsets.values()], ['8px', '6px'])
assert.deepEqual(motion.pointer.value, { x: 1, y: 1 }, '3D pointer is normalized')
heroTop = -300
window.dispatchEvent(new Event('scroll'))
assert.equal(motion.progress.value, 0.5, 'Scroll depth drives the 3D rotation')
heroTop = -900
window.dispatchEvent(new Event('scroll'))
assert.equal(motion.progress.value, 1, 'Scroll depth remains bounded')
heroTop = 0
move(-500, -500)
assert.deepEqual([...offsets.values()], ['-8px', '-6px'], 'Movement stays bounded')
hero.dispatchEvent(new Event('pointerleave'))
centered()
move(1200, 600, 'touch')
centered()
pointer.matches = false
pointer.dispatchEvent(new Event('change'))
move(1200, 600)
centered()
pointer.matches = true
pointer.dispatchEvent(new Event('change'))
move(1200, 600)
reduced.matches = true
reduced.dispatchEvent(new Event('change'))
assert.equal(active.value, false)
assert.equal(motion.progress.value, 0, 'Reduced motion resets scroll rotation')
move(1200, 600)
centered()
reduced.matches = false
reduced.dispatchEvent(new Event('change'))
move(1200, 600)
document.hidden = true
document.dispatchEvent(new Event('visibilitychange'))
assert.equal(active.value, false)
centered()
document.hidden = false
document.dispatchEvent(new Event('visibilitychange'))
observer.setVisible(false)
assert.equal(active.value, false)
observer.setVisible(true)
assert.equal(active.value, true)
app.unmount()
assert.equal(observer.disconnected, true)
move(1200, 600)
centered()

const { useNeuralCanvas } = await load('useNeuralCanvas')
const frames = new Map()
let frameId = 0
globalThis.requestAnimationFrame = callback => { frames.set(++frameId, callback); return frameId }
globalThis.cancelAnimationFrame = id => frames.delete(id)
const context = { clearRect() {} }
const canvas = { style: {}, getContext: () => context }
const running = ref(false)
const background = mount(() => useNeuralCanvas(ref(canvas), running))
background.mount({})
assert.equal(frames.size, 0)
running.value = true
await nextTick()
assert.equal(frames.size, 1, 'Visible background starts one animation loop')
running.value = false
await nextTick()
assert.equal(frames.size, 0, 'Paused background releases the animation loop')
running.value = true
await nextTick()
background.unmount()
assert.equal(frames.size, 0, 'Unmount releases the animation loop')
console.log('Motion checked: pointer bounds, reset, touch, reduced motion, visibility and cleanup.')

const { useScrollReveal } = await load('useScrollReveal')
let reveals = 0
let cancelled = 0
const section = { animate() { reveals++; return { cancel() { cancelled++ } } } }
globalThis.IntersectionObserver = class {
  constructor(callback) { this.callback = callback; observer = this }
  observe(target) { this.target = target }
  unobserve() {}
  disconnect() { this.disconnected = true }
  setVisible(value) { this.callback([{ target: this.target, isIntersecting: value }]) }
}
const page = mount(() => useScrollReveal(ref({ querySelectorAll: () => [section] })))
page.mount({})
assert.equal(reveals, 0, 'Sections are not animated before becoming visible')
observer.setVisible(false)
assert.equal(reveals, 0)
observer.setVisible(true)
observer.setVisible(true)
assert.equal(reveals, 1, 'Each section is revealed once')
reduced.matches = true
reduced.dispatchEvent(new Event('change'))
assert.equal(cancelled, 1, 'Reduced motion cancels running scroll effects')
page.unmount()
assert.equal(observer.disconnected, true)
const staticPage = mount(() => useScrollReveal(ref({ querySelectorAll: () => [section] })))
staticPage.mount({})
assert.equal(observer.target, undefined, 'Reduced motion keeps sections static')
staticPage.unmount()
console.log('Scroll checked: visibility trigger, single entrance, reduced motion and cleanup.')
