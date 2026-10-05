<template>
  <section class="section education">
    <div>
      <h2 class="section__title">{{ t('education.title') }}</h2>
      <div v-for="item in education" :key="item.slug" class="education__item"><h3>{{ t('education.' + item.slug + '.degree') }}</h3><p>{{ item.institution }}</p><p>{{ item.startDate }} / {{ item.finishDate ?? t('education.ongoing') }}</p></div>
    </div>
    <div>
      <h2 class="section__title">{{ t('education.certifications_title') }}</h2>
      <ul class="certifications"><li v-for="cert in certifications" :key="cert.id"><span>{{ cert.title }}</span><span>{{ cert.issuer }}</span></li></ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { education, certifications } from '@/data/education'
const { t } = useI18n()
</script>
<style scoped lang="scss">
.education { display: grid; grid-template-columns: 1fr 1.7fr; gap: 72px; padding-top: 0; }
.section__title { font-size: 28px; margin-bottom: 28px; }
.education__item { margin-bottom: 28px; }
h3 { font-weight: 600; font-size: 15px; line-height: 1.6; margin-bottom: 8px; }
p { font-size: 12px; line-height: 1.9; color: $muted; }
.certifications li { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding: 12px 0; border-bottom: 1px solid $border; font-size: 12px; line-height: 1.6; }
.certifications li span:last-child { font-size: 11px; color: $muted; text-align: right; max-width: 160px; flex-shrink: 0; }
@media (max-width: 850px) { .education { grid-template-columns: 1fr; gap: 24px; } }
@media (max-width: 420px) { .certifications li { flex-direction: column; gap: 3px; } .certifications li span:last-child { max-width: none; text-align: left; } }
</style>
