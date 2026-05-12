import type { IProject } from '@/interfaces/project'

export const projects: IProject[] = [
  {
    slug: 'super_app',
    title: 'Super-App Fictor Alimentos',
    technologies: ['Flutter', 'NestJS', 'React', 'TypeScript', 'Kubernetes', 'RabbitMQ'],
    status: 'private',
  },
  {
    slug: 'fictor360_pbi',
    title: 'Fictor360 — Power BI Embedded',
    technologies: ['Power BI', 'NestJS', 'TypeScript', 'Azure AD', 'GraphQL'],
    status: 'private',
  },
  {
    slug: 'hr_platform',
    title: 'Plataforma de RH com IA',
    technologies: ['NestJS', 'React', 'PostgreSQL', 'pgvector', 'Azure OpenAI', 'Azure AD', 'Bull'],
    status: 'private',
  },
  {
    slug: 'fictor360_ai',
    title: 'Fictor360 AI — Insights com IA',
    technologies: ['LangGraph', 'Azure OpenAI', 'NestJS', 'TypeScript', 'Power BI MCP', 'DAX'],
    status: 'private',
  },
  {
    slug: 'candidate_portal',
    title: 'Portal do Candidato — Fictor Alimentos',
    technologies: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'OAuth2', 'Azure OpenAI', 'SendGrid'],
    status: 'private',
  },
  {
    slug: 'data_pipeline',
    title: 'Pipeline de Dados BI',
    technologies: ['Python', 'Pandas', 'Metabase', 'Power BI', 'SQL'],
    status: 'private',
  },
]
