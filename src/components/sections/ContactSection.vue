<template>
  <section id="contact" class="contact">
    <div class="section">
      <p class="eyebrow"><span>04 /</span> {{ t('nav.contact') }}</p>
      <div class="contact__intro"><h2>{{ t('contact.title') }}</h2><p>{{ t('contact.subtitle') }}</p></div>
      <a :href="'mailto:' + profile.email" class="contact__email">{{ profile.email }}<span aria-hidden="true">↗</span></a>
      <div class="contact__links">
        <a :href="profile.social.github" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <button type="button" @click="downloadCv">{{ t('download_cv') }} <span aria-hidden="true">↓</span></button>
      </div>
      <footer><span>© {{ year }} {{ profile.nameShort }}</span><a href="#hero">{{ t('back_top') }} ↑</a></footer>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { useCvPdf } from '@/composables/useCvPdf'
const { t } = useI18n()
const { downloadCv } = useCvPdf()
const year = new Date().getFullYear()
</script>
<style scoped lang="scss">
.contact { background: $primary; color: white; scroll-margin-top: 100px; }
.contact .eyebrow { color: #dce4ff; margin-bottom: 32px; }
.contact .eyebrow > span { color: #dce4ff; }
.contact__intro { display: flex; justify-content: space-between; align-items: start; gap: 40px; }
h2 { font-size: clamp(38px, 6vw, 76px); font-weight: 600; letter-spacing: -.06em; line-height: 1.1; }
.contact__intro p { font-size: 14px; line-height: 1.8; max-width: 310px; color: #e0e7ff; }
.contact__email { display: inline-flex; align-items: center; gap: 32px; max-width: 100%; font-size: clamp(16px, 3.1vw, 40px); letter-spacing: -.045em; padding: 32px 0 14px; color: white; border-bottom: 1px solid #ffffff70; }
.contact__email:hover { border-color: white; }
.contact__email span { flex-shrink: 0; }
.contact__links { display: flex; flex-wrap: wrap; gap: 32px; margin-top: 32px; font-size: 13px; }
.contact__links a, .contact__links button { padding-block: 12px; }
.contact__links a:hover, .contact__links button:hover { text-decoration: underline; text-underline-offset: 6px; }
.contact__links span { margin-left: 12px; }
footer { margin-top: 64px; padding-top: 22px; border-top: 1px solid #ffffff40; display: flex; justify-content: space-between; align-items: center; gap: 20px; font-family: $mono; font-size: 10px; color: #e0e7ff; }
footer a { padding-block: 12px; }
.contact :focus-visible { outline-color: white; }
@media (max-width: 650px) { .contact__intro { flex-direction: column; gap: 20px; } .contact__email { gap: 12px; font-size: clamp(14px, 4.5vw, 27px); } footer { margin-top: 48px; } }
</style>
