<template>
  <div class="v3">
    <!-- Grid background -->
    <div class="v3-grid-bg" aria-hidden="true" />

    <!-- Header -->
    <header class="v3-header">
      <div class="v3-header__left">
        <span class="v3-header__logo">JVR</span>
        <span class="v3-header__divider">/</span>
        <span class="v3-header__label">portfolio</span>
      </div>
      <nav class="v3-header__nav">
        <a v-for="s in sections" :key="s.id" :href="`#v3-${s.id}`" class="v3-header__link">{{ t(`nav.${s.id}`) }}</a>
      </nav>
      <div class="v3-header__right">
        <button class="v3-lang-btn" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/versions" class="v3-back">↗ versões</RouterLink>
      </div>
    </header>

    <main class="v3-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v3-hero" class="v3-hero">
        <div class="v3-hero__content">
          <p class="v3-hero__greeting">{{ currentLocale === 'pt-BR' ? 'Olá, eu sou' : "Hi, I'm" }}</p>
          <h1 class="v3-hero__name">João <span class="v3-accent">Vinicius</span></h1>
          <p class="v3-hero__role">{{ t('role') }} <span class="v3-accent">|</span> {{ t('role_sub') }}</p>
          <p class="v3-hero__tagline">{{ t('tagline') }}</p>
          <div class="v3-hero__cta">
            <a href="/cv-joaovinicius.pdf" download class="v3-btn v3-btn--fill">{{ t('download_cv') }}</a>
            <a href="#v3-contact" class="v3-btn v3-btn--ghost">{{ t('contact.title') }}</a>
          </div>
        </div>
        <!-- Floating tech icons -->
        <div class="v3-hero__icons" aria-hidden="true">
          <component
            v-for="skill in iconSkills"
            :key="skill.id"
            :is="skill.icon"
            class="v3-hero__float-icon"
            :style="floatStyle(skill.id)"
          />
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v3-about" class="v3-section">
        <h2 class="v3-section__title"><span class="v3-accent">#</span> {{ t('about.title') }}</h2>
        <div class="v3-about__grid">
          <div class="v3-about__text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
            <ul class="v3-about__diffs">
              <li v-for="d in differentials" :key="d"><span class="v3-accent">▹</span> {{ d }}</li>
            </ul>
          </div>
          <div class="v3-about__sidebar">
            <img src="/avatar.jpg" alt="João Vinicius" />
            <div class="v3-about__info">
              <p>📍 {{ t('location') }}</p>
              <p>✉ joaovinicius2525@gmail.com</p>
            </div>
            <p class="v3-about__remote"><span class="v3-accent">◉</span> {{ t('about.open_to') }}</p>
            <div class="v3-about__langs">
              <h4>{{ t('about.languages_title') }}</h4>
              <div v-for="lang in languages" :key="lang.name" class="v3-lang-row">
                <span>{{ lang.name }}</span>
                <span class="v3-accent">{{ lang.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v3-experience" class="v3-section">
        <h2 class="v3-section__title"><span class="v3-accent">#</span> {{ t('experience.title') }}</h2>
        <div class="v3-exp-list">
          <div v-for="exp in experiences" :key="exp.id" class="v3-exp-card">
            <div class="v3-exp-card__neon" />
            <div class="v3-exp-card__body">
              <div class="v3-exp-card__header">
                <div>
                  <h3 class="v3-exp-card__role">{{ exp.role }}</h3>
                  <p class="v3-exp-card__company">{{ exp.company }}</p>
                </div>
                <span class="v3-exp-card__period">
                  {{ formatDate(exp.startDate) }} — {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
                </span>
              </div>
              <p class="v3-exp-card__desc">{{ exp.description }}</p>
              <div class="v3-exp-card__tags">
                <span v-for="skill in exp.skills" :key="skill" class="v3-chip">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS (Icon Grid) ───────────────────────────────── -->
      <section id="v3-skills" class="v3-section">
        <h2 class="v3-section__title"><span class="v3-accent">#</span> {{ t('skills.title') }}</h2>
        <div class="v3-skills__grid">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v3-skills__category">
            <h3 class="v3-skills__cat-name">{{ categoryLabel(cat) }}</h3>
            <div class="v3-skills__items">
              <div v-for="skill in skillList" :key="skill.id" class="v3-skill-card">
                <div class="v3-skill-card__icon-wrap">
                  <component :is="skill.icon" v-if="skill.icon" class="v3-skill-card__icon" />
                  <span v-else class="v3-skill-card__letter">{{ skill.name.charAt(0) }}</span>
                </div>
                <span class="v3-skill-card__name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Education + Certs -->
        <div class="v3-edu-section">
          <h2 class="v3-section__title" style="margin-top:64px"><span class="v3-accent">#</span> {{ t('education.title') }}</h2>
          <div class="v3-edu-grid">
            <div v-for="edu in education" :key="edu.id" class="v3-edu-item">
              <p class="v3-edu-item__degree">{{ edu.degree }}</p>
              <p class="v3-edu-item__inst">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</p>
            </div>
            <div v-for="cert in certifications" :key="cert.id" class="v3-edu-item">
              <p class="v3-edu-item__degree">
                {{ cert.title }}
                <span v-if="cert.status === 'in-progress'" class="v3-badge">{{ t('education.in_progress') }}</span>
              </p>
              <p class="v3-edu-item__inst">{{ cert.issuer }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ─────────────────────────────────────────── -->
      <section id="v3-projects" class="v3-section">
        <h2 class="v3-section__title"><span class="v3-accent">#</span> {{ t('projects.title') }}</h2>
        <div class="v3-proj-grid">
          <div v-for="proj in projects" :key="proj.id" class="v3-proj-card">
            <div class="v3-proj-card__header">
              <h3 class="v3-proj-card__title">{{ proj.title }}</h3>
              <span v-if="proj.status === 'private'" class="v3-badge">{{ t('projects.private_label') }}</span>
            </div>
            <p class="v3-proj-card__desc">{{ proj.description }}</p>
            <div class="v3-proj-card__tech">
              <span v-for="tech in proj.technologies" :key="tech" class="v3-chip v3-chip--sm">{{ tech }}</span>
            </div>
            <div class="v3-proj-card__links">
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v3-link">
                <GithubIcon /> {{ t('projects.repo_label') }}
              </a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v3-link">
                <NewTabIcon /> {{ t('projects.site_label') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v3-contact" class="v3-section v3-contact">
        <h2 class="v3-section__title"><span class="v3-accent">#</span> {{ t('contact.title') }}</h2>
        <p class="v3-contact__subtitle">{{ t('contact.subtitle') }}</p>
        <div class="v3-contact__email-row">
          <a href="mailto:joaovinicius2525@gmail.com" class="v3-contact__email">joaovinicius2525@gmail.com</a>
          <button class="v3-contact__copy" @click="copyEmail">
            {{ copied ? '✓ ' + t('contact.copied') : '⎘ ' + t('contact.copy_label') }}
          </button>
        </div>
        <div class="v3-contact__socials">
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v3-social-btn">
            <GithubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v3-social-btn">
            <LinkedinIcon /> LinkedIn
          </a>
        </div>
        <footer class="v3-footer">{{ t('contact.footer') }}</footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortfolio } from '@/composables/usePortfolio'
import { toggleLocale } from '@/plugins/i18n'
import { skills } from '@/data/skills'
import GithubIcon from '@/components/icons/Github.vue'
import LinkedinIcon from '@/components/icons/Linkedin.vue'
import NewTabIcon from '@/components/icons/NewTab.vue'

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, differentials, languages, formatDate, categoryLabel } = usePortfolio()

const sections = [{ id: 'about' }, { id: 'experience' }, { id: 'skills' }, { id: 'projects' }, { id: 'contact' }]
const copied = ref(false)

const iconSkills = computed(() => skills.filter(s => s.icon))

function floatStyle(id: number) {
  const seed = id * 137.508
  return {
    top: `${10 + (seed * 0.618) % 75}%`,
    left: `${5 + (seed * 0.381) % 90}%`,
    animationDelay: `${(id * 0.7) % 6}s`,
    animationDuration: `${8 + (id % 6)}s`
  }
}

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}
</script>

<style lang="scss" scoped>
.v3 {
  background: $v3-bg;
  color: $v3-secondary;
  font-family: $v3-font;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.v3-accent { color: $v3-primary; }

// ─── Grid background ────────────────────────────────────────────────────────
.v3-grid-bg {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba($v3-primary, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba($v3-primary, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

// ─── Header ─────────────────────────────────────────────────────────────────
.v3-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba($v3-bg, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $v3-border;
  padding: 0 48px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $mobile) { padding: 0 20px; }
}

.v3-header__left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.v3-header__logo {
  font-size: 18px;
  font-weight: 800;
  color: $v3-primary;
  letter-spacing: 0.05em;
}

.v3-header__divider {
  color: rgba($v3-primary, 0.3);
  font-weight: 300;
}

.v3-header__label {
  font-size: 13px;
  color: $v3-muted;
  font-weight: 400;
}

.v3-header__nav {
  display: flex;
  gap: 4px;

  @media (max-width: $tablet) { display: none; }
}

.v3-header__link {
  font-size: 13px;
  font-weight: 500;
  color: $v3-muted;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all $transition-base;

  &:hover {
    color: $v3-primary;
    background: rgba($v3-primary, 0.08);
  }
}

.v3-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.v3-lang-btn {
  font-family: $v3-font;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v3-primary;
  border: 1px solid $v3-border;
  background: transparent;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all $transition-base;

  &:hover { background: rgba($v3-primary, 0.12); }
}

.v3-back {
  font-size: 12px;
  color: $v3-muted;
  transition: color $transition-base;
  &:hover { color: $v3-primary; }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v3-main {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;

  @media (max-width: $mobile) { padding: 0 20px; }
}

// ─── Section base ───────────────────────────────────────────────────────────
.v3-section {
  padding: 100px 0;
  border-bottom: 1px solid $v3-border;

  &:last-child { border-bottom: none; }

  @media (max-width: $mobile) { padding: 60px 0; }
}

.v3-section__title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
}

// ─── Hero ───────────────────────────────────────────────────────────────────
.v3-hero {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  position: relative;
  overflow: hidden;

  @media (max-width: $tablet) {
    flex-direction: column;
    justify-content: center;
    padding: 80px 0;
  }
}

.v3-hero__content {
  max-width: 560px;
  flex-shrink: 0;
  z-index: 1;
}

.v3-hero__greeting {
  font-size: 14px;
  color: $v3-primary;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.v3-hero__name {
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 16px;
}

.v3-hero__role {
  font-size: 20px;
  font-weight: 400;
  color: rgba($v3-secondary, 0.7);
  margin-bottom: 20px;
}

.v3-hero__tagline {
  font-size: 15px;
  color: $v3-muted;
  max-width: 440px;
  line-height: 1.7;
  margin-bottom: 36px;
}

.v3-hero__cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

// ─── Floating icons ─────────────────────────────────────────────────────────
.v3-hero__icons {
  position: relative;
  width: 400px;
  height: 400px;
  flex-shrink: 0;

  @media (max-width: $tablet) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: $mobile) {
    display: none;
  }
}

.v3-hero__float-icon {
  position: absolute;
  width: 36px;
  height: 36px;
  opacity: 0.15;
  animation: neonFloat var(--dur, 10s) ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba($v3-primary, 0.4));

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

@keyframes neonFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
  25% { transform: translateY(-12px) rotate(3deg); opacity: 0.25; }
  50% { transform: translateY(-6px) rotate(-2deg); opacity: 0.15; }
  75% { transform: translateY(-16px) rotate(4deg); opacity: 0.2; }
}

// ─── Buttons ────────────────────────────────────────────────────────────────
.v3-btn {
  font-family: $v3-font;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 13px 28px;
  border-radius: 8px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &--fill {
    background: $v3-primary;
    color: $v3-bg;
    border: 1px solid $v3-primary;

    &:hover {
      background: transparent;
      color: $v3-primary;
      box-shadow: 0 0 20px rgba($v3-primary, 0.3);
    }
  }

  &--ghost {
    background: transparent;
    color: $v3-secondary;
    border: 1px solid $v3-border;

    &:hover {
      border-color: $v3-primary;
      color: $v3-primary;
    }
  }
}

// ─── About ──────────────────────────────────────────────────────────────────
.v3-about__grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 60px;
  align-items: start;

  @media (max-width: $tablet) { grid-template-columns: 1fr; gap: 40px; }
}

.v3-about__text {
  p {
    font-size: 16px;
    line-height: 1.8;
    color: rgba($v3-secondary, 0.8);
    margin-bottom: 20px;
  }
}

.v3-about__diffs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  li {
    font-size: 14px;
    color: $v3-muted;
    display: flex;
    gap: 10px;
  }
}

.v3-about__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: $v3-surface;
  border: 2px solid $v3-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: $v3-primary;
  margin-bottom: 20px;
  box-shadow: 0 0 30px rgba($v3-primary, 0.15);
}

.v3-about__info {
  margin-bottom: 16px;
  p {
    font-size: 13px;
    color: $v3-muted;
    margin-bottom: 6px;
  }
}

.v3-about__remote {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: $v3-primary;
  font-weight: 500;
  margin-bottom: 20px;
}

.v3-about__langs h4 {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v3-muted;
  margin-bottom: 10px;
}

.v3-lang-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
  color: rgba($v3-secondary, 0.8);
}

// ─── Experience ─────────────────────────────────────────────────────────────
.v3-exp-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.v3-exp-card {
  display: flex;
  border: 1px solid $v3-border;
  border-radius: 10px;
  overflow: hidden;
  background: rgba($v3-surface, 0.5);
  transition: all $transition-base;

  &:hover {
    border-color: rgba($v3-primary, 0.4);
    box-shadow: 0 0 24px rgba($v3-primary, 0.08);
  }
}

.v3-exp-card__neon {
  width: 4px;
  flex-shrink: 0;
  background: $v3-primary;
  opacity: 0.6;
}

.v3-exp-card__body {
  flex: 1;
  padding: 24px 28px;
}

.v3-exp-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  @media (max-width: $mobile) { flex-direction: column; }
}

.v3-exp-card__role {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 4px;
}

.v3-exp-card__company {
  font-size: 14px;
  color: $v3-primary;
}

.v3-exp-card__period {
  font-size: 12px;
  color: $v3-muted;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v3-exp-card__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($v3-secondary, 0.65);
  margin-bottom: 14px;
}

.v3-exp-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

// ─── Chips ──────────────────────────────────────────────────────────────────
.v3-chip {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border: 1px solid $v3-border;
  border-radius: 4px;
  color: $v3-muted;

  &--sm { font-size: 10px; padding: 3px 8px; }
}

// ─── Skills (Icon Grid) ─────────────────────────────────────────────────────
.v3-skills__grid {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.v3-skills__cat-name {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $v3-primary;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $v3-border;
}

.v3-skills__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 16px;
}

.v3-skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  border: 1px solid $v3-border;
  border-radius: 10px;
  background: rgba($v3-surface, 0.4);
  transition: all $transition-base;
  cursor: default;

  &:hover {
    border-color: $v3-primary;
    box-shadow: 0 0 20px rgba($v3-primary, 0.15);
    transform: translateY(-2px);

    .v3-skill-card__icon-wrap { box-shadow: 0 0 16px rgba($v3-primary, 0.3); }
    .v3-skill-card__name { color: $v3-primary; }
  }
}

.v3-skill-card__icon-wrap {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba($v3-primary, 0.08);
  transition: box-shadow $transition-base;
}

.v3-skill-card__icon {
  width: 24px;
  height: 24px;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.v3-skill-card__letter {
  font-size: 18px;
  font-weight: 800;
  color: $v3-primary;
}

.v3-skill-card__name {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: rgba($v3-secondary, 0.7);
  transition: color $transition-base;
}

// ─── Education ──────────────────────────────────────────────────────────────
.v3-edu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.v3-edu-item {
  padding: 20px;
  border: 1px solid $v3-border;
  border-radius: 8px;
  background: rgba($v3-surface, 0.3);
}

.v3-edu-item__degree {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.v3-edu-item__inst {
  font-size: 13px;
  color: $v3-muted;
}

.v3-badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border: 1px solid $v3-primary;
  color: $v3-primary;
  border-radius: 4px;
}

// ─── Projects ───────────────────────────────────────────────────────────────
.v3-proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.v3-proj-card {
  border: 1px solid $v3-border;
  border-radius: 10px;
  padding: 28px;
  background: rgba($v3-surface, 0.4);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all $transition-base;

  &:hover {
    border-color: rgba($v3-primary, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  }
}

.v3-proj-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.v3-proj-card__title {
  font-size: 18px;
  font-weight: 700;
}

.v3-proj-card__desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba($v3-secondary, 0.65);
  flex: 1;
}

.v3-proj-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.v3-proj-card__links {
  display: flex;
  gap: 16px;
}

.v3-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $v3-muted;
  transition: color $transition-base;

  &:hover { color: $v3-primary; }

  :deep(svg) { width: 14px; height: 14px; fill: currentColor; }
}

// ─── Contact ────────────────────────────────────────────────────────────────
.v3-contact__subtitle {
  font-size: 22px;
  font-weight: 300;
  color: rgba($v3-secondary, 0.5);
  margin-bottom: 40px;
}

.v3-contact__email-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.v3-contact__email {
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 700;
  color: $v3-secondary;
  border-bottom: 2px solid $v3-primary;
  padding-bottom: 4px;
  transition: color $transition-base;
  &:hover { color: $v3-primary; }
}

.v3-contact__copy {
  font-family: $v3-font;
  font-size: 12px;
  font-weight: 600;
  color: $v3-muted;
  background: transparent;
  border: 1px solid $v3-border;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all $transition-base;
  &:hover { color: $v3-primary; border-color: $v3-primary; }
}

.v3-contact__socials {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.v3-social-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: $v3-muted;
  border: 1px solid $v3-border;
  border-radius: 8px;
  padding: 12px 24px;
  transition: all $transition-base;

  &:hover {
    color: $v3-secondary;
    border-color: $v3-primary;
    box-shadow: 0 0 16px rgba($v3-primary, 0.12);
  }

  :deep(svg) { width: 18px; height: 18px; fill: currentColor; }
}

.v3-footer {
  font-size: 12px;
  color: $v3-muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
