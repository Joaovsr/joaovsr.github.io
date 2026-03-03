<template>
  <div class="v1" @wheel.prevent="onWheel">
    <!-- Stars Background -->
    <div class="stars" aria-hidden="true">
      <span v-for="i in 60" :key="i" class="star" :style="starStyle(i)" />
    </div>

    <!-- Fixed Left Nav -->
    <nav class="v1-nav">
      <div class="v1-nav__logo" @mouseenter="glitchActive = true" @mouseleave="glitchActive = false">
        <span class="v1-nav__logo-text" :class="{ glitch: glitchActive }" data-text="JVR">JVR</span>
      </div>
      <ul class="v1-nav__items">
        <li v-for="(section, idx) in sections" :key="section.id">
          <button
            class="v1-nav__item"
            :class="{ active: currentSection === idx }"
            @click="scrollTo(idx)"
            :title="t(`nav.${section.id}`)"
          >
            <span class="v1-nav__dot" />
            <span class="v1-nav__label">{{ t(`nav.${section.id}`) }}</span>
          </button>
        </li>
      </ul>
      <div class="v1-nav__socials">
        <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GithubIcon />
        </a>
        <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
      </div>
    </nav>

    <!-- Lang + Version toggle (top right) -->
    <div class="v1-topbar">
      <button class="v1-topbar__lang" @click="toggleLocale">{{ t('lang_toggle') }}</button>
      <RouterLink to="/" class="v1-topbar__versions">↗ versões</RouterLink>
    </div>

    <!-- Sections container -->
    <main ref="mainRef" class="v1-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="hero" class="v1-section v1-hero">
        <div class="v1-hero__content">
          <p class="v1-hero__greeting">{{ currentLocale === 'pt-BR' ? 'Olá, eu sou' : "Hi, I'm" }}</p>
          <h1 class="v1-hero__name" ref="nameRef">João Vinicius</h1>
          <div class="v1-hero__role">
            <span class="v1-hero__role-main">{{ t('role') }}</span>
            <span class="v1-hero__role-sep"> — </span>
            <span class="v1-hero__role-sub">{{ t('role_sub') }}</span>
          </div>
          <p class="v1-hero__tagline">{{ t('tagline') }}</p>
          <div class="v1-hero__stack">
            <span v-for="tech in heroStack" :key="tech" class="v1-hero__badge">{{ tech }}</span>
          </div>
          <div class="v1-hero__cta">
            <a href="/cv-joaovinicius.pdf" download class="v1-btn v1-btn--primary">{{ t('download_cv') }}</a>
            <button class="v1-btn v1-btn--ghost" @click="scrollTo(1)">{{ t('nav.about') }} ↓</button>
          </div>
        </div>
        <PlanetIcon class="v1-hero__planet" />
        <div class="v1-hero__scroll-hint">
          <ScrollTipIcon />
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="about" class="v1-section v1-about">
        <h2 class="v1-section__title">{{ t('about.title') }}<span class="v1-section__title-accent">.</span></h2>
        <div class="v1-about__content">
          <div class="v1-about__text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
            <ul class="v1-about__differentials">
              <li v-for="diff in (t('about.differentials') as unknown as string[])" :key="diff">
                <span class="v1-accent">›</span> {{ diff }}
              </li>
            </ul>
            <p class="v1-about__remote">
              <span class="v1-accent">◉</span> {{ t('about.open_to') }}
            </p>
          </div>
          <div class="v1-about__profile">
            <div class="v1-about__avatar">JV</div>
            <div class="v1-about__info">
              <p class="v1-about__location">📍 {{ t('location') }}</p>
              <p class="v1-about__email">✉ joaovinicius2525@gmail.com</p>
            </div>
            <div class="v1-about__langs">
              <h4>{{ t('about.languages_title') }}</h4>
              <div v-for="lang in (t('about.languages') as unknown as Array<{name: string; level: string}>)" :key="lang.name" class="v1-about__lang-row">
                <span>{{ lang.name }}</span>
                <span class="v1-about__lang-level">{{ lang.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="experience" class="v1-section v1-experience">
        <h2 class="v1-section__title">{{ t('experience.title') }}<span class="v1-section__title-accent">.</span></h2>
        <div class="v1-experience__list">
          <div v-for="exp in experiences" :key="exp.id" class="v1-exp-card">
            <div class="v1-exp-card__header">
              <div>
                <h3 class="v1-exp-card__role">{{ exp.role }}</h3>
                <p class="v1-exp-card__company">{{ exp.company }}</p>
              </div>
              <span class="v1-exp-card__period">
                {{ formatDate(exp.startDate) }} — {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
              </span>
            </div>
            <p class="v1-exp-card__desc">{{ exp.description }}</p>
            <div class="v1-exp-card__skills">
              <span v-for="skill in exp.skills" :key="skill" class="v1-chip">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="skills" class="v1-section v1-skills">
        <h2 class="v1-section__title">{{ t('skills.title') }}<span class="v1-section__title-accent">.</span></h2>
        <div class="v1-skills__grid">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v1-skills__category">
            <h3 class="v1-skills__cat-name">{{ categoryLabel(cat) }}</h3>
            <div class="v1-skills__tags">
              <span v-for="skill in skillList" :key="skill.id" class="v1-skill-tag">{{ skill.name }}</span>
            </div>
          </div>
        </div>
        <!-- Education + Certs -->
        <div class="v1-education">
          <h2 class="v1-section__title" style="margin-top:64px">{{ t('education.title') }}<span class="v1-section__title-accent">.</span></h2>
          <div class="v1-edu-list">
            <div v-for="edu in education" :key="edu.id" class="v1-edu-item">
              <span class="v1-accent">▸</span>
              <div>
                <p class="v1-edu-item__degree">{{ edu.degree }}</p>
                <p class="v1-edu-item__inst">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</p>
              </div>
            </div>
          </div>
          <div class="v1-certs">
            <div v-for="cert in certifications" :key="cert.id" class="v1-cert-item">
              <CertificateIcon class="v1-cert-icon" />
              <div>
                <p class="v1-cert-item__title">{{ cert.title }}</p>
                <p class="v1-cert-item__issuer">{{ cert.issuer }}
                  <span v-if="cert.status === 'in-progress'" class="v1-badge-progress">{{ t('education.in_progress') }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ───────────────────────────────────────── -->
      <section id="projects" class="v1-section v1-projects">
        <h2 class="v1-section__title">{{ t('projects.title') }}<span class="v1-section__title-accent">.</span></h2>
        <div class="v1-projects__grid">
          <div v-for="proj in projects" :key="proj.id" class="v1-proj-card">
            <div class="v1-proj-card__header">
              <h3 class="v1-proj-card__title">{{ proj.title }}</h3>
              <span v-if="proj.status === 'private'" class="v1-badge-private">{{ t('projects.private_label') }}</span>
            </div>
            <p class="v1-proj-card__desc">{{ proj.description }}</p>
            <div class="v1-proj-card__tech">
              <span v-for="tech in proj.technologies" :key="tech" class="v1-chip v1-chip--sm">{{ tech }}</span>
            </div>
            <div class="v1-proj-card__links">
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v1-link">
                <RepositoryIcon /> {{ t('projects.repo_label') }}
              </a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v1-link">
                <NewTabIcon /> {{ t('projects.site_label') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="contact" class="v1-section v1-contact">
        <h2 class="v1-section__title">{{ t('contact.title') }}<span class="v1-section__title-accent">.</span></h2>
        <p class="v1-contact__subtitle">{{ t('contact.subtitle') }}</p>
        <div class="v1-contact__email-row">
          <a href="mailto:joaovinicius2525@gmail.com" class="v1-contact__email">joaovinicius2525@gmail.com</a>
          <button class="v1-contact__copy" @click="copyEmail" :title="t('contact.copy_label')">
            <ClipboardCheckIcon v-if="copied" />
            <ClipboardIcon v-else />
            <span class="v1-contact__copy-label">{{ copied ? t('contact.copied') : t('contact.copy_label') }}</span>
          </button>
        </div>
        <div class="v1-contact__socials">
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v1-social-btn">
            <GithubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v1-social-btn">
            <LinkedinIcon /> LinkedIn
          </a>
        </div>
        <footer class="v1-footer">{{ t('contact.footer') }}</footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortfolio } from '@/composables/usePortfolio'
import { toggleLocale } from '@/plugins/i18n'
import GithubIcon from '@/components/icons/Github.vue'
import LinkedinIcon from '@/components/icons/Linkedin.vue'
import ClipboardIcon from '@/components/icons/Clipboard.vue'
import ClipboardCheckIcon from '@/components/icons/ClipboardCheck.vue'
import RepositoryIcon from '@/components/icons/Repository.vue'
import NewTabIcon from '@/components/icons/NewTab.vue'
import PlanetIcon from '@/components/icons/Planet.vue'
import ScrollTipIcon from '@/components/icons/ScrollTip.vue'
import CertificateIcon from '@/components/icons/Certificate.vue'

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, formatDate, categoryLabel } = usePortfolio()

const sections = [
  { id: 'about' },
  { id: 'experience' },
  { id: 'skills' },
  { id: 'projects' },
  { id: 'contact' }
]

const heroStack = ['React', 'NestJS', 'Flutter', 'Python', 'TypeScript']

const currentSection = ref(0)
const glitchActive = ref(false)
const copied = ref(false)
const mainRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()

// Stars
function starStyle(i: number) {
  const seed = i * 137.508
  return {
    top: `${(seed * 0.618) % 100}%`,
    left: `${(seed * 0.381) % 100}%`,
    animationDelay: `${(i * 0.3) % 8}s`,
    animationDuration: `${3 + (i % 5)}s`,
    width: `${1 + (i % 3)}px`,
    height: `${1 + (i % 3)}px`
  }
}

// Wheel scroll
let wheelTimeout: ReturnType<typeof setTimeout> | null = null

function onWheel(e: WheelEvent) {
  if (wheelTimeout) return
  wheelTimeout = setTimeout(() => { wheelTimeout = null }, 700)

  if (e.deltaY > 0 && currentSection.value < sections.length - 1) {
    scrollTo(currentSection.value + 1)
  } else if (e.deltaY < 0 && currentSection.value > 0) {
    scrollTo(currentSection.value - 1)
  }
}

function scrollTo(idx: number) {
  currentSection.value = idx
  const id = idx === 0 ? 'hero' : sections[idx - 1]?.id ?? sections[idx].id
  // map idx 0=hero,1=about,2=experience,...
  const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']
  const el = document.getElementById(sectionIds[idx])
  el?.scrollIntoView({ behavior: 'smooth' })
}

// Scroll observer
let observer: IntersectionObserver

onMounted(() => {
  const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']
  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = sectionIds.indexOf(entry.target.id)
          if (idx !== -1) currentSection.value = idx
        }
      }
    },
    { threshold: 0.5 }
  )
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}
</script>

<style lang="scss" scoped>
.v1 {
  background-color: $v1-bg;
  color: $v1-secondary;
  font-family: $v1-font;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

// ─── Stars ──────────────────────────────────────────────────────────────────
.stars {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle var(--dur, 4s) var(--delay, 0s) infinite;
  opacity: 0;
}

@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 0.7; transform: scale(1); }
}

// ─── Nav ────────────────────────────────────────────────────────────────────
.v1-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 40px 28px;
  z-index: 100;
  border-right: 1px solid $v1-border;

  @media (max-width: $mobile) {
    display: none;
  }
}

.v1-nav__logo {
  margin-bottom: 48px;
}

.v1-nav__logo-text {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: $v1-primary;
  cursor: pointer;
  position: relative;
  display: inline-block;

  &.glitch {
    &::before {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      top: 0;
      color: #ff0066;
      animation: glitch-clip 0.3s infinite;
      clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    }
    &::after {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      top: 0;
      color: #00cfff;
      animation: glitch-clip 0.3s reverse infinite;
      clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    }
  }
}

@keyframes glitch-clip {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, 2px); }
  80% { transform: translate(1px, -2px); }
  100% { transform: translate(0); }
}

.v1-nav__items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.v1-nav__item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: $v1-muted;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color $transition-base;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  font-family: $v1-font;

  &:hover, &.active {
    color: $v1-secondary;
  }
  &.active .v1-nav__dot {
    background: $v1-primary;
    box-shadow: 0 0 8px $v1-primary;
  }
}

.v1-nav__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  transition: background $transition-base;
}

.v1-nav__socials {
  display: flex;
  gap: 16px;
  margin-top: 24px;

  a {
    color: $v1-muted;
    transition: color $transition-base;
    display: flex;

    &:hover { color: $v1-primary; }

    :deep(svg) { width: 20px; height: 20px; fill: currentColor; }
  }
}

// ─── Topbar ─────────────────────────────────────────────────────────────────
.v1-topbar {
  position: fixed;
  top: 24px;
  right: 32px;
  z-index: 100;
  display: flex;
  gap: 20px;
  align-items: center;
}

.v1-topbar__lang {
  font-family: $v1-font;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v1-muted;
  border: 1px solid $v1-border;
  padding: 6px 14px;
  background: transparent;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    color: $v1-primary;
    border-color: $v1-primary;
  }
}

.v1-topbar__versions {
  font-size: 12px;
  font-weight: 500;
  color: $v1-muted;
  transition: color $transition-base;
  &:hover { color: $v1-primary; }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v1-main {
  margin-left: 200px;
  position: relative;
  z-index: 1;

  @media (max-width: $mobile) {
    margin-left: 0;
  }
}

// ─── Section Base ────────────────────────────────────────────────────────────
.v1-section {
  min-height: 100vh;
  padding: 80px 80px 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid $v1-border;

  @media (max-width: $mobile) {
    padding: 80px 24px 60px;
  }
}

.v1-section__title {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 48px;
  color: $v1-secondary;
}

.v1-section__title-accent {
  color: $v1-primary;
}

.v1-accent {
  color: $v1-primary;
}

// ─── Hero ────────────────────────────────────────────────────────────────────
.v1-hero {
  position: relative;
  overflow: hidden;
}

.v1-hero__content {
  max-width: 680px;
  animation: fadeInUp 1s ease both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.v1-hero__greeting {
  font-size: 16px;
  color: $v1-primary;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
  animation: fadeInUp 1s 0.1s ease both;
}

.v1-hero__name {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  animation: fadeInUp 1s 0.2s ease both;
}

.v1-hero__role {
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;
  animation: fadeInUp 1s 0.3s ease both;
}

.v1-hero__role-main { color: $v1-secondary; }
.v1-hero__role-sep  { color: $v1-primary; margin: 0 8px; }
.v1-hero__role-sub  { color: $v1-primary; }

.v1-hero__tagline {
  font-size: 15px;
  color: $v1-muted;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 32px;
  animation: fadeInUp 1s 0.4s ease both;
}

.v1-hero__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  animation: fadeInUp 1s 0.5s ease both;
}

.v1-hero__badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $v1-primary;
  border: 1px solid rgba($v1-primary, 0.3);
  padding: 5px 12px;
}

.v1-hero__cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeInUp 1s 0.6s ease both;
}

.v1-hero__planet {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: min(400px, 45vw);
  height: min(400px, 45vw);
  opacity: 0.15;
  pointer-events: none;
  z-index: -1;
}

.v1-hero__scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  animation: bounce 2s infinite;

  :deep(svg) { width: 20px; height: 20px; fill: $v1-secondary; }
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

// ─── Buttons ─────────────────────────────────────────────────────────────────
.v1-btn {
  font-family: $v1-font;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 32px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &--primary {
    background: $v1-primary;
    color: $v1-bg;
    border: 1px solid $v1-primary;

    &:hover {
      background: transparent;
      color: $v1-primary;
    }
  }

  &--ghost {
    background: transparent;
    color: $v1-secondary;
    border: 1px solid $v1-border;

    &:hover {
      border-color: $v1-primary;
      color: $v1-primary;
    }
  }
}

// ─── About ───────────────────────────────────────────────────────────────────
.v1-about__content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 64px;
  align-items: start;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.v1-about__text {
  p {
    font-size: 17px;
    line-height: 1.8;
    color: rgba($v1-secondary, 0.85);
    margin-bottom: 20px;
  }
}

.v1-about__differentials {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;

  li {
    font-size: 15px;
    color: $v1-muted;
    display: flex;
    gap: 10px;
  }
}

.v1-about__remote {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: $v1-primary;
  font-weight: 500;
}

.v1-about__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: $v1-surface;
  border: 2px solid $v1-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 900;
  color: $v1-primary;
  margin-bottom: 24px;
  box-shadow: 0 0 30px rgba($v1-primary, 0.2);
}

.v1-about__info {
  margin-bottom: 24px;

  p {
    font-size: 13px;
    color: $v1-muted;
    margin-bottom: 8px;
  }
}

.v1-about__langs h4 {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v1-muted;
  margin-bottom: 12px;
}

.v1-about__lang-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  color: rgba($v1-secondary, 0.8);
}

.v1-about__lang-level {
  color: $v1-primary;
  font-size: 12px;
}

// ─── Experience ───────────────────────────────────────────────────────────────
.v1-experience__list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.v1-exp-card {
  border: 1px solid $v1-border;
  padding: 28px 32px;
  background: rgba(255, 255, 255, 0.02);
  transition: border-color $transition-base;

  &:hover {
    border-color: rgba($v1-primary, 0.4);
  }
}

.v1-exp-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  @media (max-width: $mobile) {
    flex-direction: column;
  }
}

.v1-exp-card__role {
  font-size: 18px;
  font-weight: 700;
  color: $v1-secondary;
  margin-bottom: 4px;
}

.v1-exp-card__company {
  font-size: 14px;
  color: $v1-primary;
}

.v1-exp-card__period {
  font-size: 12px;
  color: $v1-muted;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v1-exp-card__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($v1-secondary, 0.7);
  margin-bottom: 16px;
}

.v1-exp-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

// ─── Chips ───────────────────────────────────────────────────────────────────
.v1-chip {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border: 1px solid $v1-border;
  color: $v1-muted;

  &--sm { font-size: 10px; padding: 3px 8px; }
}

// ─── Skills ──────────────────────────────────────────────────────────────────
.v1-skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
}

.v1-skills__category {
  border: 1px solid $v1-border;
  padding: 24px;
  position: relative;
  background: rgba(255, 255, 255, 0.02);

  &:hover {
    border-color: rgba($v1-primary, 0.3);
    box-shadow: 0 0 20px rgba($v1-primary, 0.05);
  }
}

.v1-skills__cat-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $v1-primary;
  margin-bottom: 16px;
  position: absolute;
  top: -10px;
  left: 16px;
  background: $v1-bg;
  padding: 0 8px;
}

.v1-skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.v1-skill-tag {
  font-size: 13px;
  color: rgba($v1-secondary, 0.8);
  padding: 6px 14px;
  border: 1px solid $v1-border;
  transition: all $transition-fast;

  &:hover {
    border-color: $v1-primary;
    color: $v1-primary;
  }
}

// ─── Education ───────────────────────────────────────────────────────────────
.v1-edu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.v1-edu-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.v1-edu-item__degree {
  font-size: 16px;
  font-weight: 600;
  color: $v1-secondary;
  margin-bottom: 4px;
}

.v1-edu-item__inst {
  font-size: 13px;
  color: $v1-muted;
}

.v1-certs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v1-cert-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.v1-cert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
  :deep(svg), :deep(path) { fill: $v1-primary; }
}

.v1-cert-item__title {
  font-size: 15px;
  font-weight: 600;
  color: $v1-secondary;
  margin-bottom: 4px;
}

.v1-cert-item__issuer {
  font-size: 13px;
  color: $v1-muted;
  display: flex;
  align-items: center;
  gap: 10px;
}

.v1-badge-progress {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border: 1px solid $v1-primary;
  color: $v1-primary;
}

// ─── Projects ────────────────────────────────────────────────────────────────
.v1-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.v1-proj-card {
  border: 1px solid $v1-border;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(255, 255, 255, 0.02);
  transition: all $transition-base;

  &:hover {
    border-color: rgba($v1-primary, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  }
}

.v1-proj-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.v1-proj-card__title {
  font-size: 18px;
  font-weight: 700;
  color: $v1-secondary;
}

.v1-badge-private {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  background: rgba($v1-primary, 0.1);
  color: $v1-primary;
  white-space: nowrap;
}

.v1-proj-card__desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba($v1-secondary, 0.7);
  flex: 1;
}

.v1-proj-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.v1-proj-card__links {
  display: flex;
  gap: 16px;
}

.v1-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $v1-muted;
  transition: color $transition-base;

  &:hover { color: $v1-primary; }

  :deep(svg) { width: 14px; height: 14px; fill: currentColor; }
}

// ─── Contact ─────────────────────────────────────────────────────────────────
.v1-contact {
  gap: 0;
}

.v1-contact__subtitle {
  font-size: 28px;
  font-weight: 300;
  color: rgba($v1-secondary, 0.6);
  margin-bottom: 48px;
}

.v1-contact__email-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.v1-contact__email {
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 700;
  color: $v1-secondary;
  border-bottom: 2px solid $v1-primary;
  padding-bottom: 4px;
  transition: color $transition-base;

  &:hover { color: $v1-primary; }
}

.v1-contact__copy {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: $v1-muted;
  transition: color $transition-base;
  font-family: $v1-font;

  &:hover { color: $v1-primary; }

  :deep(svg) { width: 16px; height: 16px; fill: currentColor; }
}

.v1-contact__copy-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }

.v1-contact__socials {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.v1-social-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: $v1-muted;
  border: 1px solid $v1-border;
  padding: 12px 24px;
  transition: all $transition-base;

  &:hover {
    color: $v1-secondary;
    border-color: $v1-primary;
  }

  :deep(svg) { width: 18px; height: 18px; fill: currentColor; }
}

// ─── Footer ──────────────────────────────────────────────────────────────────
.v1-footer {
  margin-top: auto;
  padding-top: 60px;
  font-size: 12px;
  color: $v1-muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
