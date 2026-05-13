<template>
  <header class="v2-top">
    <div class="v2-top__brand">
      <div class="v2-logo">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="4" cy="6" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="20" cy="6" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="4" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="20" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
          <line x1="12" y1="12" x2="4" y2="6" stroke="currentColor" stroke-width="0.6" opacity="0.5" />
          <line x1="12" y1="12" x2="20" y2="6" stroke="currentColor" stroke-width="0.6" opacity="0.5" />
          <line x1="12" y1="12" x2="4" y2="18" stroke="currentColor" stroke-width="0.6" opacity="0.5" />
          <line x1="12" y1="12" x2="20" y2="18" stroke="currentColor" stroke-width="0.6" opacity="0.5" />
        </svg>
      </div>
      <div class="v2-top__title">
        <span class="v2-top__name">{{ profile.nameShort }}</span>
        <span class="v2-top__sys">{{ profile.brand }}</span>
      </div>
    </div>

    <nav class="v2-top__nav">
      <a
        v-for="(s, i) in NAV_SECTIONS"
        :key="s"
        :href="`#${s}`"
        class="v2-top__link"
        :class="{ active: activeIdx === i }"
      >
        {{ t(`nav.${s}`) }}
      </a>
    </nav>

    <div class="v2-top__actions">
      <span class="v2-status">
        <span class="v2-status__dot"></span>
        <span class="v2-status__txt">{{ t('v2.status_online') }}</span>
      </span>
      <button class="v2-lang" @click="toggleLocale">{{ t('lang_toggle') }}</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { toggleLocale } from '@/plugins/i18n'

const NAV_SECTIONS = ['about', 'projects', 'skills', 'experience', 'contact'] as const

const { t } = useI18n()
const activeIdx = ref(-1)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const idx = NAV_SECTIONS.findIndex(id => id === entry.target.id)
        if (idx !== -1) activeIdx.value = idx
      }
    },
    { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
  )
  for (const id of NAV_SECTIONS) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style lang="scss" scoped>
.v2-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba($v2-bg, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid $v2-border;
  z-index: 80;

  @media (max-width: $mobile) { padding: 12px 18px; }
}
.v2-top__brand { display: flex; align-items: center; gap: 14px; }
.v2-logo { color: $v2-primary; display: flex; align-items: center; }
.v2-top__title { display: flex; flex-direction: column; line-height: 1.1; }
.v2-top__name { font-size: 14px; font-weight: 700; color: $v2-secondary; }
.v2-top__sys { font-family: $v2-mono; font-size: 10px; color: $v2-muted; }

.v2-top__nav {
  display: flex;
  gap: 22px;

  @media (max-width: $tablet) { display: none; }
}
.v2-top__link {
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-muted;
  letter-spacing: 0.04em;
  transition: color $transition-base;
  text-transform: lowercase;
  &:hover, &.active { color: $v2-secondary; }
  &.active { color: $v2-accent; }
}
.v2-top__actions { display: flex; align-items: center; gap: 14px; }
.v2-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;

  @media (max-width: $mobile) { display: none; }
}
.v2-status__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse2 2s infinite;
}
.v2-lang {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
  border: 1px solid $v2-border;
  padding: 6px 10px;
  background: transparent;
  cursor: pointer;
  transition: all $transition-base;
  &:hover { color: $v2-primary; border-color: $v2-primary; }
}
</style>
