import type { IExperience } from '@/interfaces/experience'

export const experiences: IExperience[] = [
  {
    slug: 'fictor',
    company: 'Fictor Alimentos',
    startDate: '2025-03',
    finishDate: '2026-04',
    skills: ['Flutter', 'React', 'Node.js', 'TypeScript', 'RAG', 'Azure OpenAI', 'pgvector', 'LLM', 'Docker', 'Kubernetes', 'CI/CD', 'Azure AD']
  },
  {
    slug: 'atalaia_dev',
    company: 'Atalaia Alimentos',
    startDate: '2024-01',
    finishDate: '2025-03',
    location: 'Barbacena, MG',
    onsite: true,
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
