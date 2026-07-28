<template>
  <section id="experience" class="section exp">
    <div class="section__head">
      <span class="section__num">// 05</span>
      <h2 class="section__title">{{ t('experience.title') }}</h2>
    </div>
    <div class="exp__list">
      <article v-for="(exp, idx) in experiences" :key="exp.slug" class="exp-item">
        <div class="exp-item__rail">
          <div class="exp-item__node">
            <div class="exp-item__node-inner"></div>
          </div>
          <div v-if="idx < experiences.length - 1" class="exp-item__line"></div>
        </div>
        <div class="exp-item__body">
          <header class="exp-item__head">
            <div>
              <div class="exp-item__period">
                {{ fmt(exp.startDate) }} → {{ exp.finishDate ? fmt(exp.finishDate) : t('experience.present') }}
              </div>
              <h3 class="exp-item__role">{{ exp.role }}</h3>
              <p class="exp-item__company">@ {{ exp.company }}</p>
            </div>
          </header>
          <p class="exp-item__desc">{{ exp.description }}</p>
          <div class="exp-item__skills">
            <span v-for="s in exp.skills" :key="s" class="chip">{{ s }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/utils/portfolio'
import type { PortfolioExperience } from '@/api/content'

const { t, locale } = useI18n()
defineProps<{ experiences: PortfolioExperience[] }>()
const fmt = (date: string) => formatDate(date, locale.value)
</script>

<style lang="scss" scoped>
.exp__list { display: flex; flex-direction: column; }
.exp-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 24px;
  padding-bottom: 36px;
}
.exp-item__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}
.exp-item__node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg;
  box-shadow: 0 0 14px rgba($primary, 0.4);
}
.exp-item__node-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $accent;
}
.exp-item__line {
  flex: 1;
  width: 1px;
  background: linear-gradient(to bottom, $primary, transparent);
  margin-top: 8px;
  min-height: 60px;
}
.exp-item__body {
  background: rgba($surface, 0.5);
  border: 1px solid $border;
  padding: 22px 26px;
  backdrop-filter: blur(8px);
  transition: all $transition-base;
  &:hover {
    border-color: rgba($primary, 0.4);
    transform: translateX(4px);
  }
}
.exp-item__period {
  font-family: $mono;
  font-size: 11px;
  color: $accent;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.exp-item__role {
  font-size: 18px;
  font-weight: 700;
  color: $secondary;
  margin-bottom: 4px;
}
.exp-item__company {
  font-size: 13px;
  color: $glow;
  margin-bottom: 14px;
  font-family: $mono;
}
.exp-item__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($secondary, 0.72);
  margin-bottom: 16px;
}
.exp-item__skills { display: flex; flex-wrap: wrap; gap: 6px; }
</style>
