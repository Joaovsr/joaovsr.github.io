import type { ISkill } from '@/interfaces/skill'

export const skills: ISkill[] = [
  // Frontend
  { id: 1, name: 'React', category: 'frontend' },
  { id: 2, name: 'TypeScript', category: 'frontend' },
  { id: 3, name: 'JavaScript', category: 'frontend' },
  { id: 4, name: 'Vue.js', category: 'frontend' },
  { id: 5, name: 'HTML / CSS', category: 'frontend' },
  { id: 6, name: 'SCSS', category: 'frontend' },

  // Backend
  { id: 7, name: 'NestJS', category: 'backend' },
  { id: 8, name: 'Node.js', category: 'backend' },
  { id: 9, name: 'Python', category: 'backend' },
  { id: 10, name: 'Java', category: 'backend' },
  { id: 11, name: 'REST APIs', category: 'backend' },

  // Mobile
  { id: 12, name: 'Flutter', category: 'mobile' },
  { id: 13, name: 'Dart', category: 'mobile' },

  // Data & AI
  { id: 14, name: 'ETL / Pipelines', category: 'data-ai' },
  { id: 15, name: 'RPA / Automação', category: 'data-ai' },
  { id: 16, name: 'Metabase', category: 'data-ai' },
  { id: 17, name: 'Power BI', category: 'data-ai' },
  { id: 18, name: 'IA Generativa', category: 'data-ai' },
  { id: 19, name: 'Prompt Engineering', category: 'data-ai' },

  // DevOps
  { id: 20, name: 'Docker', category: 'devops' },
  { id: 21, name: 'Kubernetes', category: 'devops' },
  { id: 22, name: 'Git / CI-CD', category: 'devops' },
  { id: 23, name: 'Linux / Bash', category: 'devops' },
  { id: 24, name: 'Azure', category: 'devops' }
]

export const skillCategories: Record<ISkill['category'], Record<string, string>> = {
  'frontend': { 'pt-BR': 'Frontend', 'en-US': 'Frontend' },
  'backend': { 'pt-BR': 'Backend', 'en-US': 'Backend' },
  'mobile': { 'pt-BR': 'Mobile', 'en-US': 'Mobile' },
  'data-ai': { 'pt-BR': 'Dados & IA', 'en-US': 'Data & AI' },
  'devops': { 'pt-BR': 'DevOps / Infra', 'en-US': 'DevOps / Infra' }
}
