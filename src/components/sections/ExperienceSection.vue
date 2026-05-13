<template>
  <section id="experience" class="v2-section v2-exp">
    <div class="v2-section__head">
      <span class="v2-section__num">// 05</span>
      <h2 class="v2-section__title">{{ t('experience.title') }}</h2>
    </div>
    <div class="v2-exp__list">
      <article v-for="(exp, idx) in experiences" :key="exp.slug" class="v2-exp-item">
        <div class="v2-exp-item__rail">
          <div class="v2-exp-item__node">
            <div class="v2-exp-item__node-inner"></div>
          </div>
          <div v-if="idx < experiences.length - 1" class="v2-exp-item__line"></div>
        </div>
        <div class="v2-exp-item__body">
          <header class="v2-exp-item__head">
            <div>
              <div class="v2-exp-item__period">
                {{ fmt(exp.startDate) }} → {{ exp.finishDate ? fmt(exp.finishDate) : t('experience.present') }}
              </div>
              <h3 class="v2-exp-item__role">{{ t(`experience.${exp.slug}.role`) }}</h3>
              <p class="v2-exp-item__company">@ {{ exp.company }}</p>
            </div>
          </header>
          <p class="v2-exp-item__desc">{{ t(`experience.${exp.slug}.description`) }}</p>
          <div class="v2-exp-item__skills">
            <span v-for="s in exp.skills" :key="s" class="v2-chip">{{ s }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { experiences } from '@/data/experience'
import { formatDate } from '@/utils/portfolio'

const { t, locale } = useI18n()
const fmt = (date: string) => formatDate(date, locale.value)
</script>

<style lang="scss" scoped>
.v2-exp__list { display: flex; flex-direction: column; }
.v2-exp-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 24px;
  padding-bottom: 36px;
}
.v2-exp-item__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}
.v2-exp-item__node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid $v2-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $v2-bg;
  box-shadow: 0 0 14px rgba($v2-primary, 0.4);
}
.v2-exp-item__node-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $v2-accent;
}
.v2-exp-item__line {
  flex: 1;
  width: 1px;
  background: linear-gradient(to bottom, $v2-primary, transparent);
  margin-top: 8px;
  min-height: 60px;
}
.v2-exp-item__body {
  background: rgba($v2-surface, 0.5);
  border: 1px solid $v2-border;
  padding: 22px 26px;
  backdrop-filter: blur(8px);
  transition: all $transition-base;
  &:hover {
    border-color: rgba($v2-primary, 0.4);
    transform: translateX(4px);
  }
}
.v2-exp-item__period {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-accent;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.v2-exp-item__role {
  font-size: 18px;
  font-weight: 700;
  color: $v2-secondary;
  margin-bottom: 4px;
}
.v2-exp-item__company {
  font-size: 13px;
  color: $v2-glow;
  margin-bottom: 14px;
  font-family: $v2-mono;
}
.v2-exp-item__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($v2-secondary, 0.72);
  margin-bottom: 16px;
}
.v2-exp-item__skills { display: flex; flex-wrap: wrap; gap: 6px; }
</style>
