<template>
  <section id="contact" class="v2-section v2-contact">
    <div class="v2-section__head">
      <span class="v2-section__num">// 07</span>
      <h2 class="v2-section__title">{{ t('contact.title') }}</h2>
    </div>
    <p class="v2-contact__sub">{{ t('contact.subtitle') }}</p>
    <a :href="`mailto:${profile.email}`" class="v2-contact__email">{{ profile.email }}</a>
    <div class="v2-contact__row">
      <a :href="profile.social.github" target="_blank" rel="noopener noreferrer" class="v2-contact__btn">
        <GithubIcon /> GitHub
      </a>
      <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer" class="v2-contact__btn">
        <LinkedinIcon /> LinkedIn
      </a>
      <button type="button" @click="downloadCv" class="v2-contact__btn">↓ {{ t('download_cv') }}</button>
    </div>
    <footer class="v2-footer">
      <span>{{ t('contact.footer') }} · {{ profile.brand.replace(/^\/\/\s*/, '') }}</span>
      <span class="v2-footer__sig">© {{ year }} {{ profile.nameShort }}</span>
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
.v2-contact__sub {
  font-size: clamp(20px, 3vw, 28px);
  color: rgba($v2-secondary, 0.55);
  margin-bottom: 24px;
}
.v2-contact__email {
  display: inline-block;
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 700;
  background: linear-gradient(120deg, $v2-primary, $v2-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 28px;
  border-bottom: 1px solid $v2-border;
  padding-bottom: 6px;
}
.v2-contact__row { display: flex; gap: 14px; flex-wrap: wrap; }
.v2-contact__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: $v2-mono;
  font-size: 13px;
  padding: 12px 22px;
  border: 1px solid $v2-border;
  color: $v2-secondary;
  transition: all $transition-base;
  &:hover { border-color: $v2-primary; color: $v2-primary; }
  :deep(svg) { width: 16px; height: 16px; fill: currentColor; }
}
.v2-footer {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid $v2-border;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
  flex-wrap: wrap;
  gap: 12px;
}
.v2-footer__sig { color: $v2-muted; }
</style>
