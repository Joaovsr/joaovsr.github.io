<template>
  <section id="contact" class="section contact">
    <div class="section__head">
      <span class="section__num">// 07</span>
      <h2 class="section__title">{{ t('contact.title') }}</h2>
    </div>
    <p class="contact__sub">{{ t('contact.subtitle') }}</p>
    <a :href="`mailto:${profile.email}`" class="contact__email">{{ profile.email }}</a>
    <div class="contact__row">
      <a :href="profile.social.github" target="_blank" rel="noopener noreferrer" class="contact__btn">
        <GithubIcon /> GitHub
      </a>
      <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer" class="contact__btn">
        <LinkedinIcon /> LinkedIn
      </a>
      <button type="button" @click="downloadCv" class="contact__btn">↓ {{ t('download_cv') }}</button>
    </div>
    <footer class="footer">
      <span>{{ t('contact.footer') }} · {{ profile.brand.replace(/^\/\/\s*/, '') }}</span>
      <span class="footer__sig">© {{ year }} {{ profile.nameShort }}</span>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { useCvPdf } from '@/composables/useCvPdf'
import GithubIcon from '@/components/icons/Github.vue'
import LinkedinIcon from '@/components/icons/Linkedin.vue'

const { t } = useI18n()
const { downloadCv } = useCvPdf()
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.contact__sub {
  font-size: clamp(20px, 3vw, 28px);
  color: rgba($secondary, 0.55);
  margin-bottom: 24px;
}
.contact__email {
  display: inline-block;
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 700;
  background: linear-gradient(120deg, $primary, $accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 28px;
  border-bottom: 1px solid $border;
  padding-bottom: 6px;
}
.contact__row { display: flex; gap: 14px; flex-wrap: wrap; }
.contact__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: $mono;
  font-size: 13px;
  padding: 12px 22px;
  border: 1px solid $border;
  color: $secondary;
  transition: all $transition-base;
  &:hover { border-color: $primary; color: $primary; }
  :deep(svg) { width: 16px; height: 16px; fill: currentColor; }
}
.footer {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid $border;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $mono;
  font-size: 11px;
  color: $muted;
  flex-wrap: wrap;
  gap: 12px;
}
.footer__sig { color: $muted; }
</style>
