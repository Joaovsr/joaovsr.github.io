<template>
  <section id="skills" class="section skills">
    <div class="section__head"><h2 class="section__title">{{ t('skills.title') }}</h2><p class="section__sub">{{ t('skills.sub') }}</p></div>
    <div class="skills__groups">
      <details v-for="category in skillCatalog.categories" :key="category">
        <summary><span class="skills__label">{{ t('skills.categories.' + category) }}<span class="skills__preview">{{ skillCatalog.byCategory[category].slice(0, 3).map(skill => skill.name).join(' · ') }}</span></span><span class="skills__toggle" aria-hidden="true">+</span></summary>
        <p>{{ skillCatalog.byCategory[category].map(skill => skill.name).join(', ') }}</p>
      </details>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skillCatalog } from '@/data/skills'
const { t } = useI18n()
</script>
<style scoped lang="scss">
.skills { padding-top: 0; display: grid; grid-template-columns: 1fr 1.7fr; gap: 72px; }
.skills .section__title { font-size: 28px; }
.skills__groups { border-top: 1px solid $border; }
details { border-bottom: 1px solid $border; padding: 0 2px; }
summary { display: flex; align-items: center; justify-content: space-between; padding: 19px 0; cursor: pointer; list-style: none; font-size: 16px; }
summary::-webkit-details-marker { display: none; }
.skills__label { display: grid; gap: 8px; }
.skills__preview { font-size: 11px; line-height: 1.6; color: $muted; }
.skills__toggle { font-size: 24px; color: $primary; transition: transform .2s; }
summary:hover { color: $primary; }
details[open] .skills__toggle { transform: rotate(45deg); }
details[open] .skills__preview { display: none; }
details p { font-size: 14px; line-height: 1.9; color: $muted; padding: 0 32px 22px 0; }
@media (max-width: 850px) { .skills { grid-template-columns: 1fr; gap: 0; } }
</style>
