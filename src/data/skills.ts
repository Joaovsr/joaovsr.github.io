import type { ISkill } from '@/interfaces/skill'
import ReactLogo from '@/components/icons/skills/ReactLogo.vue'
import VueLogo from '@/components/icons/skills/VueLogo.vue'
import TypescriptLogo from '@/components/icons/skills/TypescriptLogo.vue'
import JavascriptLogo from '@/components/icons/skills/JavascriptLogo.vue'
import NestjsLogo from '@/components/icons/skills/NestjsLogo.vue'
import NodeLogo from '@/components/icons/skills/NodeLogo.vue'
import PythonLogo from '@/components/icons/skills/PythonLogo.vue'
import JavaLogo from '@/components/icons/skills/JavaLogo.vue'
import FlutterLogo from '@/components/icons/skills/FlutterLogo.vue'
import DartLogo from '@/components/icons/skills/DartLogo.vue'
import DockerLogo from '@/components/icons/skills/DockerLogo.vue'
import KubernetesLogo from '@/components/icons/skills/KubernetesLogo.vue'
import GitLogo from '@/components/icons/skills/GitLogo.vue'
import LinuxLogo from '@/components/icons/skills/LinuxLogo.vue'
import AzureLogo from '@/components/icons/skills/AzureLogo.vue'

export const skills: ISkill[] = [
  // AI (priority 1)
  { id: 1, name: 'Generative AI', category: 'ai' },
  { id: 2, name: 'RAG', category: 'ai', relatedTo: ['LangChain', 'LangGraph', 'pgvector', 'Vector Databases', 'Azure OpenAI'] },
  { id: 3, name: 'LangChain', category: 'ai' },
  { id: 4, name: 'LangGraph', category: 'ai', relatedTo: ['Agents', 'Tool Calling'] },
  { id: 5, name: 'Agents', category: 'ai', relatedTo: ['Guardrails', 'Tool Calling'] },
  { id: 6, name: 'Tool Calling', category: 'ai' },
  { id: 7, name: 'Prompt Engineering', category: 'ai' },
  { id: 8, name: 'Guardrails', category: 'ai' },
  { id: 9, name: 'Evals', category: 'ai', relatedTo: ['Ragas', 'LLM as Judge', 'Faithfulness', 'Langfuse'] },
  { id: 10, name: 'LLM as Judge', category: 'ai' },
  { id: 11, name: 'Faithfulness', category: 'ai' },
  { id: 12, name: 'Ragas', category: 'ai' },
  { id: 13, name: 'Langfuse', category: 'ai' },
  { id: 14, name: 'Vector Databases', category: 'ai' },
  { id: 15, name: 'pgvector', category: 'ai', relatedTo: ['Vector Databases'] },
  { id: 16, name: 'Azure OpenAI', category: 'ai', icon: AzureLogo },
  { id: 19, name: 'TensorFlow', category: 'ai' },

  // Backend (priority 2)
  { id: 20, name: 'Node.js', category: 'backend', icon: NodeLogo },
  { id: 21, name: 'NestJS', category: 'backend', icon: NestjsLogo },
  { id: 22, name: 'Python', category: 'backend', icon: PythonLogo, relatedTo: ['Pandas', 'NumPy', 'Django', 'FastAPI', 'TensorFlow', 'Selenium', 'Matplotlib', 'Seaborn', 'Plotly'] },
  { id: 23, name: 'TypeScript', category: 'backend', icon: TypescriptLogo, relatedTo: ['Node.js', 'NestJS', 'Vue', 'React', 'Angular', 'JavaScript (ES6+)'] },
  { id: 24, name: 'Django', category: 'backend' },
  { id: 25, name: 'FastAPI', category: 'backend' },
  { id: 26, name: 'APIs REST', category: 'backend' },
  { id: 27, name: 'GraphQL', category: 'backend' },
  { id: 28, name: 'WebSockets', category: 'backend' },
  { id: 29, name: 'MongoDB', category: 'backend' },
  { id: 30, name: 'Redis', category: 'backend' },
  { id: 31, name: 'RabbitMQ', category: 'backend' },
  { id: 32, name: 'Modular Architecture', category: 'backend', relatedTo: ['Clean Architecture', 'Design Patterns'] },
  { id: 33, name: 'Clean Architecture', category: 'backend', relatedTo: ['Clean Code', 'MVC', 'Design Patterns'] },
  { id: 34, name: 'Clean Code', category: 'backend' },
  { id: 35, name: 'Design Patterns', category: 'backend' },
  { id: 36, name: 'MVC', category: 'backend' },
  { id: 37, name: 'OOP', category: 'backend' },
  { id: 38, name: 'Security', category: 'backend' },
  { id: 39, name: 'Java', category: 'backend', icon: JavaLogo },
  { id: 40, name: 'PHP', category: 'backend' },

  // Data
  { id: 41, name: 'Pandas', category: 'data' },
  { id: 42, name: 'NumPy', category: 'data' },
  { id: 43, name: 'ETL / ELT', category: 'data' },
  { id: 44, name: 'Databricks', category: 'data' },
  { id: 45, name: 'Power BI', category: 'data', relatedTo: ['Metabase', 'SQL'] },
  { id: 46, name: 'Metabase', category: 'data', relatedTo: ['SQL'] },
  { id: 47, name: 'SQL', category: 'data' },
  { id: 48, name: 'Plotly', category: 'data' },
  { id: 49, name: 'Seaborn', category: 'data' },
  { id: 50, name: 'Matplotlib', category: 'data' },
  { id: 51, name: 'Selenium', category: 'data' },

  // DevOps
  { id: 53, name: 'Docker', category: 'devops', icon: DockerLogo, relatedTo: ['Kubernetes', 'NGINX'] },
  { id: 54, name: 'Kubernetes', category: 'devops', icon: KubernetesLogo, relatedTo: ['Terraform', 'Azure DevOps'] },
  { id: 55, name: 'Git / CI-CD', category: 'devops', icon: GitLogo, relatedTo: ['Automated Deployment'] },
  { id: 56, name: 'Azure DevOps', category: 'devops', icon: AzureLogo, relatedTo: ['Azure OpenAI', 'Git / CI-CD'] },
  { id: 57, name: 'Terraform', category: 'devops' },
  { id: 58, name: 'NGINX', category: 'devops', relatedTo: ['Linux / Bash'] },
  { id: 59, name: 'Automated Deployment', category: 'devops' },
  { id: 60, name: 'Linux / Bash', category: 'devops', icon: LinuxLogo },

  // Mobile
  { id: 61, name: 'Flutter', category: 'mobile', icon: FlutterLogo, relatedTo: ['Dart', 'Push Notifications', 'Mobile UI/UX'] },
  { id: 62, name: 'Dart', category: 'mobile', icon: DartLogo },
  { id: 63, name: 'Push Notifications', category: 'mobile' },
  { id: 64, name: 'Mobile UI/UX', category: 'mobile', relatedTo: ['Design Systems', 'Push Notifications'] },

  // Frontend
  { id: 65, name: 'React', category: 'frontend', icon: ReactLogo, relatedTo: ['State Management', 'Tailwind CSS'] },
  { id: 66, name: 'Vue', category: 'frontend', icon: VueLogo, relatedTo: ['State Management', 'Tailwind CSS'] },
  { id: 67, name: 'Angular', category: 'frontend', relatedTo: ['State Management', 'Tailwind CSS'] },
  { id: 68, name: 'JavaScript (ES6+)', category: 'frontend', icon: JavascriptLogo },
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
  all: skills,
  byCategory: buildByCategory(),
  categories: CATEGORY_ORDER
}
