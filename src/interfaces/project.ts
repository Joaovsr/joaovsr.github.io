export interface IProject {
  slug: string
  title: string
  technologies: string[]
  repoUrl?: string
  siteUrl?: string
  status?: 'private' | 'public'
  images?: string[]
}
