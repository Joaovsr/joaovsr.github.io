<template>
  <section id="projects" class="section projects">
    <div class="section__head">
      <span class="section__num">// 03</span>
      <h2 class="section__title">{{ t('projects.title') }}</h2>
    </div>
    <div class="projects__grid">
      <article
        v-for="proj in projects"
        :key="proj.slug"
        class="proj"
        tabindex="0"
        role="button"
        :aria-label="proj.title"
        @click="selected = proj"
        @keydown.enter="selected = proj"
        @keydown.space.prevent="selected = proj"
      >
        <header class="proj__head">
          <h3 class="proj__title">{{ proj.title }}</h3>
          <span v-if="proj.status === 'private'" class="proj__badge">
            {{ t('projects.private_label') }}
          </span>
        </header>
        <p class="proj__desc">{{ proj.description }}</p>
        <div class="proj__tech">
          <span v-for="tech in proj.technologies" :key="tech" class="chip chip--sm">{{ tech }}</span>
        </div>
        <div class="proj__cta">
          <span class="accent">{{ t('projects.see_details') }}</span> <span class="proj__arrow">→</span>
        </div>
      </article>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectModal from '@/components/ProjectModal.vue'
import type { PortfolioProject } from '@/api/content'

const { t } = useI18n()
defineProps<{ projects: PortfolioProject[] }>()
const selected = ref<PortfolioProject | null>(null)
</script>

<style lang="scss" scoped>
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.proj {
  border: 1px solid $border;
  background: rgba($surface, 0.5);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all $transition-base;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, $primary, $accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  &:hover, &:focus-visible {
    border-color: rgba($accent, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
    &::before { transform: scaleX(1); }
    .proj__arrow { transform: translateX(4px); }
  }
}
.proj__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.proj__title { font-size: 16px; font-weight: 700; color: $secondary; }
.proj__badge {
  font-family: $mono;
  font-size: 9px;
  padding: 3px 8px;
  background: rgba($accent, 0.1);
  color: $accent;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.proj__desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba($secondary, 0.7);
  flex: 1;
}
.proj__tech { display: flex; flex-wrap: wrap; gap: 6px; }
.proj__cta {
  font-family: $mono;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid $border;
}
.proj__arrow {
  color: $accent;
  transition: transform $transition-base;
}
</style>
