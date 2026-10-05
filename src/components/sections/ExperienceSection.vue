<template>
  <section id="experience" class="section experience">
    <header class="section__head"><p class="eyebrow"><span>03 /</span> {{ t('experience.eyebrow') }}</p><h2 class="section__title">{{ t('experience.title') }}</h2></header>
    <article v-for="exp in experiences" :key="exp.slug" class="job">
      <div class="job__company"><h3>{{ exp.company }}</h3><p>{{ fmt(exp.startDate) }} / {{ exp.finishDate ? fmt(exp.finishDate) : t('experience.present') }}</p></div>
      <div><h4>{{ t('experience.' + exp.slug + '.role') }}</h4><p class="job__description">{{ t('experience.' + exp.slug + '.description') }}</p><div class="job__skills"><span v-for="skill in exp.skills" :key="skill" class="chip">{{ skill }}</span></div></div>
    </article>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { experiences } from '@/data/experience'
import { formatDate } from '@/utils/portfolio'
const { t, locale } = useI18n()
const fmt = (date: string) => formatDate(date, locale.value)
</script>
<style scoped lang="scss">
.experience { border-top: 1px solid $border; }
.job { display: grid; grid-template-columns: 1fr 1.7fr; gap: 72px; padding: 36px 0; border-bottom: 1px solid $border; }
.job__company h3 { font-size: 22px; font-weight: 600; letter-spacing: -.035em; margin-bottom: 12px; }
.job__company p { font-size: 12px; color: $muted; }
h4 { font-size: 18px; line-height: 1.5; font-weight: 600; margin-bottom: 16px; }
.job__description { font-size: 14px; line-height: 1.85; color: $muted; max-width: 72ch; }
.job__skills { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 20px; }
@media (max-width: 850px) { .job { grid-template-columns: 1fr; gap: 24px; } }
</style>
