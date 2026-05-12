export function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

export function yearsOfExperience(careerStart: string): number {
  const [year, month = '1'] = careerStart.split('-')
  const start = new Date(Number(year), Number(month) - 1)
  const diffMs = Date.now() - start.getTime()
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)))
}

export function groupBy<T, K extends keyof T>(items: readonly T[], key: K): Record<string, T[]> {
  const out: Record<string, T[]> = {}
  for (const item of items) {
    const k = String(item[key])
    if (!out[k]) out[k] = []
    out[k].push(item)
  }
  return out
}
