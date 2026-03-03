export interface IExperience {
  id: number
  company: string
  role: Record<string, string>
  description: Record<string, string>
  startDate: string
  finishDate?: string
  skills: string[]
  companyUrl?: string
}
