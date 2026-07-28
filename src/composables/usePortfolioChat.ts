import { ref } from 'vue'
import {
  AskApiError,
  askPortfolio,
  type AskErrorCode,
  type AskResponse,
  type ConversationMessage
} from '@/api/ask'
import type { Locale } from '@/plugins/i18n'

export interface PortfolioChatTurn {
  id: number
  question: string
  response: AskResponse
}

const MAX_HISTORY_MESSAGES = 8
const MAX_HISTORY_MESSAGE_CHARACTERS = 2_000
const MAX_CONVERSATION_CHARACTERS = 8_000

export function usePortfolioChat() {
  const turns = ref<PortfolioChatTurn[]>([])
  const loading = ref(false)
  const pendingQuestion = ref('')
  const failedQuestion = ref('')
  const errorCode = ref<AskErrorCode | null>(null)
  let nextTurnId = 1

  async function ask(question: string, locale: Locale): Promise<boolean> {
    const normalizedQuestion = question.trim()
    if (!normalizedQuestion || loading.value) return false

    loading.value = true
    pendingQuestion.value = normalizedQuestion
    failedQuestion.value = ''
    errorCode.value = null

    try {
      const response = await askPortfolio({
        question: normalizedQuestion,
        locale,
        history: buildHistory(turns.value, normalizedQuestion)
      })

      turns.value.push({ id: nextTurnId++, question: normalizedQuestion, response })
      return true
    } catch (error) {
      errorCode.value = error instanceof AskApiError ? error.code : 'unexpected'
      failedQuestion.value = normalizedQuestion
      return false
    } finally {
      loading.value = false
      pendingQuestion.value = ''
    }
  }

  function retry(locale: Locale): Promise<boolean> {
    return ask(failedQuestion.value, locale)
  }

  return {
    turns,
    loading,
    pendingQuestion,
    failedQuestion,
    errorCode,
    ask,
    retry
  }
}

function buildHistory(turns: PortfolioChatTurn[], nextQuestion: string): ConversationMessage[] {
  const availableCharacters = MAX_CONVERSATION_CHARACTERS - nextQuestion.length
  const history: ConversationMessage[] = []
  let characterCount = 0

  for (const turn of turns.slice(-(MAX_HISTORY_MESSAGES / 2)).reverse()) {
    const turnMessages: ConversationMessage[] = [
      {
        role: 'user',
        content: turn.question.slice(0, MAX_HISTORY_MESSAGE_CHARACTERS)
      },
      {
        role: 'assistant',
        content: turn.response.answerItems
          .map(item => item.text)
          .join('\n\n')
          .slice(0, MAX_HISTORY_MESSAGE_CHARACTERS)
      }
    ]
    const turnCharacterCount = turnMessages.reduce(
      (total, message) => total + message.content.length,
      0
    )

    if (characterCount + turnCharacterCount > availableCharacters) break
    history.unshift(...turnMessages)
    characterCount += turnCharacterCount
  }

  return history
}
