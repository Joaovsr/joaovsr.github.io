<template>
  <header class="top">
    <div class="top__brand">
      <div class="logo">
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
      <div class="top__title">
        <span class="top__name">{{ profile.nameShort }}</span>
        <span class="top__sys">{{ profile.brand }}</span>
      </div>
    </div>

    <nav class="top__nav">
      <a
        v-for="(s, i) in NAV_SECTIONS"
        :key="s"
        :href="`#${s}`"
        class="top__link"
        :class="{ active: activeIdx === i }"
      >
        {{ t(`nav.${s}`) }}
      </a>
    </nav>

    <div class="top__actions">
      <span class="status">
        <span class="status__dot"></span>
        <span class="status__txt">{{ t('status_online') }}</span>
      </span>
      <button class="lang" @click="toggleLocale">{{ t('lang_toggle') }}</button>
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
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba($bg, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid $border;
  z-index: 80;

  @media (max-width: $mobile) { padding: 12px 18px; }
}
.top__brand { display: flex; align-items: center; gap: 14px; }
.logo { color: $primary; display: flex; align-items: center; }
.top__title { display: flex; flex-direction: column; line-height: 1.1; }
.top__name { font-size: 14px; font-weight: 700; color: $secondary; }
.top__sys { font-family: $mono; font-size: 10px; color: $muted; }

.top__nav {
  display: flex;
  gap: 22px;

  @media (max-width: $tablet) { display: none; }
}
.top__link {
  font-family: $mono;
  font-size: 12px;
  color: $muted;
  letter-spacing: 0.04em;
  transition: color $transition-base;
  text-transform: lowercase;
  &:hover, &.active { color: $secondary; }
  &.active { color: $accent; }
}
.top__actions { display: flex; align-items: center; gap: 14px; }
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: $mono;
  font-size: 11px;
  color: $muted;

  @media (max-width: $mobile) { display: none; }
}
.status__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse 2s infinite;
}
.lang {
  font-family: $mono;
  font-size: 11px;
  color: $muted;
  border: 1px solid $border;
  padding: 6px 10px;
  background: transparent;
  cursor: pointer;
  transition: all $transition-base;
  &:hover { color: $primary; border-color: $primary; }
}
</style>
