<template>
  <section id="projects" class="section projects">
    <div class="section__head">
      <span class="section__num">// 02</span>
      <h2 class="section__title">{{ t('projects.title') }}</h2>
    </div>
    <div class="projects__grid">
      <article
        v-for="proj in projects"
        :key="proj.slug"
        class="proj"
        :aria-labelledby="`project-${proj.slug}`"
      >
        <header class="proj__head">
          <h3 :id="`project-${proj.slug}`" class="proj__title">{{ proj.title }}</h3>
          <span v-if="proj.status" class="proj__badge" :class="{ 'proj__badge--public': proj.status === 'public' }">
            {{ t(`projects.${proj.status}_label`) }}
          </span>
        </header>
        <p class="proj__desc">{{ t(`projects.${proj.slug}.description`) }}</p>
        <div class="proj__tech">
          <span v-for="tech in proj.technologies" :key="tech" class="chip chip--sm">{{ tech }}</span>
        </div>
        <div class="proj__cta">
          <button class="proj__details" type="button" :aria-label="t('projects.open', { name: proj.title })" @click="selected = proj">
            {{ t('projects.see_details') }} <span class="proj__arrow" aria-hidden="true">→</span>
          </button>
          <a v-if="proj.repoUrl" class="proj__repo" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" :aria-label="t('projects.repo_label') + ': ' + proj.title">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal.vue'
import type { IProject } from '@/interfaces/project'

const { t } = useI18n()
const selected = ref<IProject | null>(null)
</script>

<style lang="scss" scoped>
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
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
  &:hover, &:focus-within {
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
.proj__badge--public { color: #4ade80; background: rgba(#4ade80, 0.08); }
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
  justify-content: space-between;
  gap: 6px;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid $border;
}
.proj__details { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; color: $accent; }
.proj__details::after { content: ''; position: absolute; inset: 0; z-index: 1; }
.proj__repo { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; color: $secondary; }
.proj__repo:hover { color: $accent; }
.proj__arrow {
  color: $accent;
  transition: transform $transition-base;
}
</style>
