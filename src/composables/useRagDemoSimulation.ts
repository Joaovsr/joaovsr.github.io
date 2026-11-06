import { onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ragQuestions } from '@/data/ragDemo'

interface AskChunk { src: string; score: string; text: string }

export function useRagDemoSimulation() {
  const { t, locale } = useI18n()
  const askIndex = ref<number | null>(null)
  const askLoading = ref(false)
  const askChunks = ref<AskChunk[]>([])
  const askAnswer = ref('')
  const pipeStep = ref(0)
  let timer: ReturnType<typeof setTimeout> | undefined
  let finishDelay: ((completed: boolean) => void) | undefined

  const delay = (ms: number) => new Promise<boolean>(resolve => {
    finishDelay = resolve
    timer = setTimeout(() => {
      timer = undefined
      finishDelay = undefined
      resolve(true)
    }, ms)
  })

  function reset() {
    clearTimeout(timer)
    timer = undefined
    finishDelay?.(false)
    finishDelay = undefined
    askIndex.value = null
    askLoading.value = false
    askChunks.value = []
    askAnswer.value = ''
    pipeStep.value = 0
  }

  async function ask(index: number) {
    const item = ragQuestions[index]
    if (askLoading.value || !item) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const chunks = item.chunks.map(chunk => ({ src: chunk.src, score: chunk.score, text: t(chunk.textKey) }))
    const answer = t(item.answerKey)
    askIndex.value = index
    askLoading.value = true
    askChunks.value = []
    askAnswer.value = ''
    pipeStep.value = 0

    for (let step = 1; step <= 4; step++) {
      pipeStep.value = step
      if (!reducedMotion.matches && !await delay(180)) return
      if (step === 3) askChunks.value = chunks
    }
    pipeStep.value = 5
    for (let length = 4; length < answer.length && !reducedMotion.matches; length += 4) {
      askAnswer.value = answer.slice(0, length)
      if (!await delay(18)) return
    }
    askAnswer.value = answer
    askLoading.value = false
  }

  watch(locale, reset)
  onUnmounted(reset)
  return { askIndex, askLoading, askChunks, askAnswer, pipeStep, ask }
}
