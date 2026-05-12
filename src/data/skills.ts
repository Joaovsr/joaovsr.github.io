import type { ISkill } from '@/interfaces/skill'
import ReactLogo from '@/components/icons/skills/ReactLogo.vue'
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

export const skills: ISkill[] = [
  // AI & Data (priority 1)
  { id: 1, name: 'IA Generativa', category: 'data-ai' },
  { id: 2, name: 'RAG', category: 'data-ai' },
  { id: 3, name: 'LangChain', category: 'data-ai' },
  { id: 4, name: 'LangGraph', category: 'data-ai' },
  { id: 5, name: 'Tool Calling', category: 'data-ai' },
  { id: 6, name: 'Engenharia de Prompt', category: 'data-ai' },
  { id: 7, name: 'pgvector', category: 'data-ai' },
  { id: 8, name: 'Azure OpenAI', category: 'data-ai' },
  { id: 9, name: 'Pandas', category: 'data-ai' },
  { id: 10, name: 'ETL / Data Pipelines', category: 'data-ai' },
  { id: 11, name: 'Power BI', category: 'data-ai' },
  { id: 12, name: 'Metabase', category: 'data-ai' },
  { id: 13, name: 'SQL', category: 'data-ai' },
  { id: 14, name: 'RPA com Python', category: 'data-ai' },

  // Backend (priority 2)
  { id: 15, name: 'Node.js', category: 'backend', icon: NodeLogo },
  { id: 16, name: 'NestJS', category: 'backend', icon: NestjsLogo },
  { id: 17, name: 'Python', category: 'backend', icon: PythonLogo },
  { id: 18, name: 'TypeScript', category: 'backend', icon: TypescriptLogo },
  { id: 19, name: 'APIs REST', category: 'backend' },
  { id: 20, name: 'Arquitetura Modular', category: 'backend' },
  { id: 21, name: 'Clean Code', category: 'backend' },
  { id: 22, name: 'Design Patterns', category: 'backend' },
  { id: 23, name: 'POO', category: 'backend' },
  { id: 24, name: 'Java', category: 'backend', icon: JavaLogo },
  { id: 25, name: 'PHP', category: 'backend' },

  // DevOps
  { id: 26, name: 'Docker', category: 'devops', icon: DockerLogo },
  { id: 27, name: 'Kubernetes', category: 'devops', icon: KubernetesLogo },
  { id: 28, name: 'Git / CI-CD', category: 'devops', icon: GitLogo },
  { id: 29, name: 'Linux / Bash', category: 'devops', icon: LinuxLogo },

  // Mobile
  { id: 30, name: 'Flutter', category: 'mobile', icon: FlutterLogo },
  { id: 31, name: 'Dart', category: 'mobile', icon: DartLogo },

  // Frontend
  { id: 32, name: 'React', category: 'frontend', icon: ReactLogo },
  { id: 33, name: 'JavaScript', category: 'frontend', icon: JavascriptLogo }
]
