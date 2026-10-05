<template>
  <section id="hero" class="section hero" aria-labelledby="hero-title">
    <div class="hero__copy">
      <p class="eyebrow hero__name">{{ profile.name }} <span aria-hidden="true">↗</span></p>
      <h1 id="hero-title">{{ t('hero.headline') }}<span>{{ t('hero.headline_accent') }}</span></h1>
      <p class="hero__description">{{ t('tagline') }}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">{{ t('hero.projects_cta') }}<span aria-hidden="true">↓</span></a>
        <button class="text-link" type="button" @click="downloadCv">{{ t('download_cv') }}<span aria-hidden="true">↓</span></button>
      </div>
    </div>
    <figure class="hero__portrait">
      <a href="#about" :aria-label="t('about.title')"><img :src="profile.avatar" :alt="profile.nameShort" width="300" height="360" fetchpriority="high" /></a>
      <figcaption><span>{{ t('location') }}</span><span aria-hidden="true">↗</span></figcaption>
    </figure>
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
const { t } = useI18n()
const { downloadCv } = useCvPdf()
</script>
<style scoped lang="scss">
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: center; column-gap: 80px; padding-top: 84px; padding-bottom: 0; }
.hero__name { margin-bottom: 26px; }
h1 { font-size: clamp(58px, 6.4vw, 88px); font-weight: 600; line-height: 1.05; letter-spacing: -.065em; }
h1 > span { display: block; color: $primary; }
.hero__description { max-width: 500px; font-size: 16px; line-height: 1.85; color: $muted; margin-top: 28px; }
.hero__actions { display: flex; align-items: center; gap: 12px 28px; flex-wrap: wrap; margin-top: 30px; }
.hero__portrait { align-self: center; padding-top: 10px; }
.hero__portrait a { display: block; border-radius: 8px; }
.hero__portrait img { width: 100%; height: 360px; object-fit: cover; border-radius: 8px; }
figcaption { display: flex; justify-content: space-between; gap: 12px; margin-top: 16px; font-family: $mono; font-size: 10px; line-height: 1.6; color: $muted; }
figcaption > span:last-child { color: $primary; font-size: 15px; }
.hero__footer { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 64px; padding-block: 18px; border-block: 1px solid $border; }
.availability { display: flex; align-items: center; gap: 10px; color: $muted; font-size: 12px; line-height: 1.7; }
.availability::before { content: ''; width: 7px; height: 7px; flex-shrink: 0; background: #37765b; border-radius: 50%; box-shadow: 0 0 0 4px #37765b0d; }
.hero__links { display: flex; gap: 26px; font-size: 12px; }
.hero__links a { padding-block: 12px; }
.hero__links a:hover { color: $primary; }
.hero__links span { margin-left: 8px; color: $primary; }
@media (max-width: 1050px) {
  .hero { grid-template-columns: minmax(0, 1fr) 250px; column-gap: 40px; padding-top: 64px; }
  h1 { font-size: clamp(52px, 6.5vw, 70px); }
  .hero__portrait img { height: 320px; }
}
@media (max-width: 750px) and (min-width: 651px) { .hero { grid-template-columns: minmax(0, 1fr) 180px; gap: 30px; } .hero__portrait img { height: 250px; } h1 { font-size: 50px; } }
@media (max-width: 650px) {
  .hero { grid-template-columns: minmax(0, 1fr); padding-top: 36px; padding-bottom: 0; }
  .hero__portrait { grid-row: 1; display: flex; align-items: center; gap: 16px; padding: 0; margin-bottom: 30px; }
  .hero__portrait img { width: 68px; height: 76px; border-radius: 5px; }
  figcaption { margin: 0; max-width: 175px; font-size: 11px; }
  figcaption > span:last-child { display: none; }
  .hero__name { font-size: 10px; letter-spacing: .035em; margin-bottom: 20px; }
  h1 { font-size: clamp(42px, 10.6vw, 68px); letter-spacing: -.06em; }
  .hero__description { margin-top: 22px; font-size: 15px; line-height: 1.8; }
  .hero__actions { margin-top: 24px; gap: 8px 22px; }
  .hero__footer { margin-top: 36px; padding-block: 12px; flex-wrap: wrap; gap: 0 20px; }
  .availability { font-size: 11px; padding-block: 12px; }
  .hero__links { font-size: 11px; gap: 20px; }
}
</style>
