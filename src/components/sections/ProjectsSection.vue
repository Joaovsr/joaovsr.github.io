<template>
  <section id="projects" class="section projects">
    <div class="section__head">
      <span class="section__num">// 03</span>
      <h2 class="section__title">{{ t('projects.title') }}</h2>
    </div>
    <div class="projects__grid">
      <article v-for="proj in projects" :key="proj.slug" class="proj">
        <header class="proj__head">
          <h3 class="proj__title">{{ proj.title }}</h3>
          <span v-if="proj.status === 'private'" class="proj__badge">
            {{ t('projects.private_label') }}
          </span>
        </header>
        <p class="proj__desc">{{ t(`projects.${proj.slug}.description`) }}</p>
        <div class="proj__tech">
          <span v-for="tech in proj.technologies" :key="tech" class="chip chip--sm">{{ tech }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'

const { t } = useI18n()
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
  &:hover {
    border-color: rgba($accent, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
    &::before { transform: scaleX(1); }
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
</style>
