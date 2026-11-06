<template>
  <header class="top">
    <div class="top__inner">
      <a href="#hero" class="top__brand" :aria-label="profile.nameShort">
        <div class="logo">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
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
          <span class="top__sys">neural-lab</span>
        </div>
      </a>

      <nav class="top__nav" :aria-label="t('navigation')">
        <a
          v-for="(s, i) in NAV_SECTIONS"
          :key="s"
          :href="`#${s}`"
          class="top__link"
          :class="{ active: activeIdx === i }"
          :aria-current="activeIdx === i ? 'location' : undefined"
        >
          {{ t(`nav.${s}`) }}
        </a>
      </nav>

      <div class="top__actions">
        <details ref="mobileNav" class="top__mobile-nav" @keydown.esc.prevent="closeMobileNav">
          <summary :aria-label="t('navigation')">
            <span>Menu</span>
            <svg class="top__menu-icon" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </summary>
          <nav :aria-label="t('navigation')">
            <a v-for="(s, i) in NAV_SECTIONS" :key="s" :href="`#${s}`" :class="{ active: activeIdx === i }" :aria-current="activeIdx === i ? 'location' : undefined" @click="mobileNav?.removeAttribute('open')">{{ t(`nav.${s}`) }}</a>
          </nav>
        </details>
        <button class="lang" type="button" :aria-label="t('change_language')" @click="toggleLocale">
          <span :class="{ 'lang__active': locale === 'pt-BR' }" lang="pt-BR">PT</span>
          <span class="lang__separator" aria-hidden="true">/</span>
          <span :class="{ 'lang__active': locale === 'en-US' }" lang="en-US">EN</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { toggleLocale } from '@/plugins/i18n'

const NAV_SECTIONS = ['hero', 'projects', 'skills', 'experience', 'contact'] as const

const { t, locale } = useI18n()
const activeIdx = ref(-1)
const mobileNav = ref<HTMLDetailsElement>()

function closeMobileNav() {
  mobileNav.value?.removeAttribute('open')
  mobileNav.value?.querySelector('summary')?.focus()
}

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
  background: rgba($bg, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba($secondary, 0.08);
  z-index: $z-nav;
}
.top__inner {
  max-width: 1200px;
  min-height: 76px;
  margin: 0 auto;
  padding: 12px 60px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 32px;
}
.top__brand { display: flex; align-items: center; gap: 10px; min-height: 44px; width: fit-content; white-space: nowrap; }
.logo {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: $glow;
  border: 1px solid rgba($primary, 0.28);
  border-radius: 8px;
  background: rgba($primary, 0.08);
}
.top__title { display: flex; flex-direction: column; gap: 4px; line-height: 1.15; }
.top__name { font-size: 15px; font-weight: 700; letter-spacing: -0.03em; color: $secondary; }
.top__sys { font-family: $mono; font-size: 10px; color: rgba($secondary, 0.6); }

.top__nav {
  display: flex;
  gap: 4px;
  justify-self: center;
}
.top__link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: rgba($secondary, 0.7);
  transition: color $transition-fast, background $transition-fast;
  &:hover { color: $secondary; background: rgba($secondary, 0.04); }
  &.active { color: $accent; background: rgba($accent, 0.06); }
  &.active::after { content: ''; position: absolute; bottom: 0; left: 14px; right: 14px; height: 2px; border-radius: 2px; background: $accent; }
}
.top__actions { display: flex; align-items: center; justify-self: end; gap: 20px; }
.top__mobile-nav { display: none; }
.lang {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: $mono;
  font-size: 11px;
  color: $muted;
  border: 1px solid rgba($secondary, 0.14);
  border-radius: 6px;
  padding: 8px 12px;
  min-height: 44px;
  background: rgba($surface, 0.65);
  cursor: pointer;
  transition: border-color $transition-fast, background $transition-fast;
  &:hover { border-color: rgba($accent, 0.5); background: rgba($accent, 0.04); }
}
.lang__active { color: $secondary; font-weight: 700; }
.lang__separator { color: $dim; }

@media (max-width: $tablet) {
  .top__inner { grid-template-columns: auto 1fr auto; gap: 20px; padding-inline: 32px; }
  .top__nav { gap: 0; }
  .top__link { padding-inline: 10px; font-size: 12px; }
}
@media (max-width: $mobile) {
  .top__inner { display: flex; justify-content: space-between; gap: 12px; min-height: 72px; padding: 12px 20px; }
  .top__nav { display: none; }
  .top__actions { gap: 8px; }
  .top__mobile-nav { display: block; }
  .top__mobile-nav summary { display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 10px; border: 1px solid $border; border-radius: 6px; background: $surface; font-size: 12px; color: $secondary; cursor: pointer; list-style: none; }
  .top__mobile-nav summary::-webkit-details-marker { display: none; }
  .top__mobile-nav nav { position: absolute; top: 100%; left: 20px; right: 20px; display: grid; gap: 4px; padding: 8px; border: 1px solid $border; border-radius: 8px; background: $surface; box-shadow: 0 20px 48px #0006; }
  .top__mobile-nav nav a { display: flex; align-items: center; min-height: 48px; padding: 12px 14px; border-left: 2px solid transparent; border-radius: 4px; font-size: 14px; font-weight: 500; color: rgba($secondary, 0.75); }
  .top__mobile-nav nav a:hover { color: $secondary; background: $elevated; }
  .top__mobile-nav nav a.active { color: $accent; border-left-color: $accent; background: rgba($accent, 0.06); }
  .top__mobile-nav[open] summary { color: $accent; border-color: rgba($accent, 0.4); }
}
@media (max-width: 380px) {
  .top__inner { padding-inline: 16px; }
  .top__name { font-size: 14px; }
  .top__mobile-nav summary > span { display: none; }
  .top__mobile-nav summary { min-width: 44px; }
}
</style>
