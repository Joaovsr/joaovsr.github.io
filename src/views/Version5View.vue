<template>
  <div class="v5">
    <!-- Gradient background -->
    <div class="v5-bg" aria-hidden="true" />

    <!-- Header -->
    <header class="v5-header">
      <span class="v5-brand">JV Rodrigues</span>
      <nav class="v5-header-nav">
        <a v-for="s in sections" :key="s.id" :href="`#v5-${s.id}`" class="v5-header-nav__link">{{ t(`nav.${s.id}`) }}</a>
      </nav>
      <div class="v5-header__actions">
        <button class="v5-lang-btn" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/" class="v5-versions-link">versões ↗</RouterLink>
      </div>
    </header>

    <main class="v5-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v5-hero" class="v5-hero">
        <div class="v5-hero__glass">
          <p class="v5-hero__sup">{{ currentLocale === 'pt-BR' ? 'Desenvolvedor' : 'Developer' }}</p>
          <h1 class="v5-hero__name">{{ t('name') }}</h1>
          <p class="v5-hero__role">{{ t('role') }} <span class="v5-accent">·</span> {{ t('role_sub') }}</p>
          <p class="v5-hero__tagline">{{ t('tagline') }}</p>
          <div class="v5-hero__stack">
            <span v-for="tech in heroStack" :key="tech" class="v5-glass-tag">{{ tech }}</span>
          </div>
          <div class="v5-hero__cta">
            <a href="/cv-joaovinicius.pdf" download class="v5-btn v5-btn--solid">{{ t('download_cv') }}</a>
            <a href="#v5-contact" class="v5-btn v5-btn--glass">{{ t('contact.title') }}</a>
          </div>
          <div class="v5-hero__badge">
            <span class="v5-dot" />
            <span>{{ t('available_remote') }}</span>
          </div>
        </div>
        <div class="v5-hero__orbs" aria-hidden="true">
          <div class="v5-orb v5-orb--1" />
          <div class="v5-orb v5-orb--2" />
          <div class="v5-orb v5-orb--3" />
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v5-about" class="v5-section">
        <h2 class="v5-section__title">{{ t('about.title') }}</h2>
        <div class="v5-about__grid">
          <div class="v5-glass-card v5-about__text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
            <div class="v5-about__langs">
              <span v-for="lang in (t('about.languages') as unknown as Array<{name:string;level:string}>)" :key="lang.name" class="v5-glass-tag">
                {{ lang.name }} — {{ lang.level }}
              </span>
            </div>
          </div>
          <div class="v5-about__sidebar">
            <div class="v5-glass-card v5-glass-card--sm" v-for="diff in (t('about.differentials') as unknown as string[])" :key="diff">
              <span class="v5-accent">◆</span> {{ diff }}
            </div>
            <div class="v5-glass-card v5-glass-card--sm v5-glass-card--highlight">
              <span>🌐</span> {{ t('about.open_to') }}
            </div>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v5-experience" class="v5-section">
        <h2 class="v5-section__title">{{ t('experience.title') }}</h2>
        <div class="v5-experience__list">
          <div v-for="exp in experiences" :key="exp.id" class="v5-glass-card v5-exp-card">
            <div class="v5-exp-card__header">
              <div>
                <h3 class="v5-exp-card__role">{{ exp.role }}</h3>
                <p class="v5-exp-card__company">{{ exp.company }}</p>
              </div>
              <span class="v5-exp-card__period">
                {{ formatDate(exp.startDate) }} — {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
              </span>
            </div>
            <p class="v5-exp-card__desc">{{ exp.description }}</p>
            <div class="v5-exp-card__tags">
              <span v-for="skill in exp.skills" :key="skill" class="v5-glass-tag v5-glass-tag--sm">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="v5-skills" class="v5-section">
        <h2 class="v5-section__title">{{ t('skills.title') }}</h2>
        <div class="v5-skills__grid">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v5-glass-card">
            <h3 class="v5-skills__cat">{{ categoryLabel(cat) }}</h3>
            <div class="v5-skills__tags">
              <span v-for="skill in skillList" :key="skill.id" class="v5-glass-tag v5-glass-tag--sm">{{ skill.name }}</span>
            </div>
          </div>
        </div>
        <!-- Education + Certs -->
        <div class="v5-edu-row">
          <div v-for="edu in education" :key="edu.id" class="v5-glass-card v5-glass-card--sm">
            <p class="v5-edu-degree">{{ edu.degree }}</p>
            <p class="v5-edu-inst">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</p>
          </div>
          <div v-for="cert in certifications" :key="cert.id" class="v5-glass-card v5-glass-card--sm">
            <p class="v5-edu-degree">
              {{ cert.title }}
              <span v-if="cert.status === 'in-progress'" class="v5-badge-prog">{{ t('education.in_progress') }}</span>
            </p>
            <p class="v5-edu-inst">{{ cert.issuer }}</p>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ───────────────────────────────────────── -->
      <section id="v5-projects" class="v5-section">
        <h2 class="v5-section__title">{{ t('projects.title') }}</h2>
        <div class="v5-projects__grid">
          <div v-for="proj in projects" :key="proj.id" class="v5-glass-card v5-proj-card">
            <div class="v5-proj-card__header">
              <h3 class="v5-proj-card__title">{{ proj.title }}</h3>
              <span v-if="proj.status === 'private'" class="v5-badge-private">🔒</span>
            </div>
            <p class="v5-proj-card__desc">{{ proj.description }}</p>
            <div class="v5-proj-card__tech">
              <span v-for="tech in proj.technologies" :key="tech" class="v5-glass-tag v5-glass-tag--sm">{{ tech }}</span>
            </div>
            <div class="v5-proj-card__links">
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v5-proj-link">↗ {{ t('projects.repo_label') }}</a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v5-proj-link">⌘ {{ t('projects.site_label') }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v5-contact" class="v5-section v5-contact">
        <h2 class="v5-section__title">{{ t('contact.title') }}</h2>
        <div class="v5-glass-card v5-contact__card">
          <p class="v5-contact__subtitle">{{ t('contact.subtitle') }}</p>
          <a href="mailto:joaovinicius2525@gmail.com" class="v5-contact__email">joaovinicius2525@gmail.com</a>
          <div class="v5-contact__actions">
            <button class="v5-btn v5-btn--glass" @click="copyEmail">{{ copied ? '✓ ' + t('contact.copied') : t('contact.copy_label') }}</button>
            <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v5-btn v5-btn--glass">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v5-btn v5-btn--glass">LinkedIn ↗</a>
          </div>
        </div>
        <footer class="v5-footer">{{ t('contact.footer') }}</footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortfolio } from '@/composables/usePortfolio'
import { toggleLocale } from '@/plugins/i18n'

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, formatDate, categoryLabel } = usePortfolio()

const heroStack = ['React', 'TypeScript', 'NestJS', 'Flutter', 'Python', 'K8s', 'Data & AI']
const copied = ref(false)
const sections = [{ id: 'about' }, { id: 'experience' }, { id: 'skills' }, { id: 'projects' }, { id: 'contact' }]

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}
</script>

<style lang="scss" scoped>
.v5 {
  background: $v5-bg-start;
  color: $v5-secondary;
  font-family: $v5-font;
  min-height: 100vh;
  position: relative;
}

// ─── Gradient bg ─────────────────────────────────────────────────────────────
.v5-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, $v5-bg-start 0%, $v5-bg-mid 50%, $v5-bg-end 100%);
  animation: gradientShift 12s ease infinite alternate;
  pointer-events: none;
}

@keyframes gradientShift {
  0% { opacity: 1; }
  100% { opacity: 0.85; }
}

// ─── Header ──────────────────────────────────────────────────────────────────
.v5-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(15, 12, 41, 0.7);
  border-bottom: 1px solid $v5-border;
  padding: 0 60px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: $mobile) { padding: 0 20px; gap: 16px; }
}

.v5-brand {
  font-size: 16px;
  font-weight: 700;
  color: $v5-primary;
  white-space: nowrap;
}

.v5-header-nav {
  flex: 1;
  display: flex;
  gap: 4px;
  @media (max-width: $tablet) { display: none; }
}

.v5-header-nav__link {
  font-size: 14px;
  color: $v5-muted;
  padding: 6px 14px;
  border-radius: 8px;
  transition: all $transition-base;
  &:hover { color: $v5-secondary; background: $v5-glass-bg; }
}

.v5-header__actions { display: flex; gap: 10px; margin-left: auto; }

.v5-lang-btn {
  font-family: $v5-font;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  background: $v5-glass-bg;
  border: 1px solid $v5-glass-border;
  color: $v5-primary;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all $transition-base;
  &:hover { background: rgba($v5-primary, 0.15); }
}

.v5-versions-link {
  font-size: 13px;
  color: $v5-muted;
  transition: color $transition-base;
  &:hover { color: $v5-primary; }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v5-main {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 60px 80px;

  @media (max-width: $mobile) { padding: 0 20px 60px; }
}

// ─── Hero ────────────────────────────────────────────────────────────────────
.v5-hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  position: relative;
  padding: 60px 0;
}

.v5-hero__glass {
  backdrop-filter: blur(20px);
  background: $v5-glass-bg;
  border: 1px solid $v5-glass-border;
  border-radius: 20px;
  padding: 52px 56px;
  max-width: 680px;
  position: relative;
  z-index: 1;
  animation: fadeUp 0.8s ease both;

  @media (max-width: $mobile) { padding: 32px 24px; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.v5-hero__sup {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $v5-primary;
  margin-bottom: 12px;
}

.v5-hero__name {
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  line-height: 1.1;
}

.v5-hero__role {
  font-size: 18px;
  color: $v5-muted;
  margin-bottom: 20px;
}

.v5-accent { color: $v5-primary; }

.v5-hero__tagline {
  font-size: 15px;
  line-height: 1.7;
  color: rgba($v5-secondary, 0.65);
  max-width: 440px;
  margin-bottom: 28px;
}

.v5-hero__stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }

.v5-hero__cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }

.v5-hero__badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #10b981;
}

.v5-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

// ─── Orbs ───────────────────────────────────────────────────────────────────
.v5-hero__orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px;
  z-index: 0;
}

.v5-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: orbFloat 8s ease-in-out infinite alternate;
}

.v5-orb--1 {
  width: 300px; height: 300px;
  background: rgba($v5-primary, 0.25);
  top: -100px; right: -50px;
}

.v5-orb--2 {
  width: 200px; height: 200px;
  background: rgba(167, 139, 250, 0.2);
  bottom: 0; right: 200px;
  animation-delay: -3s;
}

.v5-orb--3 {
  width: 150px; height: 150px;
  background: rgba($v5-primary, 0.15);
  top: 50%; left: -80px;
  animation-delay: -6s;
}

@keyframes orbFloat {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(20px, -20px) scale(1.1); }
}

// ─── Buttons ─────────────────────────────────────────────────────────────────
.v5-btn {
  font-family: $v5-font;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &--solid {
    background: $v5-primary;
    color: #0f0c29;
    border: 1px solid $v5-primary;
    &:hover { background: rgba($v5-primary, 0.85); }
  }

  &--glass {
    backdrop-filter: blur(10px);
    background: $v5-glass-bg;
    border: 1px solid $v5-glass-border;
    color: $v5-secondary;
    &:hover { background: rgba(255,255,255,0.1); border-color: rgba($v5-primary, 0.5); color: $v5-primary; }
  }
}

// ─── Section ─────────────────────────────────────────────────────────────────
.v5-section {
  padding: 80px 0;
}

.v5-section__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
  color: $v5-secondary;
}

// ─── Glass card ──────────────────────────────────────────────────────────────
.v5-glass-card {
  backdrop-filter: blur(16px);
  background: $v5-glass-bg;
  border: 1px solid $v5-glass-border;
  border-radius: 16px;
  padding: 28px 32px;
  transition: all $transition-base;

  &:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba($v5-primary, 0.3); }

  &--sm {
    padding: 14px 18px;
    font-size: 14px;
    color: rgba($v5-secondary, 0.8);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &--highlight {
    border-color: rgba(16, 185, 129, 0.4);
    color: #10b981;
  }
}

// ─── Glass tag ───────────────────────────────────────────────────────────────
.v5-glass-tag {
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba($v5-secondary, 0.85);

  &--sm { font-size: 11px; padding: 3px 10px; }
}

// ─── About ───────────────────────────────────────────────────────────────────
.v5-about__grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;

  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}

.v5-about__text {
  p { font-size: 15px; line-height: 1.8; color: rgba($v5-secondary, 0.75); margin-bottom: 16px; }
}

.v5-about__langs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

.v5-about__sidebar { display: flex; flex-direction: column; gap: 12px; }

// ─── Experience ───────────────────────────────────────────────────────────────
.v5-experience__list { display: flex; flex-direction: column; gap: 20px; }

.v5-exp-card__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 16px; flex-wrap: wrap; }
.v5-exp-card__role { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.v5-exp-card__company { font-size: 14px; color: $v5-primary; }
.v5-exp-card__period { font-size: 12px; color: $v5-muted; white-space: nowrap; }
.v5-exp-card__desc { font-size: 14px; line-height: 1.75; color: rgba($v5-secondary, 0.65); margin-bottom: 14px; }
.v5-exp-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }

// ─── Skills ──────────────────────────────────────────────────────────────────
.v5-skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.v5-skills__cat {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v5-primary;
  margin-bottom: 14px;
}

.v5-skills__tags { display: flex; flex-wrap: wrap; gap: 8px; }

.v5-edu-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.v5-edu-degree { font-size: 14px; font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.v5-edu-inst { font-size: 12px; color: $v5-muted; }

.v5-badge-prog {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba($v5-primary, 0.15);
  color: $v5-primary;
}

// ─── Projects ────────────────────────────────────────────────────────────────
.v5-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.v5-proj-card { display: flex; flex-direction: column; gap: 14px; }
.v5-proj-card__header { display: flex; justify-content: space-between; align-items: center; }
.v5-proj-card__title { font-size: 18px; font-weight: 700; }
.v5-badge-private { font-size: 16px; }
.v5-proj-card__desc { font-size: 14px; line-height: 1.7; color: rgba($v5-secondary, 0.65); flex: 1; }
.v5-proj-card__tech { display: flex; flex-wrap: wrap; gap: 6px; }
.v5-proj-card__links { display: flex; gap: 16px; }

.v5-proj-link {
  font-size: 13px;
  font-weight: 600;
  color: $v5-primary;
  transition: opacity $transition-base;
  &:hover { opacity: 0.7; }
}

// ─── Contact ─────────────────────────────────────────────────────────────────
.v5-contact__card {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.v5-contact__subtitle {
  font-size: 24px;
  font-weight: 600;
  color: rgba($v5-secondary, 0.9);
}

.v5-contact__email {
  font-size: 20px;
  font-weight: 600;
  color: $v5-primary;
  transition: opacity $transition-base;
  &:hover { opacity: 0.75; }
}

.v5-contact__actions { display: flex; gap: 12px; flex-wrap: wrap; }

.v5-footer { margin-top: 48px; font-size: 12px; color: $v5-muted; letter-spacing: 0.06em; }
</style>
