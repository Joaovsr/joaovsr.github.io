import type { Locale } from '@/plugins/i18n'

export interface PortfolioProfile {
  name: string
  nameShort: string
  email: string
  avatar: string
  brand: string
  careerStart: string
  github: string
  linkedin: string
  role: string
  roleSub: string
  location: string
  tagline: string
  aboutLead: string
  aboutBody: string
  differentials: string[]
  openTo: string
  languages: Array<{ name: string; level: string }>
}

export interface PortfolioExperience {
  slug: string
  company: string
  startDate: string
  finishDate?: string
  skills: string[]
  role: string
  description: string
}

export interface PortfolioProject {
  slug: string
  title: string
  description: string
  problem: string
  solution: string
  result: string
  technologies: string[]
  status: 'private' | 'public'
  images: string[]
}

export interface PortfolioContent {
  revision: number
  locale: Locale
  profile: PortfolioProfile
  experiences: PortfolioExperience[]
  projects: PortfolioProject[]
}

export async function getPortfolioContent(locale: Locale): Promise<PortfolioContent> {
  const response = await fetch(`/portfolio?locale=${encodeURIComponent(locale)}`)
  if (!response.ok) throw new Error('portfolio content is unavailable')
  return (await response.json()) as PortfolioContent
}
