import { computed, ref } from 'vue'
import type { ISkill } from '@/interfaces/skill'
import { skillCatalog } from '@/data/skills'

const SIZE = 720
const CENTER = SIZE / 2
const CENTER_RADIUS = 130
const RING_RADIUS = 105

export interface GraphCenter { cat: ISkill['category']; x: number; y: number }
export interface GraphNode { id: string; label: string; cat: ISkill['category']; x: number; y: number }
export interface GraphEdge { a: string; b: string; x1: number; y1: number; x2: number; y2: number }

export function useSkillsGraph() {
  const centers = computed<GraphCenter[]>(() => {
    const cats = skillCatalog.categories.filter(c => skillCatalog.byCategory[c]?.length)
    return cats.map((cat, i) => {
      const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2
      return {
        cat,
        x: CENTER + Math.cos(angle) * CENTER_RADIUS,
        y: CENTER + Math.sin(angle) * CENTER_RADIUS
      }
    })
  })

  const nodes = computed<GraphNode[]>(() => {
    const out: GraphNode[] = []
    for (const center of centers.value) {
      const skillsInCat = skillCatalog.byCategory[center.cat] ?? []
      skillsInCat.forEach((s, i) => {
        const angle = (i / skillsInCat.length) * Math.PI * 2 + (center.x + center.y) * 0.005
        out.push({
          id: s.name,
          label: s.name,
          cat: center.cat,
          x: center.x + Math.cos(angle) * RING_RADIUS,
          y: center.y + Math.sin(angle) * RING_RADIUS
        })
      })
    }
    return out
  })

  const edges = computed<GraphEdge[]>(() => {
    const out: GraphEdge[] = []
    const byCat = new Map<string, GraphNode[]>()
    for (const n of nodes.value) {
      if (!byCat.has(n.cat)) byCat.set(n.cat, [])
      byCat.get(n.cat)!.push(n)
    }
    for (const center of centers.value) {
      const list = byCat.get(center.cat) ?? []
      for (const n of list) {
        out.push({ a: n.id, b: `cat-${center.cat}`, x1: center.x, y1: center.y, x2: n.x, y2: n.y })
      }
    }
    return out
  })

  const hoverNode = ref<string | null>(null)

  return { size: SIZE, centers, nodes, edges, hoverNode }
}
