<template>
  <section id="hero" class="section hero" aria-labelledby="hero-title">
    <div class="hero__copy">
      <div class="hero__identity">
        <a class="hero__avatar" href="#about" :aria-label="t('about.title')"><img :src="profile.avatar" :alt="profile.nameShort" width="48" height="48" fetchpriority="high" /></a>
        <p class="eyebrow hero__name">{{ profile.name }} <span aria-hidden="true">↗</span></p>
      </div>
      <h1 id="hero-title">{{ t('hero.headline') }}<span>{{ t('hero.headline_accent') }}</span></h1>
      <p class="hero__description">{{ t('tagline') }}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">{{ t('hero.projects_cta') }}<span aria-hidden="true">↓</span></a>
        <button class="text-link" type="button" @click="downloadCv">{{ t('download_cv') }}<span aria-hidden="true">↓</span></button>
      </div>
    </div>
    <HeroScene />
    <div class="hero__footer">
      <p class="availability">{{ t('about.open_to') }}</p>
      <div class="hero__links">
        <a :href="profile.social.github" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { useCvPdf } from '@/composables/useCvPdf'
import HeroScene from '@/components/HeroScene.vue'
const { t } = useI18n()
const { downloadCv } = useCvPdf()
</script>
<style scoped lang="scss">
.hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; column-gap: 34px; padding-top: 60px; padding-bottom: 0; }
.hero__identity { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
.hero__avatar { display: block; width: 48px; height: 48px; flex: 0 0 48px; }
.hero__avatar img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }
h1 { font-size: clamp(58px, 6.4vw, 88px); font-weight: 600; line-height: 1.05; letter-spacing: -.065em; }
h1 > span { display: block; color: $primary; }
.hero__description { max-width: 500px; font-size: 16px; line-height: 1.85; color: $muted; margin-top: 28px; }
.hero__actions { display: flex; align-items: center; gap: 12px 28px; flex-wrap: wrap; margin-top: 30px; }
.hero__footer { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 64px; padding-block: 18px; border-block: 1px solid $border; }
.availability { display: flex; align-items: center; gap: 10px; color: $muted; font-size: 12px; line-height: 1.7; }
.availability::before { content: ''; width: 7px; height: 7px; flex-shrink: 0; background: #37765b; border-radius: 50%; box-shadow: 0 0 0 4px #37765b0d; }
.hero__links { display: flex; gap: 26px; font-size: 12px; }
.hero__links a { padding-block: 12px; }
.hero__links a:hover { color: $primary; }
.hero__links span { margin-left: 8px; color: $primary; }
@media (max-width: 1050px) {
  .hero { column-gap: 10px; padding-top: 54px; }
  h1 { font-size: clamp(52px, 6.5vw, 70px); }
}
@media (max-width: 799px) { .hero { grid-template-columns: 1fr; } }
@media (max-width: 650px) {
  .hero { padding-top: 36px; padding-bottom: 0; }
  .hero__identity { margin-bottom: 20px; }
  .hero__name { font-size: 10px; letter-spacing: .035em; }
  h1 { font-size: clamp(42px, 10.6vw, 68px); letter-spacing: -.06em; }
  .hero__description { margin-top: 22px; font-size: 15px; line-height: 1.8; }
  .hero__actions { margin-top: 24px; gap: 8px 22px; }
  .hero__footer { margin-top: 36px; padding-block: 12px; flex-wrap: wrap; gap: 0 20px; }
  .availability { font-size: 11px; padding-block: 12px; }
  .hero__links { font-size: 11px; gap: 20px; }
}
</style>
