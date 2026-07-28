import type { Locale } from '@/plugins/i18n'

export type ConversationRole = 'user' | 'assistant'
export type AnswerStatus = 'answered' | 'partial' | 'insufficient'
export type ClaimType = 'experience' | 'profile' | 'opinion'
export type DocumentType = 'case_study' | 'profile' | 'essay'

export interface ConversationMessage {
  role: ConversationRole
  content: string
}

export interface AskRequest {
  question: string
  locale: Locale
  history: ConversationMessage[]
}

export interface ClaimAnswerItem {
  kind: 'claim'
  claimType: ClaimType
  text: string
  citationIds: string[]
}

export interface LimitationAnswerItem {
  kind: 'limitation'
  text: string
}

export type AnswerItem = ClaimAnswerItem | LimitationAnswerItem

export interface Citation {
  id: string
  documentId: string
  sourceId: string
  documentVersion: number
  documentType: DocumentType
  title: string
  section: string
  excerpt: string
  sourceUrl: string
}

export interface AskResponse {
  status: AnswerStatus
  answerItems: AnswerItem[]
  citations: Citation[]
}

export type AskErrorCode =
  | 'invalid_request'
  | 'rate_limited'
  | 'unavailable'
  | 'timeout'
  | 'network'
  | 'unexpected'

export class AskApiError extends Error {
  constructor(public readonly code: AskErrorCode) {
    super(code)
    this.name = 'AskApiError'
  }
}

const ASK_TIMEOUT_MS = 20_000

export async function askPortfolio(request: AskRequest): Promise<AskResponse> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), ASK_TIMEOUT_MS)

  try {
    const response = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal
    })

    if (!response.ok) throw new AskApiError(errorCodeForStatus(response.status))

    const payload: unknown = await response.json()
    if (!isAskResponse(payload)) throw new AskApiError('unexpected')

    return payload
  } catch (error) {
    if (error instanceof AskApiError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AskApiError('timeout')
    }
    if (error instanceof TypeError) throw new AskApiError('network')
    throw new AskApiError('unexpected')
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function errorCodeForStatus(status: number): AskErrorCode {
  if (status === 413 || status === 422) return 'invalid_request'
  if (status === 429) return 'rate_limited'
  if (status === 503) return 'unavailable'
  return 'unexpected'
}

function isAskResponse(value: unknown): value is AskResponse {
  if (!isRecord(value)) return false
  if (!isAnswerStatus(value.status)) return false
  if (!Array.isArray(value.answerItems) || !value.answerItems.every(isAnswerItem)) return false
  return Array.isArray(value.citations) && value.citations.every(isCitation)
}

function isAnswerItem(value: unknown): value is AnswerItem {
  if (!isRecord(value) || typeof value.text !== 'string') return false
  if (value.kind === 'limitation') return true
  return (
    value.kind === 'claim' &&
    isClaimType(value.claimType) &&
    Array.isArray(value.citationIds) &&
    value.citationIds.every(id => typeof id === 'string')
  )
}

function isCitation(value: unknown): value is Citation {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.documentId === 'string' &&
    typeof value.sourceId === 'string' &&
    typeof value.documentVersion === 'number' &&
    isDocumentType(value.documentType) &&
    typeof value.title === 'string' &&
    typeof value.section === 'string' &&
    typeof value.excerpt === 'string' &&
    typeof value.sourceUrl === 'string'
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAnswerStatus(value: unknown): value is AnswerStatus {
  return value === 'answered' || value === 'partial' || value === 'insufficient'
}

function isClaimType(value: unknown): value is ClaimType {
  return value === 'experience' || value === 'profile' || value === 'opinion'
}

function isDocumentType(value: unknown): value is DocumentType {
  return value === 'case_study' || value === 'profile' || value === 'essay'
}
