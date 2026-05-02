import type { IExperience } from '@/interfaces/experience'

export const experiences: IExperience[] = [
  {
    id: 1,
    company: 'Fictor Alimentos',
    role: {
      'pt-BR': 'Desenvolvedor Full Stack | IA Engineer',
      'en-US': 'Full Stack Developer | AI Engineer'
    },
    description: {
      'pt-BR':
        'Desenvolvi aplicações web e mobile integradas com IA utilizadas em múltiplas empresas do grupo. Plataforma completa de RH com scoring semântico de currículos via RAG + Azure OpenAI + pgvector, avaliação de fit técnico e integração com Totvs/RM. Super-app corporativo em Flutter, React e Node.js com reserva de veículos com validação por IA, hospedagem, notificações em tempo real, dashboards de BI e autenticação via Azure AD com RBAC por módulo. Fictor360 AI: consulta de indicadores corporativos em linguagem natural via LLM + MCP PowerBI. Infraestrutura com Docker, Kubernetes e pipelines CI/CD via Azure DevOps + GitFlow.',
      'en-US':
        'Developed web and mobile applications integrated with AI, used across multiple companies in the group. Complete HR platform with semantic resume scoring via RAG + Azure OpenAI + pgvector, role fit evaluation, and Totvs/RM integration. Corporate super-app built in Flutter, React, and Node.js with AI-validated vehicle reservation, hosting, real-time notifications, BI dashboards, and Azure AD authentication with RBAC per module. Fictor360 AI: corporate indicator queries in natural language via LLM + MCP PowerBI. Infrastructure with Docker, Kubernetes, and CI/CD pipelines via Azure DevOps + GitFlow.'
    },
    startDate: '2025-03',
    finishDate: '2026-04',
    skills: ['Flutter', 'React', 'Node.js', 'TypeScript', 'RAG', 'Azure OpenAI', 'pgvector', 'LLM', 'Docker', 'Kubernetes', 'CI/CD', 'Azure AD']
  },
  {
    id: 2,
    company: 'Atalaia Alimentos',
    role: {
      'pt-BR': 'Analista de Desenvolvimento de Sistemas | Analista de Dados',
      'en-US': 'Systems Developer | Data Analyst'
    },
    description: {
      'pt-BR':
        'Desenvolvi e implantei soluções tecnológicas com Python, automatizando operações, estruturando pipelines de dados e criando sistemas internos para suporte às áreas de negócio. Desenvolvimento de agente de cobrança de clientes inadimplentes, pipelines de dados e ETL com Pandas, análise e visualização de dados com Pandas e Seaborn, implantação do Metabase com 10+ dashboards automatizados para suporte à decisão, desenvolvimento do site institucional e plataforma de intranet em Django. Suporte técnico e funcional ao ERP Agrosys, análise de bugs e gestão de acessos.',
      'en-US':
        'Developed and deployed technology solutions with Python, automating operations, structuring data pipelines, and building internal systems to support business areas. Built a client debt collection agent, data pipelines and ETL with Pandas, data analysis and visualization with Pandas and Seaborn, deployed Metabase with 10+ automated dashboards for decision support, and developed the institutional website and intranet platform using Django. Technical and functional support for Agrosys ERP, bug analysis, and access management.'
    },
    startDate: '2022-09',
    finishDate: '2025-03',
    skills: ['Python', 'RPA', 'Selenium', 'Pandas', 'ETL', 'Metabase', 'Power BI', 'Django', 'SQL', 'LLMs']
  },
  {
    id: 3,
    company: 'INSS',
    role: {
      'pt-BR': 'Estagiário de T.I.',
      'en-US': 'IT Intern'
    },
    description: {
      'pt-BR':
        'Responsável pela manutenção de equipamentos de informática, suporte técnico ao usuário com foco em hardware, software e rede, além de recuperação de sistemas com formatação e reinstalação de sistemas operacionais, melhorando o desempenho das máquinas.',
      'en-US':
        'Responsible for computer equipment maintenance, technical user support focused on hardware, software, and networking, as well as system recovery through OS formatting and reinstallation, improving machine performance.'
    },
    startDate: '2019-08',
    finishDate: '2020-05',
    skills: ['Suporte Técnico', 'Hardware', 'Redes', 'Infraestrutura']
  }
]
