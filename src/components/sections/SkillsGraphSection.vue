<template>
  <section id="skills" class="v2-section v2-skills">
    <div class="v2-section__head">
      <span class="v2-section__num">// 04</span>
      <h2 class="v2-section__title">{{ t('skills.title') }}</h2>
      <p class="v2-section__sub">{{ t('v2.skills.sub') }}</p>
    </div>

    <div class="v2-graph-wrap">
      <svg class="v2-graph" :viewBox="`0 0 ${size} ${size}`" @mouseleave="hoverNode = null">
        <line
          v-for="(e, i) in edges"
          :key="`e-${i}`"
          :x1="e.x1"
          :y1="e.y1"
          :x2="e.x2"
          :y2="e.y2"
          :class="['v2-graph__edge', { active: hoverNode && (hoverNode === e.a || hoverNode === e.b) }]"
        />
        <g v-for="c in centers" :key="`c-${c.cat}`">
          <circle :cx="c.x" :cy="c.y" r="6" class="v2-graph__cat-dot" />
          <text :x="c.x" :y="c.y - 14" text-anchor="middle" class="v2-graph__cat-label">
            {{ categoryLabel(c.cat).toUpperCase() }}
          </text>
        </g>
        <g
          v-for="n in nodes"
          :key="n.id"
          class="v2-graph__node"
          :class="{ hovered: hoverNode === n.id }"
          @mouseenter="hoverNode = n.id"
        >
          <circle
            :cx="n.x"
            :cy="n.y"
            :r="hoverNode === n.id ? 8 : 5"
            class="v2-graph__node-circle"
          />
          <text :x="n.x" :y="n.y - 12" text-anchor="middle" class="v2-graph__node-label">{{ n.label }}</text>
        </g>
      </svg>

      <div v-if="hoverNode" class="v2-graph__hint">
        <span class="v2-accent">▸</span> {{ hoverNodeLabel }}
      </div>
    </div>

    <div class="v2-skills__list">
      <div v-for="cat in skillCatalog.categories" :key="cat" class="v2-skills__group">
        <div class="v2-skills__group-name">{{ categoryLabel(cat) }}</div>
        <div class="v2-skills__group-tags">
          <span
            v-for="s in skillCatalog.byCategory[cat]"
            :key="s.id"
            class="v2-chip v2-chip--skill"
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
  if (!hoverNode.value) return ''
  const n = nodes.value.find(x => x.id === hoverNode.value)
  if (!n) return hoverNode.value
  return `${n.label} — ${categoryLabel(n.cat)}`
})
</script>

<style lang="scss" scoped>
.v2-graph-wrap {
  position: relative;
  margin-bottom: 40px;
  border: 1px solid $v2-border;
  background: rgba($v2-surface, 0.4);
  padding: 12px;

  @media (max-width: $mobile) { display: none; }
}
.v2-graph { width: 100%; height: auto; display: block; }
.v2-graph__edge {
  stroke: rgba(124, 92, 255, 0.18);
  stroke-width: 0.8;
  transition: stroke 0.2s, stroke-width 0.2s;
  &.active { stroke: $v2-accent; stroke-width: 1.6; }
}
.v2-graph__cat-dot { fill: $v2-glow; opacity: 0.8; }
.v2-graph__cat-label {
  fill: $v2-glow;
  font-family: $v2-mono;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 700;
}
.v2-graph__node { cursor: pointer; }
.v2-graph__node-circle {
  fill: $v2-primary;
  transition: all 0.2s;
  filter: drop-shadow(0 0 4px rgba($v2-primary, 0.5));
}
.v2-graph__node.hovered .v2-graph__node-circle {
  fill: $v2-accent;
  filter: drop-shadow(0 0 12px rgba($v2-accent, 0.8));
}
.v2-graph__node-label {
  fill: $v2-secondary;
  font-family: $v2-mono;
  font-size: 9px;
  opacity: 0;
  transition: opacity 0.2s;
}
.v2-graph__node.hovered .v2-graph__node-label { opacity: 1; }
.v2-graph__hint {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-accent;
  background: rgba($v2-bg, 0.8);
  padding: 6px 12px;
  border: 1px solid $v2-border;
}
.v2-skills__list { display: flex; flex-direction: column; gap: 24px; }
.v2-skills__group {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: start;
  @media (max-width: $mobile) { grid-template-columns: 1fr; gap: 8px; }
}
.v2-skills__group-name {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-glow;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: 6px;
}
.v2-skills__group-tags { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
