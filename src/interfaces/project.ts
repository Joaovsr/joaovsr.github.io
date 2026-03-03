export interface IProject {
  id: number
  title: string
  description: Record<string, string>
  technologies: string[]
  repoUrl?: string
  siteUrl?: string
  status?: 'private' | 'public'
}
