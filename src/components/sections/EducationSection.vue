<template>
  <section class="section edu">
    <div class="section__head">
      <span class="section__num">// 06</span>
      <h2 class="section__title">{{ t('education.title') }}</h2>
    </div>
    <div class="edu__grid">
      <div>
        <div v-for="edu in education" :key="edu.slug" class="edu-item">
          <span class="accent">▸</span>
          <div>
            <p class="edu-item__deg">{{ t(`education.${edu.slug}.degree`) }}</p>
            <p class="edu-item__inst">
              {{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}
            </p>
          </div>
        </div>
      </div>
      <div class="certs">
        <h3 class="certs__title">{{ t('education.certifications_title') }}</h3>
        <div v-for="cert in certifications" :key="cert.id" class="cert">
          <span class="cert__icon">✦</span>
          <div>
            <p class="cert__title">{{ cert.title }}</p>
            <p class="cert__issuer">{{ cert.issuer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { education, certifications } from '@/data/education'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.edu__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.edu-item { display: flex; gap: 12px; padding: 12px 0; }
.edu-item__deg {
  font-size: 14px;
  font-weight: 600;
  color: $secondary;
  margin-bottom: 4px;
}
.edu-item__inst {
  font-size: 12px;
  color: $muted;
  font-family: $mono;
}
.certs__title {
  font-family: $mono;
  font-size: 12px;
  color: $glow;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}
.cert {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  align-items: flex-start;
  border-top: 1px solid $border;
  &:first-of-type { border-top: none; }
}
.cert__icon { color: $accent; font-size: 14px; line-height: 1.3; }
.cert__title { font-size: 13px; color: $secondary; margin-bottom: 2px; }
.cert__issuer { font-size: 11px; color: $muted; font-family: $mono; }
</style>
