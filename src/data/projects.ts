import type { IProject } from '@/interfaces/project'

export const projects: IProject[] = [
  {
    id: 1,
    title: 'Super-App Fictor',
    description: {
      'pt-BR':
        'App interno de operações e logística com arquitetura modular. Flutter no frontend mobile, NestJS no backend, deploy com Kubernetes. Inclui automações inteligentes e integrações com sistemas internos.',
      'en-US':
        'Internal operations and logistics app with modular architecture. Flutter on mobile frontend, NestJS on backend, deployed with Kubernetes. Includes intelligent automation and integrations with internal systems.'
    },
    technologies: ['Flutter', 'NestJS', 'TypeScript', 'Kubernetes', 'Docker'],
    status: 'private'
  },
  {
    id: 2,
    title: 'Pipeline de Dados BI',
    description: {
      'pt-BR':
        'Pipelines de dados em Python para raspagem, tratamento e estruturação de informações. Implantação do Metabase como BI interno com dashboards para suporte à decisão, integrado ao Power BI.',
      'en-US':
        'Python data pipelines for scraping, processing and structuring information. Metabase deployment as internal BI with decision-support dashboards, integrated with Power BI.'
    },
    technologies: ['Python', 'Metabase', 'Power BI', 'ETL', 'SQL'],
    status: 'private'
  },
  {
    id: 3,
    title: 'RPA para ERP Legado',
    description: {
      'pt-BR':
        'Robôs em Python para extração automatizada de dados de ERP legado sem acesso via API ou banco de dados. Utilizando técnicas de scraping e automação de interface para otimizar processos manuais.',
      'en-US':
        'Python robots for automated data extraction from legacy ERP without API or database access. Using scraping and UI automation techniques to optimize manual processes.'
    },
    technologies: ['Python', 'RPA', 'Automação', 'Web Scraping'],
    status: 'private'
  },
  {
    id: 4,
    title: 'Sudoku do Dia',
    description: {
      'pt-BR': 'Aplicativo mobile de Sudoku construído com Flutter e Dart. Geração de puzzles diários com diferentes níveis de dificuldade.',
      'en-US': 'Mobile Sudoku app built with Flutter and Dart. Daily puzzle generation with different difficulty levels.'
    },
    technologies: ['Flutter', 'Dart'],
    repoUrl: 'https://github.com/Joaovsr/sudoku-do-dia-app',
    status: 'public'
  },
  {
    id: 5,
    title: 'Sistema de Agendamento — Museu da Loucura',
    description: {
      'pt-BR': 'Sistema web para agendamento de visitas ao Museu da Loucura. Desenvolvido em Java com interface web para gestão de reservas e controle de capacidade.',
      'en-US': 'Web system for scheduling visits to the Museum of Madness. Developed in Java with a web interface for booking management and capacity control.'
    },
    technologies: ['Java', 'HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/Joaovsr/ti-museu-da-loucura-web',
    status: 'public'
  },
  {
    id: 6,
    title: 'Portfolio',
    description: {
      'pt-BR': 'Você está aqui! Portfolio pessoal construído com Vue 3, TypeScript e SCSS. 5 versões de design distintas em uma só aplicação.',
      'en-US': "You're here! Personal portfolio built with Vue 3, TypeScript and SCSS. 5 distinct design versions in a single application."
    },
    technologies: ['Vue 3', 'TypeScript', 'SCSS', 'Vite'],
    repoUrl: 'https://github.com/joaovsr',
    siteUrl: 'https://joaovsr.is-a.dev',
    status: 'public'
  }
]
