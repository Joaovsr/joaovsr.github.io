import type { IProject } from '@/interfaces/project'

export const projects: IProject[] = [
  {
    slug: 'super_app',
    title: 'InCubo — Super-App Fictor Alimentos',
    technologies: ['Flutter', 'NestJS', 'React', 'TypeScript', 'Kubernetes', 'RabbitMQ', 'Azure AD'],
    status: 'private',
    images: ['/projects/super-app-mobile.webp']
  },
  {
    slug: 'fictor360_pbi',
    title: 'Fictor360 — Power BI Embedded',
    technologies: ['Power BI Embedded', 'NestJS', 'TypeScript', 'Azure AD', 'RLS', 'API'],
    status: 'private',
    images: ['/projects/fictor360.webp']
  },
  {
    slug: 'hr_platform',
    title: 'Plataforma de Gestão de Pessoas com IA',
    technologies: ['NestJS', 'React', 'PostgreSQL', 'pgvector', 'Azure OpenAI', 'Azure AD', 'Bull', 'Microsoft Teams', 'Kubernetes'],
    status: 'private',
    images: ['/projects/hr-platform.webp', '/projects/hr-platform-2.webp']
  },
  {
    slug: 'fictor360_ai',
    title: 'Fictor360 AI — Agente Conversacional com Power BI',
    technologies: ['LangChain', 'Azure OpenAI', 'TypeScript', 'Power BI MCP', 'DAX', 'WebSocket'],
    status: 'private',
    images: ['/projects/fictor360ai.webp']
  },
  {
    slug: 'candidate_portal',
    title: 'Portal do Candidato — Fictor Alimentos',
    technologies: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'OAuth2', 'Azure OpenAI', 'Webhooks HMAC'],
    status: 'private',
    images: ['/projects/candidate-portal.webp', '/projects/candidate-portal-2.webp']
  },
  {
    slug: 'data_pipeline',
    title: 'Pipeline de Dados BI',
    technologies: ['Python', 'Pandas', 'Metabase', 'Power BI', 'SQL'],
    status: 'private',
    images: ['/projects/data-pipeline.webp']
  }
]
