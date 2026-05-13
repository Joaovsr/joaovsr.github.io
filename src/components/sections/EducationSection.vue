<template>
  <section class="v2-section v2-edu">
    <div class="v2-section__head">
      <span class="v2-section__num">// 06</span>
      <h2 class="v2-section__title">{{ t('education.title') }}</h2>
    </div>
    <div class="v2-edu__grid">
      <div>
        <div v-for="edu in education" :key="edu.slug" class="v2-edu-item">
          <span class="v2-accent">▸</span>
          <div>
            <p class="v2-edu-item__deg">{{ t(`education.${edu.slug}.degree`) }}</p>
            <p class="v2-edu-item__inst">
              {{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}
            </p>
          </div>
        </div>
      </div>
      <div class="v2-certs">
        <h3 class="v2-certs__title">{{ t('education.certifications_title') }}</h3>
        <div v-for="cert in certifications" :key="cert.id" class="v2-cert">
          <span class="v2-cert__icon">✦</span>
          <div>
            <p class="v2-cert__title">{{ cert.title }}</p>
            <p class="v2-cert__issuer">{{ cert.issuer }}</p>
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
.v2-edu__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.v2-edu-item { display: flex; gap: 12px; padding: 12px 0; }
.v2-edu-item__deg {
  font-size: 14px;
  font-weight: 600;
  color: $v2-secondary;
  margin-bottom: 4px;
}
.v2-edu-item__inst {
  font-size: 12px;
  color: $v2-muted;
  font-family: $v2-mono;
}
.v2-certs__title {
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-glow;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}
.v2-cert {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  align-items: flex-start;
  border-top: 1px solid $v2-border;
  &:first-of-type { border-top: none; }
}
.v2-cert__icon { color: $v2-accent; font-size: 14px; line-height: 1.3; }
.v2-cert__title { font-size: 13px; color: $v2-secondary; margin-bottom: 2px; }
.v2-cert__issuer { font-size: 11px; color: $v2-muted; font-family: $v2-mono; }
</style>
