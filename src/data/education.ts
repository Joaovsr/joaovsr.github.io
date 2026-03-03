import type { IEducation, ICertification } from '@/interfaces/education'

export const education: IEducation[] = [
  {
    id: 1,
    institution: 'Estácio',
    degree: {
      'pt-BR': 'Gestão da Tecnologia da Informação',
      'en-US': 'Information Technology Management'
    },
    startDate: '2024',
    finishDate: '2026',
    ongoing: true
  },
  {
    id: 2,
    institution: 'IF Sudeste de Minas',
    degree: {
      'pt-BR': 'Técnico em Informática',
      'en-US': 'Technical in Computer Science'
    },
    startDate: '2019',
    finishDate: '2022'
  }
]

export const certifications: ICertification[] = [
  {
    id: 1,
    title: 'CS50: Introdução à Ciência da Computação',
    issuer: 'Harvard University (Fundação Estudar)',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Ka Solution',
    status: 'completed'
  },
  {
    id: 3,
    title: 'AI Engineer Roadmap — Azure AI-900 & AI-102',
    issuer: 'Microsoft Azure',
    status: 'in-progress'
  }
]
