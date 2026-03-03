import type { IExperience } from '@/interfaces/experience'

export const experiences: IExperience[] = [
  {
    id: 1,
    company: 'Fictor Alimentos',
    role: {
      'pt-BR': 'Desenvolvedor Full Stack',
      'en-US': 'Full Stack Developer'
    },
    description: {
      'pt-BR':
        'Atuação na evolução de um super-app interno utilizado em operações e logística. Desenvolvimento full stack com Flutter e NestJS, construindo soluções modulares focadas em escalabilidade e manutenção a longo prazo. Desenvolvimento de integrações com sistemas internos, automações de processos e uso do Kubernetes no ciclo de entrega e deploy em ambientes de nuvem. Exploração de recursos de IA generativa em ferramentas internas.',
      'en-US':
        'Working on the evolution of an internal super-app used in operations and logistics. Full stack development with Flutter and NestJS, building modular solutions focused on scalability and long-term maintainability. Development of integrations with internal systems, process automation, and use of Kubernetes in the delivery cycle and deployment in cloud environments. Exploration of generative AI features in internal tools.'
    },
    startDate: '2025-09',
    skills: ['Flutter', 'NestJS', 'TypeScript', 'Kubernetes', 'Docker', 'IA Generativa', 'REST APIs']
  },
  {
    id: 2,
    company: 'Fictor Alimentos',
    role: {
      'pt-BR': 'Analista de T.I.',
      'en-US': 'IT Analyst'
    },
    description: {
      'pt-BR':
        'Desenvolvimento de pipelines de dados em Python, incluindo raspagem, tratamento e estruturação de informações para uso analítico. Implantação do Metabase como ferramenta de BI interna, criando dashboards e visuais para suporte à tomada de decisão. Integração das bases tratadas para consumo em Power BI e evolução de automações e fluxos orientados a dados.',
      'en-US':
        'Development of data pipelines in Python, including scraping, processing and structuring information for analytical use. Implementation of Metabase as an internal BI tool, creating dashboards and visualizations to support decision-making. Integration of processed data for consumption in Power BI and evolution of data-driven automations and workflows.'
    },
    startDate: '2025-03',
    finishDate: '2025-08',
    skills: ['Python', 'ETL', 'Metabase', 'Power BI', 'Data Pipelines', 'Web Scraping']
  },
  {
    id: 3,
    company: 'Atalaia Alimentos',
    role: {
      'pt-BR': 'Analista de T.I.',
      'en-US': 'IT Analyst'
    },
    description: {
      'pt-BR':
        'Liderança Técnica de Nível 2: ponto de escalonamento para chamados complexos, com foco em análise de sistemas e melhoria contínua de processos. Projeto e implementação de robôs em Python para extração de dados de ERP legado sem acesso via API ou banco de dados, otimizando processos manuais críticos da operação.',
      'en-US':
        'Level 2 Technical Leadership: escalation point for complex tickets, focusing on systems analysis and continuous process improvement. Design and implementation of Python robots for data extraction from legacy ERP without API or database access, optimizing critical manual operational processes.'
    },
    startDate: '2024-01',
    finishDate: '2025-03',
    skills: ['Python', 'RPA', 'Web Scraping', 'Automação', 'Análise de Sistemas']
  },
  {
    id: 4,
    company: 'Atalaia Alimentos',
    role: {
      'pt-BR': 'Técnico de T.I.',
      'en-US': 'IT Technician'
    },
    description: {
      'pt-BR':
        'Suporte técnico e funcional ao ERP Agrosys, análise de bugs e gestão de acessos. Gerenciamento de usuários e permissões via Active Directory com GPOs. Iniciou a transição para cultura de automação implementando os primeiros scripts Python para tarefas repetitivas de infraestrutura.',
      'en-US':
        'Technical and functional support for the Agrosys ERP, bug analysis and access management. User and permissions management via Active Directory with GPOs. Initiated the transition to an automation culture by implementing the first Python scripts for repetitive infrastructure tasks.'
    },
    startDate: '2022-09',
    finishDate: '2024-01',
    skills: ['Python', 'Active Directory', 'ERP', 'Redes', 'Suporte Técnico', 'Bash']
  },
  {
    id: 5,
    company: 'INSS',
    role: {
      'pt-BR': 'Estagiário de T.I.',
      'en-US': 'IT Intern'
    },
    description: {
      'pt-BR':
        'Suporte técnico ao usuário e manutenção preventiva de hardware e infraestrutura de redes.',
      'en-US':
        'Technical user support and preventive maintenance of hardware and network infrastructure.'
    },
    startDate: '2019-08',
    finishDate: '2020-05',
    skills: ['Suporte Técnico', 'Hardware', 'Redes', 'Infraestrutura']
  }
]
