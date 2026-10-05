<template>
  <header class="top">
    <a href="#hero" class="top__brand" :aria-label="profile.nameShort"><span class="monogram" aria-hidden="true">jv.</span><span>{{ profile.nameShort }}</span></a>
    <nav :aria-label="t('navigation')">
      <a href="#projects">{{ t('nav.projects') }}</a>
      <a href="#about">{{ t('nav.about') }}</a>
      <a href="#experience">{{ t('nav.experience') }}</a>
      <a href="#contact">{{ t('nav.contact') }} <span aria-hidden="true">↗</span></a>
    </nav>
    <button class="lang" type="button" :aria-label="t('change_language')" @click="toggleLocale"><span :class="{ active: locale === 'pt-BR' }">PT</span><span class="lang__divider" aria-hidden="true">/</span><span :class="{ active: locale === 'en-US' }">EN</span></button>
  </header>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { toggleLocale } from '@/plugins/i18n'
const { t, locale } = useI18n()
</script>
<style scoped lang="scss">
.top { position: fixed; inset: 0 0 auto; z-index: 80; height: 80px; padding: 0 max(6vw, calc((100vw - 1200px) / 2)); display: flex; align-items: center; justify-content: space-between; gap: 24px; background: $bg; border-bottom: 1px solid $border; }
.top__brand { display: flex; align-items: center; gap: 14px; font-size: 14px; font-weight: 600; }
.monogram { font-size: 34px; color: $primary; letter-spacing: -3px; font-weight: 700; }
nav { display: flex; gap: 30px; font-size: 13px; }
nav a { display: inline-flex; align-items: center; gap: 6px; padding-block: 16px; line-height: 1.5; white-space: nowrap; transition: color .2s; }
nav a span { color: $primary; line-height: 1; }
nav a:hover { color: $primary; }
.lang { display: flex; align-items: center; gap: 8px; min-height: 44px; padding-inline: 8px; font-family: $mono; font-size: 11px; color: $muted; }
.lang .active { color: $primary; font-weight: 700; }
.lang__divider { color: $border; }
.lang:hover { background: $elevated; border-radius: 4px; }
@media (max-width: 650px) {
  .top { height: 104px; flex-wrap: wrap; padding: 8px 20px 0; gap: 0; }
  .top__brand { font-size: 13px; }
  .monogram { font-size: 29px; }
  nav { order: 3; width: 100%; justify-content: space-between; gap: 12px; font-size: 12px; }
  .lang { min-width: 40px; min-height: 40px; }
}
</style>
