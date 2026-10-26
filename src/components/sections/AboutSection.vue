<template>
  <section id="about" class="section about" aria-labelledby="about-title">
    <div class="section__head">
      <span class="section__num">// 01</span>
      <h2 id="about-title" class="section__title">{{ t('about.title') }}</h2>
    </div>
    <div class="about__grid">
      <figure class="about__portrait">
        <img :src="profile.avatar" :alt="profile.name" width="560" height="700" loading="lazy" />
        <figcaption><strong>{{ profile.nameShort }}</strong><span>{{ t('location') }}</span></figcaption>
      </figure>
      <div class="about__main">
        <h3 class="about__headline">{{ t('about.headline') }}</h3>
        <p class="about__lead">{{ t('about.text') }}</p>
        <p class="about__body">{{ t('about.text2') }}</p>
        <p class="about__availability"><span aria-hidden="true"></span>{{ t('about.open_to') }}</p>
        <div class="about__footer">
          <div class="about__langs">
            <p>{{ t('about.languages_title') }}</p>
            <dl><div v-for="lang in languages" :key="lang.name"><dt>{{ lang.name }}</dt><dd>{{ lang.level }}</dd></div></dl>
          </div>
          <a :href="`mailto:${profile.email}`" class="about__email">{{ profile.email }} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'

const { t, tm } = useI18n()
const languages = computed(() => tm('about.languages') as Array<{ name: string; level: string }>)
</script>

<style lang="scss" scoped>
.about__grid {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 72px;
  align-items: center;
  @media (max-width: $tablet) { grid-template-columns: 220px minmax(0, 1fr); gap: 40px; }
  @media (max-width: $mobile) { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}
.about { border-top: 1px solid $border; }
.about__portrait img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 35%; border-radius: 6px; filter: saturate(.75); }
.about__portrait figcaption { display: grid; gap: 6px; margin-top: 18px; font-size: 12px; line-height: 1.6; color: $muted; }
.about__portrait strong { color: $secondary; font-weight: 500; font-size: 14px; }
.about__headline { max-width: 20ch; font-size: clamp(28px, 3vw, 38px); line-height: 1.2; letter-spacing: -.035em; font-weight: 600; color: $secondary; margin-bottom: 24px; }
.about__lead {
  font-size: 16px;
  line-height: 1.8;
  color: $secondary;
  margin-bottom: 18px;
}
.about__body {
  font-size: 15px;
  line-height: 1.8;
  color: rgba($secondary, 0.75);
  margin-bottom: 24px;
}
.about__availability { display: flex; align-items: center; gap: 9px; font-size: 12px; color: $secondary; }
.about__availability > span { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; }
.about__footer { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 24px; border-top: 1px solid $border; padding-top: 22px; margin-top: 28px; }
.about__langs > p { font-size: 11px; color: $muted; margin-bottom: 10px; }
.about__langs dl { display: flex; flex-wrap: wrap; gap: 24px; }
.about__langs dl > div { display: grid; gap: 5px; font-size: 12px; }
.about__langs dd { color: $muted; }
.about__email { display: inline-flex; gap: 10px; align-items: center; min-height: 44px; color: $accent; font-size: 12px; overflow-wrap: anywhere; }
.about__email:hover { text-decoration: underline; text-underline-offset: 5px; }
@media (max-width: $mobile) {
  .about__headline { font-size: 30px; }
  .about__portrait { display: flex; align-items: center; gap: 20px; }
  .about__portrait img { width: 112px; flex-shrink: 0; }
  .about__portrait figcaption { margin-top: 0; }
}
</style>
