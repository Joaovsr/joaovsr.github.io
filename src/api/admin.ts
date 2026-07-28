export interface AdminCaseStudySection {
  position: number
  headingPtBr: string
  headingEnUs: string
  bodyPtBr: string
  bodyEnUs: string
}

export interface AdminCaseStudy {
  id: string
  revision: number
  slug: string
  titlePtBr: string
  titleEnUs: string
  sections: AdminCaseStudySection[]
}

export interface PublishCaseStudyRequest {
  slug: string
  titlePtBr: string
  titleEnUs: string
  expectedCurrentRevision: number | null
  sections: AdminCaseStudySection[]
}

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'AdminApiError'
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, { credentials: 'same-origin', ...options })
  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null)
    const message =
      typeof payload === 'object' && payload !== null && 'detail' in payload
        ? String(payload.detail)
        : 'Não foi possível concluir a operação.'
    throw new AdminApiError(response.status, message)
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T)
}

export function createAdminSession(password: string): Promise<void> {
  return request('/admin/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
}

export async function getAdminCsrfToken(): Promise<string> {
  return (await request<{ token: string }>('/admin/csrf')).token
}

export function listAdminCaseStudies(): Promise<AdminCaseStudy[]> {
  return request('/admin/case-studies')
}

export function publishAdminCaseStudy(
  payload: PublishCaseStudyRequest,
  csrfToken: string
): Promise<AdminCaseStudy> {
  return request('/admin/case-studies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(payload)
  })
}
