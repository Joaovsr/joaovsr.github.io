import type { ISkill } from '@/interfaces/skill'

export const skills: ISkill[] = [
  // AI (priority 1)
  { id: 1, name: 'Generative AI', category: 'ai' },
  { id: 2, name: 'RAG', category: 'ai' },
  { id: 3, name: 'LangChain', category: 'ai' },
  { id: 4, name: 'LangGraph', category: 'ai' },
  { id: 5, name: 'Agents', category: 'ai' },
  { id: 6, name: 'Tool Calling', category: 'ai' },
  { id: 7, name: 'Prompt Engineering', category: 'ai' },
  { id: 8, name: 'Guardrails', category: 'ai' },
  { id: 9, name: 'Evals', category: 'ai' },
  { id: 10, name: 'LLM as Judge', category: 'ai' },
  { id: 11, name: 'Faithfulness', category: 'ai' },
  { id: 12, name: 'Ragas', category: 'ai' },
  { id: 13, name: 'Langfuse', category: 'ai' },
  { id: 14, name: 'Vector Databases', category: 'ai' },
  { id: 15, name: 'pgvector', category: 'ai' },
  { id: 16, name: 'Azure OpenAI', category: 'ai' },
  { id: 19, name: 'TensorFlow', category: 'ai' },

  // Backend (priority 2)
  { id: 20, name: 'Node.js', category: 'backend' },
  { id: 21, name: 'NestJS', category: 'backend' },
  { id: 22, name: 'Python', category: 'backend' },
  { id: 23, name: 'TypeScript', category: 'backend' },
  { id: 24, name: 'Django', category: 'backend' },
  { id: 25, name: 'FastAPI', category: 'backend' },
  { id: 26, name: 'APIs REST', category: 'backend' },
  { id: 27, name: 'GraphQL', category: 'backend' },
  { id: 28, name: 'WebSockets', category: 'backend' },
  { id: 29, name: 'MongoDB', category: 'backend' },
  { id: 30, name: 'Redis', category: 'backend' },
  { id: 31, name: 'RabbitMQ', category: 'backend' },
  { id: 32, name: 'Modular Architecture', category: 'backend' },
  { id: 33, name: 'Clean Architecture', category: 'backend' },
  { id: 34, name: 'Clean Code', category: 'backend' },
  { id: 35, name: 'Design Patterns', category: 'backend' },
  { id: 36, name: 'MVC', category: 'backend' },
  { id: 37, name: 'OOP', category: 'backend' },
  { id: 38, name: 'Security', category: 'backend' },
  { id: 39, name: 'Java', category: 'backend' },
  { id: 40, name: 'PHP', category: 'backend' },

  // Data
  { id: 41, name: 'Pandas', category: 'data' },
  { id: 42, name: 'NumPy', category: 'data' },
  { id: 43, name: 'ETL / ELT', category: 'data' },
  { id: 44, name: 'Databricks', category: 'data' },
  { id: 45, name: 'Power BI', category: 'data' },
  { id: 46, name: 'Metabase', category: 'data' },
  { id: 47, name: 'SQL', category: 'data' },
  { id: 48, name: 'Plotly', category: 'data' },
  { id: 49, name: 'Seaborn', category: 'data' },
  { id: 50, name: 'Matplotlib', category: 'data' },
  { id: 51, name: 'Selenium', category: 'data' },

  // DevOps
  { id: 53, name: 'Docker', category: 'devops' },
  { id: 54, name: 'Kubernetes', category: 'devops' },
  { id: 55, name: 'Git / CI-CD', category: 'devops' },
  { id: 56, name: 'Azure DevOps', category: 'devops' },
  { id: 57, name: 'Terraform', category: 'devops' },
  { id: 58, name: 'NGINX', category: 'devops' },
  { id: 59, name: 'Automated Deployment', category: 'devops' },
  { id: 60, name: 'Linux / Bash', category: 'devops' },

  // Mobile
  { id: 61, name: 'Flutter', category: 'mobile' },
  { id: 62, name: 'Dart', category: 'mobile' },
  { id: 63, name: 'Push Notifications', category: 'mobile' },
  { id: 64, name: 'Mobile UI/UX', category: 'mobile' },

  // Frontend
  { id: 65, name: 'React', category: 'frontend' },
  { id: 66, name: 'Vue', category: 'frontend' },
  { id: 67, name: 'Angular', category: 'frontend' },
  { id: 68, name: 'JavaScript (ES6+)', category: 'frontend' },
  { id: 69, name: 'Tailwind CSS', category: 'frontend' },
  { id: 70, name: 'Design Systems', category: 'frontend' },
  { id: 71, name: 'State Management', category: 'frontend' }
]

const CATEGORY_ORDER: ISkill['category'][] = ['ai', 'backend', 'data', 'devops', 'mobile', 'frontend']

function buildByCategory(): Record<ISkill['category'], ISkill[]> {
  const out = { ai: [], backend: [], data: [], devops: [], mobile: [], frontend: [] } as Record<ISkill['category'], ISkill[]>
  for (const s of skills) out[s.category].push(s)
  return out
}

export const skillCatalog = {
  byCategory: buildByCategory(),
  categories: CATEGORY_ORDER
}
