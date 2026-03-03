import type { ISkill } from '@/interfaces/skill'
import ReactLogo from '@/components/icons/skills/ReactLogo.vue'
import TypescriptLogo from '@/components/icons/skills/TypescriptLogo.vue'
import JavascriptLogo from '@/components/icons/skills/JavascriptLogo.vue'
import VueLogo from '@/components/icons/skills/VueLogo.vue'
import HtmlLogo from '@/components/icons/skills/HtmlLogo.vue'
import ScssLogo from '@/components/icons/skills/ScssLogo.vue'
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
  // Frontend
  { id: 1, name: 'React', category: 'frontend', icon: ReactLogo },
  { id: 2, name: 'TypeScript', category: 'frontend', icon: TypescriptLogo },
  { id: 3, name: 'JavaScript', category: 'frontend', icon: JavascriptLogo },
  { id: 4, name: 'Vue.js', category: 'frontend', icon: VueLogo },
  { id: 5, name: 'HTML / CSS', category: 'frontend', icon: HtmlLogo },
  { id: 6, name: 'SCSS', category: 'frontend', icon: ScssLogo },

  // Backend
  { id: 7, name: 'NestJS', category: 'backend', icon: NestjsLogo },
  { id: 8, name: 'Node.js', category: 'backend', icon: NodeLogo },
  { id: 9, name: 'Python', category: 'backend', icon: PythonLogo },
  { id: 10, name: 'Java', category: 'backend', icon: JavaLogo },
  { id: 11, name: 'REST APIs', category: 'backend' },

  // Mobile
  { id: 12, name: 'Flutter', category: 'mobile', icon: FlutterLogo },
  { id: 13, name: 'Dart', category: 'mobile', icon: DartLogo },

  // Data & AI
  { id: 14, name: 'ETL / Pipelines', category: 'data-ai' },
  { id: 15, name: 'RPA / Automação', category: 'data-ai' },
  { id: 16, name: 'Metabase', category: 'data-ai' },
  { id: 17, name: 'Power BI', category: 'data-ai' },
  { id: 18, name: 'IA Generativa', category: 'data-ai' },
  { id: 19, name: 'Prompt Engineering', category: 'data-ai' },

  // DevOps
  { id: 20, name: 'Docker', category: 'devops', icon: DockerLogo },
  { id: 21, name: 'Kubernetes', category: 'devops', icon: KubernetesLogo },
  { id: 22, name: 'Git / CI-CD', category: 'devops', icon: GitLogo },
  { id: 23, name: 'Linux / Bash', category: 'devops', icon: LinuxLogo },
  { id: 24, name: 'Azure', category: 'devops', icon: AzureLogo }
]

export const skillCategories: Record<ISkill['category'], Record<string, string>> = {
  'frontend': { 'pt-BR': 'Frontend', 'en-US': 'Frontend' },
  'backend': { 'pt-BR': 'Backend', 'en-US': 'Backend' },
  'mobile': { 'pt-BR': 'Mobile', 'en-US': 'Mobile' },
  'data-ai': { 'pt-BR': 'Dados & IA', 'en-US': 'Data & AI' },
  'devops': { 'pt-BR': 'DevOps / Infra', 'en-US': 'DevOps / Infra' }
}
