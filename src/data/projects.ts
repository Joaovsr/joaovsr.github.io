import type { IProject } from '@/interfaces/project'

export const projects: IProject[] = [
  {
    slug: 'fictor360_ai',
    title: 'Fictor360 AI — Agente Conversacional com Power BI',
    technologies: ['LangChain', 'Azure OpenAI', 'TypeScript', 'Power BI MCP', 'DAX', 'WebSocket'],
    status: 'private',
    images: ['/projects/fictor360ai.webp']
  },
  {
    slug: 'hr_platform',
    title: 'Plataforma de Gestão de Pessoas com IA',
    technologies: ['NestJS', 'React', 'PostgreSQL', 'pgvector', 'Azure OpenAI', 'Azure AD', 'Bull', 'Microsoft Teams', 'Kubernetes'],
    status: 'private',
    images: ['/projects/hr-platform.webp', '/projects/hr-platform-2.webp']
  },
  {
    slug: 'agente_financeiro',
    title: 'Agente Financeiro',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Telegram', 'OpenAI'],
    status: 'public',
    repoUrl: 'https://github.com/Joaovsr/agente-financeiro'
  },
  {
    slug: 'super_app',
    title: 'InCubo — Super-App Fictor Alimentos',
    technologies: ['Flutter', 'NestJS', 'React', 'TypeScript', 'Kubernetes', 'RabbitMQ', 'Azure AD'],
    status: 'private',
    images: ['/projects/super-app-mobile.webp']
  },
  {
    slug: 'yt_signals',
    title: 'YT Signals',
    technologies: ['React', 'TypeScript', 'Node.js', 'OpenAI', 'YouTube API', 'Chrome Extension'],
    status: 'public',
    repoUrl: 'https://github.com/Joaovsr/yt-signals',
    images: ['/projects/yt-signals.webp']
  },
  {
    slug: 'ask_about_me',
    title: 'Ask About Me',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI', 'SQLAlchemy'],
    status: 'public',
    repoUrl: 'https://github.com/Joaovsr/ask-about-me'
  },
  {
    slug: 'theo_glpi',
    title: 'Theo GLPI',
    technologies: ['Node.js', 'JavaScript', 'OpenAI', 'Microsoft Teams', 'GLPI', 'Adaptive Cards'],
    status: 'public',
    repoUrl: 'https://github.com/Joaovsr/theo-glpi'
  },
  {
    slug: 'candidate_portal',
    title: 'Portal do Candidato — Fictor Alimentos',
    technologies: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'OAuth2', 'Azure OpenAI', 'Webhooks HMAC'],
    status: 'private',
    images: ['/projects/candidate-portal.webp', '/projects/candidate-portal-2.webp']
  },
  {
    slug: 'fictor360_pbi',
    title: 'Fictor360 — Power BI Embedded',
    technologies: ['Power BI Embedded', 'NestJS', 'TypeScript', 'Azure AD', 'RLS', 'API'],
    status: 'private',
    images: ['/projects/fictor360.webp']
  },
  {
    slug: 'data_pipeline',
    title: 'Pipeline de Dados BI',
    technologies: ['Python', 'Pandas', 'Metabase', 'Power BI', 'SQL'],
    status: 'private',
    images: ['/projects/data-pipeline.webp']
  },
  {
    slug: 'filmoteca_tmdb',
    title: 'Filmoteca TMDB',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'Paging 3', 'Koin'],
    status: 'public',
    repoUrl: 'https://github.com/Joaovsr/fimoteca-tmbd',
    images: ['/projects/filmoteca-tmdb.webp']
  }
]
