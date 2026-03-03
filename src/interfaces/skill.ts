export interface ISkill {
  id: number
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'data-ai' | 'devops'
  icon?: string
}
