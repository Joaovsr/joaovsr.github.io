<template>
  <section id="skills" class="section skills">
    <div class="section__head">
      <span class="section__num">// 04</span>
      <h2 class="section__title">{{ t('skills.title') }}</h2>
      <p class="section__sub">{{ t('skills.sub') }}</p>
    </div>

    <div class="graph-wrap">
      <svg class="graph" :viewBox="`0 0 ${size} ${size}`" @mouseleave="hoverNode = null">
        <line
          v-for="(e, i) in edges"
          :key="`e-${i}`"
          :x1="e.x1"
          :y1="e.y1"
          :x2="e.x2"
          :y2="e.y2"
          :class="['graph__edge', { active: hoverNode && (hoverNode === e.a || hoverNode === e.b) }]"
        />
        <g
          v-for="c in centers"
          :key="`c-${c.cat}`"
          class="graph__cat"
          :class="{ hovered: hoverNode === `cat-${c.cat}` }"
          @mouseenter="hoverNode = `cat-${c.cat}`"
        >
          <circle :cx="c.x" :cy="c.y" r="18" class="graph__cat-hit" />
          <circle :cx="c.x" :cy="c.y" :r="hoverNode === `cat-${c.cat}` ? 10 : 6" class="graph__cat-dot" />
          <text :x="c.x" :y="c.y - 14" text-anchor="middle" class="graph__cat-label">
            {{ categoryLabel(c.cat).toUpperCase() }}
          </text>
        </g>
        <g
          v-for="n in nodes"
          :key="n.id"
          class="graph__node"
          :class="{ hovered: hoverNode === n.id || hoverNode === `cat-${n.cat}` }"
          @mouseenter="hoverNode = n.id"
        >
          <circle
            :cx="n.x"
            :cy="n.y"
            :r="hoverNode === n.id ? 8 : 5"
            class="graph__node-circle"
          />
          <text :x="n.x" :y="n.y - 12" text-anchor="middle" class="graph__node-label">{{ n.label }}</text>
        </g>
      </svg>

      <div v-if="hoverNode" class="graph__hint">
        <span class="accent">▸</span> {{ hoverNodeLabel }}
      </div>
    </div>

    <div class="skills__list">
      <div v-for="cat in skillCatalog.categories" :key="cat" class="skills__group">
        <div class="skills__group-name">{{ categoryLabel(cat) }}</div>
        <div class="skills__group-tags">
          <span
            v-for="s in skillCatalog.byCategory[cat]"
            :key="s.id"
            class="chip chip--skill"
            @mouseenter="hoverNode = s.name"
            @mouseleave="hoverNode = null"
          >
            {{ s.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillCatalog } from '@/data/skills'
import { useSkillsGraph } from '@/composables/useSkillsGraph'

const { t } = useI18n()
const { size, centers, nodes, edges, hoverNode } = useSkillsGraph()

const categoryLabel = (cat: string) => t(`skills.categories.${cat}`)

const hoverNodeLabel = computed(() => {
  const h = hoverNode.value
  if (!h) return ''
  if (h.startsWith('cat-')) {
    const cat = h.slice(4)
    const count = skillCatalog.byCategory[cat as keyof typeof skillCatalog.byCategory]?.length ?? 0
    return `${categoryLabel(cat)} · ${count} skills`
  }
  const n = nodes.value.find(x => x.id === h)
  if (!n) return h
  return `${n.label} — ${categoryLabel(n.cat)}`
})
</script>

<style lang="scss" scoped>
.graph-wrap {
  position: relative;
  margin-bottom: 40px;
  border: 1px solid $border;
  background: rgba($surface, 0.4);
  padding: 12px;

  @media (max-width: $mobile) { display: none; }
}
.graph { width: 100%; height: auto; display: block; }
.graph__edge {
  stroke: rgba(124, 92, 255, 0.18);
  stroke-width: 0.8;
  transition: stroke 0.2s, stroke-width 0.2s;
  &.active { stroke: $accent; stroke-width: 1.6; }
}
.graph__cat { cursor: pointer; }
.graph__cat-hit {
  fill: transparent;
  pointer-events: all;
}
.graph__cat-dot {
  fill: $glow;
  opacity: 0.8;
  transition: all 0.2s;
  filter: drop-shadow(0 0 4px rgba($glow, 0.5));
}
.graph__cat.hovered .graph__cat-dot {
  fill: $accent;
  opacity: 1;
  filter: drop-shadow(0 0 14px rgba($accent, 0.9));
}
.graph__cat-label {
  fill: $glow;
  font-family: $mono;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 700;
  transition: fill 0.2s;
  pointer-events: none;
}
.graph__cat.hovered .graph__cat-label { fill: $accent; }
.graph__node { cursor: pointer; }
.graph__node-circle {
  fill: $primary;
  transition: all 0.2s;
  filter: drop-shadow(0 0 4px rgba($primary, 0.5));
}
.graph__node.hovered .graph__node-circle {
  fill: $accent;
  filter: drop-shadow(0 0 12px rgba($accent, 0.8));
}
.graph__node-label {
  fill: $secondary;
  font-family: $mono;
  font-size: 9px;
  opacity: 0;
  transition: opacity 0.2s;
}
.graph__node.hovered .graph__node-label { opacity: 1; }
.graph__hint {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-family: $mono;
  font-size: 12px;
  color: $accent;
  background: rgba($bg, 0.8);
  padding: 6px 12px;
  border: 1px solid $border;
}
.skills__list { display: flex; flex-direction: column; gap: 24px; }
.skills__group {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: start;
  @media (max-width: $mobile) { grid-template-columns: 1fr; gap: 8px; }
}
.skills__group-name {
  font-family: $mono;
  font-size: 11px;
  color: $glow;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: 6px;
}
.skills__group-tags { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
