import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ragQuestions } from '@/data/ragDemo'

interface AskChunk { src: string; score: string; text: string }

const PIPE_DELAY_EMBED = 280
const PIPE_DELAY_VECTOR = 360
const PIPE_DELAY_RETRIEVE = 420
const PIPE_DELAY_LLM = 380
const TYPING_DELAY = 14

export function useRagDemoSimulation() {
  const { t } = useI18n()

  const askIndex = ref<number | null>(null)
  const askLoading = ref(false)
  const askChunks = ref<AskChunk[]>([])
  const askAnswer = ref('')
  const pipeStep = ref(0)

  let typingTimer: ReturnType<typeof setTimeout> | null = null

  const delay = (ms: number) =>
    new Promise<void>(resolve => {
      typingTimer = setTimeout(() => resolve(), ms)
    })

  async function ask(idx: number) {
    if (askLoading.value) return
    askIndex.value = idx
    askLoading.value = true
    askChunks.value = []
    askAnswer.value = ''
    pipeStep.value = 0

    const item = ragQuestions[idx]
    if (!item) return

    pipeStep.value = 1
    await delay(PIPE_DELAY_EMBED)
    pipeStep.value = 2
    await delay(PIPE_DELAY_VECTOR)
    pipeStep.value = 3
    await delay(PIPE_DELAY_RETRIEVE)
    askChunks.value = item.chunks.map(c => ({ src: c.src, score: c.score, text: t(c.textKey) }))
    pipeStep.value = 4
    await delay(PIPE_DELAY_LLM)

    pipeStep.value = 5
    const text = t(item.answerKey)
    for (let i = 0; i <= text.length; i++) {
      askAnswer.value = text.slice(0, i)
      await delay(TYPING_DELAY)
    }
    askLoading.value = false
  }

  onUnmounted(() => {
    if (typingTimer) clearTimeout(typingTimer)
  })

  return { askIndex, askLoading, askChunks, askAnswer, pipeStep, ask }
}
