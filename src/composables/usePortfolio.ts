import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/plugins/i18n'
import { experiences } from '@/data/experience'
import { skills, skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'
import { education, certifications } from '@/data/education'

export function usePortfolio() {
  const { locale, t, tm } = useI18n()

  const currentLocale = computed(() => locale.value as Locale)

  const localizedExperiences = computed(() =>
    experiences.map(exp => ({
      ...exp,
      role: exp.role[currentLocale.value] ?? exp.role['pt-BR'],
      description: exp.description[currentLocale.value] ?? exp.description['pt-BR']
    }))
  )

  const groupedSkills = computed(() => {
    const groups: Record<string, typeof skills> = {}
    for (const skill of skills) {
      if (!groups[skill.category]) groups[skill.category] = []
      groups[skill.category].push(skill)
    }
    return groups
  })

  const localizedProjects = computed(() =>
    projects.map(p => ({
      ...p,
      description: p.description[currentLocale.value] ?? p.description['pt-BR']
    }))
  )

  const localizedEducation = computed(() =>
    education.map(e => ({
      ...e,
      degree: e.degree[currentLocale.value] ?? e.degree['pt-BR']
    }))
  )

  function formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-')
    if (!month) return year
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString(currentLocale.value, { month: 'short', year: 'numeric' })
  }

  function categoryLabel(category: string): string {
    const map = skillCategories[category as keyof typeof skillCategories]
    return map ? (map[currentLocale.value] ?? map['pt-BR']) : category
  }

  const differentials = computed(() => tm('about.differentials') as string[])

  const languages = computed(() => tm('about.languages') as Array<{ name: string; level: string }>)

  return {
    t,
    currentLocale,
    experiences: localizedExperiences,
    groupedSkills,
    projects: localizedProjects,
    education: localizedEducation,
    certifications,
    differentials,
    languages,
    formatDate,
    categoryLabel,
    skillCategories
  }
}
