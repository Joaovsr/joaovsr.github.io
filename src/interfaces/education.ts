export interface IEducation {
  slug: string
  institution: string
  startDate: string
  finishDate?: string
  ongoing?: boolean
}

export interface ICertification {
  id: number
  title: string
  issuer: string
  status?: 'completed' | 'in-progress'
  credentialUrl?: string
}
