<template>
  <section id="about" class="section about">
    <div class="about__heading"><p class="eyebrow"><span>02 /</span> {{ t('nav.about') }}</p><h2 class="section__title">{{ t('about.title') }}</h2><p>{{ t('location') }}</p></div>
    <div class="about__copy">
      <p class="about__lead">{{ t('about.text') }}</p>
      <p>{{ t('about.text2') }}</p>
      <div class="about__languages"><span v-for="language in languages" :key="language.name">{{ language.name }} <span>{{ language.level }}</span></span></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
const languages = computed(() => tm('about.languages') as Array<{ name: string; level: string }>)
</script>
<style scoped lang="scss">
.about { display: grid; grid-template-columns: 1fr 1.7fr; gap: 72px; border-top: 1px solid $border; }
.about__heading p { font-size: 13px; color: $muted; margin-top: 20px; }
.about__heading .eyebrow { margin: 0 0 22px; font-size: 11px; }
.about__copy > p { font-size: 16px; line-height: 1.9; color: $muted; max-width: 64ch; }
.about__copy .about__lead { font-size: 23px; line-height: 1.6; color: $secondary; letter-spacing: -.025em; margin-bottom: 22px; }
.about__languages { display: flex; gap: 28px; flex-wrap: wrap; margin-top: 28px; font-size: 13px; }
.about__languages > span > span { color: $muted; margin-left: 8px; }
@media (max-width: 850px) { .about { grid-template-columns: 1fr; gap: 30px; } .about__copy .about__lead { font-size: 20px; } }
</style>
