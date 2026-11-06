export interface IExperience {
  slug: string
  company: string
  companyKey?: string
  startDate: string
  finishDate?: string
  skills: string[]
  companyUrl?: string
  location?: string
  workMode?: 'onsite' | 'remote'
}
