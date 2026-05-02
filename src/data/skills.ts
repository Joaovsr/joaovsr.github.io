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
  // Frontend
  { id: 1, name: 'React', category: 'frontend', icon: ReactLogo },
  { id: 2, name: 'TypeScript', category: 'frontend', icon: TypescriptLogo },
  { id: 3, name: 'JavaScript', category: 'frontend', icon: JavascriptLogo },

  // Backend
  { id: 4, name: 'Node.js', category: 'backend', icon: NodeLogo },
  { id: 5, name: 'NestJS', category: 'backend', icon: NestjsLogo },
  { id: 6, name: 'Python', category: 'backend', icon: PythonLogo },
  { id: 7, name: 'Java', category: 'backend', icon: JavaLogo },
  { id: 8, name: 'SQL', category: 'backend' },
  { id: 9, name: 'PHP', category: 'backend' },
  { id: 10, name: 'APIs REST', category: 'backend' },
  { id: 11, name: 'Clean Code', category: 'backend' },
  { id: 12, name: 'Design Patterns', category: 'backend' },
  { id: 13, name: 'Arquitetura Modular', category: 'backend' },
  { id: 14, name: 'POO', category: 'backend' },

  // Mobile
  { id: 15, name: 'Flutter', category: 'mobile', icon: FlutterLogo },
  { id: 16, name: 'Dart', category: 'mobile', icon: DartLogo },

  // Data & AI
  { id: 17, name: 'ETL / Data Pipelines', category: 'data-ai' },
  { id: 18, name: 'RPA com Python', category: 'data-ai' },
  { id: 19, name: 'Pandas', category: 'data-ai' },
  { id: 20, name: 'Metabase', category: 'data-ai' },
  { id: 21, name: 'Power BI', category: 'data-ai' },
  { id: 22, name: 'Excel', category: 'data-ai' },
  { id: 23, name: 'IA Generativa', category: 'data-ai' },
  { id: 24, name: 'LangChain', category: 'data-ai' },
  { id: 25, name: 'Engenharia de Prompt', category: 'data-ai' },
  { id: 26, name: 'RAG', category: 'data-ai' },
  { id: 27, name: 'Tool Calling', category: 'data-ai' },

  // DevOps
  { id: 28, name: 'Docker', category: 'devops', icon: DockerLogo },
  { id: 29, name: 'Kubernetes', category: 'devops', icon: KubernetesLogo },
  { id: 30, name: 'Git / CI-CD', category: 'devops', icon: GitLogo },
  { id: 31, name: 'Linux / Bash', category: 'devops', icon: LinuxLogo }
]

export const skillCategories: Record<ISkill['category'], Record<string, string>> = {
  'frontend': { 'pt-BR': 'Frontend', 'en-US': 'Frontend' },
  'backend': { 'pt-BR': 'Backend', 'en-US': 'Backend' },
  'mobile': { 'pt-BR': 'Mobile', 'en-US': 'Mobile' },
  'data-ai': { 'pt-BR': 'Dados & IA', 'en-US': 'Data & AI' },
  'devops': { 'pt-BR': 'DevOps / Infra', 'en-US': 'DevOps / Infra' }
}
