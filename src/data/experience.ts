import type { IExperience } from '@/interfaces/experience'

export const experiences: IExperience[] = [
  {
    slug: 'self_employed',
    company: 'Autônomo',
    companyKey: 'experience.self_employed.company',
    startDate: '2026-06',
    workMode: 'remote',
    skills: ['Python', 'TypeScript', 'FastAPI', 'NestJS', 'RAG', 'Azure OpenAI', 'Celery', 'Redis', 'AWS', 'AWS Lambda', 'Amazon ECS']
  },
  {
    slug: 'fictor',
    company: 'Fictor Alimentos',
    startDate: '2025-03',
    finishDate: '2026-05',
    location: 'Belo Horizonte, MG',
    skills: ['Flutter', 'React', 'Next.js', 'NestJS', 'TypeScript', 'Python', 'FastAPI', 'LangGraph', 'MCP', 'Power BI Embedded', 'Microsoft Entra ID', 'Azure DevOps', 'Docker', 'Kubernetes']
  },
  {
    slug: 'atalaia_dev',
    company: 'Atalaia Alimentos',
    startDate: '2024-01',
    finishDate: '2025-03',
    location: 'Barbacena, MG',
    workMode: 'onsite',
    skills: ['NestJS', 'React', 'TypeScript', 'Python', 'WhatsApp', 'Pandas', 'ETL', 'Metabase', 'SQL']
  },
  {
    slug: 'atalaia_it',
    company: 'Atalaia Alimentos',
    startDate: '2022-09',
    finishDate: '2023-12',
    skills: ['Python', 'Selenium', 'RPA', 'Django', 'Suporte Técnico', 'Infraestrutura', 'Deploy']
  },
  {
    slug: 'inss',
    company: 'INSS',
    startDate: '2019-08',
    finishDate: '2020-05',
    skills: ['Suporte Técnico', 'Hardware', 'Redes', 'Infraestrutura']
  }
]
