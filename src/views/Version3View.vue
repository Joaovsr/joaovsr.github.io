<template>
  <div class="v3">
    <!-- Sticky header -->
    <header class="v3-header">
      <span class="v3-header__brand">João Vinicius</span>
      <nav class="v3-header__nav">
        <a v-for="s in sections" :key="s.id" :href="`#v3-${s.id}`" class="v3-header__link">{{ t(`nav.${s.id}`) }}</a>
      </nav>
      <div class="v3-header__actions">
        <button class="v3-lang-btn" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/" class="v3-versions-btn">versões</RouterLink>
      </div>
    </header>

    <main class="v3-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v3-hero" class="v3-hero">
        <div class="v3-hero__left">
          <p class="v3-hero__greeting">{{ currentLocale === 'pt-BR' ? 'Olá 👋' : 'Hello 👋' }}</p>
          <h1 class="v3-hero__name">{{ t('name') }}</h1>
          <h2 class="v3-hero__role">{{ t('role') }} <span class="v3-accent">·</span> {{ t('role_sub') }}</h2>
          <p class="v3-hero__tagline">{{ t('tagline') }}</p>
          <div class="v3-hero__tags">
            <span v-for="tech in heroStack" :key="tech" class="v3-tag">{{ tech }}</span>
          </div>
          <div class="v3-hero__actions">
            <a href="/cv-joaovinicius.pdf" download class="v3-btn v3-btn--primary">{{ t('download_cv') }}</a>
            <a href="#v3-contact" class="v3-btn v3-btn--ghost">{{ t('contact.title') }}</a>
          </div>
          <p class="v3-hero__available">
            <span class="v3-status-dot" />{{ t('available_remote') }}
          </p>
        </div>
        <div class="v3-hero__right">
          <div class="v3-avatar">
            <span class="v3-avatar__initials">JV</span>
          </div>
          <div class="v3-hero__contact-pills">
            <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v3-pill">
              <span>⌘</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v3-pill">
              <span>in</span> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v3-about" class="v3-section">
        <div class="v3-section__label">{{ t('about.title') }}</div>
        <div class="v3-about__grid">
          <div class="v3-about__text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
          </div>
          <div class="v3-about__cards">
            <div class="v3-card v3-card--sm" v-for="diff in (t('about.differentials') as unknown as string[])" :key="diff">
              <span class="v3-card__icon">✦</span>
              <span>{{ diff }}</span>
            </div>
            <div class="v3-card v3-card--sm">
              <span class="v3-card__icon">🌐</span>
              <span>{{ t('about.open_to') }}</span>
            </div>
          </div>
        </div>
        <div class="v3-about__langs">
          <div v-for="lang in (t('about.languages') as unknown as Array<{name:string;level:string}>)" :key="lang.name" class="v3-lang-item">
            <span class="v3-lang-item__name">{{ lang.name }}</span>
            <span class="v3-lang-item__level">{{ lang.level }}</span>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v3-experience" class="v3-section">
        <div class="v3-section__label">{{ t('experience.title') }}</div>
        <div class="v3-timeline">
          <div v-for="exp in experiences" :key="exp.id" class="v3-timeline__item">
            <div class="v3-timeline__dot" />
            <div class="v3-timeline__content">
              <div class="v3-timeline__header">
                <div>
                  <h3 class="v3-timeline__role">{{ exp.role }}</h3>
                  <p class="v3-timeline__company">{{ exp.company }}</p>
                </div>
                <span class="v3-timeline__period">
                  {{ formatDate(exp.startDate) }} — {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
                </span>
              </div>
              <p class="v3-timeline__desc">{{ exp.description }}</p>
              <div class="v3-timeline__tags">
                <span v-for="skill in exp.skills" :key="skill" class="v3-tag v3-tag--sm">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="v3-skills" class="v3-section">
        <div class="v3-section__label">{{ t('skills.title') }}</div>
        <div class="v3-skills__grid">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v3-card">
            <h3 class="v3-card__cat">{{ categoryLabel(cat) }}</h3>
            <div class="v3-card__tags">
              <span v-for="skill in skillList" :key="skill.id" class="v3-tag v3-tag--sm">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── EDUCATION ─────────────────────────────────────── -->
      <section id="v3-education" class="v3-section">
        <div class="v3-section__label">{{ t('education.title') }}</div>
        <div class="v3-edu__grid">
          <div v-for="edu in education" :key="edu.id" class="v3-card v3-card--row">
            <div class="v3-card__icon-wrap">🎓</div>
            <div>
              <p class="v3-card__title">{{ edu.degree }}</p>
              <p class="v3-card__sub">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</p>
            </div>
          </div>
          <div v-for="cert in certifications" :key="cert.id" class="v3-card v3-card--row">
            <div class="v3-card__icon-wrap">📜</div>
            <div>
              <p class="v3-card__title">
                {{ cert.title }}
                <span v-if="cert.status === 'in-progress'" class="v3-badge-progress">{{ t('education.in_progress') }}</span>
              </p>
              <p class="v3-card__sub">{{ cert.issuer }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ───────────────────────────────────────── -->
      <section id="v3-projects" class="v3-section">
        <div class="v3-section__label">{{ t('projects.title') }}</div>
        <div class="v3-projects__grid">
          <div v-for="proj in projects" :key="proj.id" class="v3-proj-card">
            <div class="v3-proj-card__top">
              <h3 class="v3-proj-card__title">{{ proj.title }}</h3>
              <span v-if="proj.status === 'private'" class="v3-badge-private">{{ t('projects.private_label') }}</span>
            </div>
            <p class="v3-proj-card__desc">{{ proj.description }}</p>
            <div class="v3-proj-card__tech">
              <span v-for="tech in proj.technologies" :key="tech" class="v3-tag v3-tag--sm">{{ tech }}</span>
            </div>
            <div class="v3-proj-card__links">
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v3-link-btn">
                ↗ {{ t('projects.repo_label') }}
              </a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v3-link-btn">
                ↗ {{ t('projects.site_label') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v3-contact" class="v3-section v3-contact">
        <div class="v3-section__label">{{ t('contact.title') }}</div>
        <p class="v3-contact__subtitle">{{ t('contact.subtitle') }}</p>
        <div class="v3-contact__box">
          <a href="mailto:joaovinicius2525@gmail.com" class="v3-contact__email">joaovinicius2525@gmail.com</a>
          <button class="v3-contact__copy" @click="copyEmail">
            {{ copied ? '✓ ' + t('contact.copied') : t('contact.copy_label') }}
          </button>
        </div>
        <div class="v3-contact__links">
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v3-btn v3-btn--ghost">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v3-btn v3-btn--ghost">LinkedIn ↗</a>
        </div>
        <footer class="v3-footer">{{ t('contact.footer') }}</footer>
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

const heroStack = ['React', 'TypeScript', 'NestJS', 'Flutter', 'Python', 'Docker']
const copied = ref(false)
const sections = [
  { id: 'about' }, { id: 'experience' }, { id: 'skills' },
  { id: 'projects' }, { id: 'contact' }
]

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
}

// ─── Header ──────────────────────────────────────────────────────────────────
.v3-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba($v3-bg, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $v3-border;
  padding: 0 60px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: $mobile) {
    padding: 0 20px;
    gap: 16px;
  }
}

.v3-header__brand {
  font-size: 16px;
  font-weight: 700;
  color: $v3-secondary;
  white-space: nowrap;
}

.v3-header__nav {
  display: flex;
  gap: 8px;
  flex: 1;

  @media (max-width: $tablet) {
    display: none;
  }
}

.v3-header__link {
  font-size: 14px;
  color: $v3-muted;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all $transition-base;

  &:hover {
    color: $v3-secondary;
    background: rgba(255, 255, 255, 0.05);
  }
}

.v3-header__actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.v3-lang-btn, .v3-versions-btn {
  font-family: $v3-font;
  font-size: 13px;
  font-weight: 500;
  color: $v3-muted;
  padding: 6px 14px;
  border: 1px solid $v3-border;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  transition: all $transition-base;

  &:hover {
    color: $v3-secondary;
    border-color: $v3-primary;
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v3-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 60px 80px;

  @media (max-width: $mobile) {
    padding: 0 20px 60px;
  }
}

// ─── Hero ────────────────────────────────────────────────────────────────────
.v3-hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 80px 0;

  @media (max-width: $tablet) {
    flex-direction: column-reverse;
    gap: 40px;
    padding: 60px 0;
    min-height: auto;
  }
}

.v3-hero__left {
  flex: 1;
}

.v3-hero__greeting {
  font-size: 18px;
  color: $v3-muted;
  margin-bottom: 12px;
}

.v3-hero__name {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  line-height: 1.1;
}

.v3-hero__role {
  font-size: 20px;
  font-weight: 400;
  color: $v3-muted;
  margin-bottom: 20px;
}

.v3-accent { color: $v3-primary; }

.v3-hero__tagline {
  font-size: 16px;
  line-height: 1.7;
  color: $v3-muted;
  max-width: 480px;
  margin-bottom: 28px;
}

.v3-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.v3-hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.v3-hero__available {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #10b981;
}

.v3-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-dot 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

.v3-hero__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.v3-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: $v3-surface;
  border: 3px solid $v3-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 8px rgba($v3-primary, 0.1);
}

.v3-avatar__initials {
  font-size: 48px;
  font-weight: 700;
  color: $v3-primary;
}

.v3-hero__contact-pills {
  display: flex;
  gap: 10px;
}

.v3-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: $v3-muted;
  padding: 8px 16px;
  border: 1px solid $v3-border;
  border-radius: 9999px;
  transition: all $transition-base;

  &:hover {
    color: $v3-secondary;
    border-color: $v3-primary;
    background: rgba($v3-primary, 0.05);
  }
}

// ─── Buttons ─────────────────────────────────────────────────────────────────
.v3-btn {
  font-family: $v3-font;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;

  &--primary {
    background: $v3-primary;
    color: $v3-bg;
    border: 1px solid $v3-primary;

    &:hover { background: rgba($v3-primary, 0.85); }
  }

  &--ghost {
    background: transparent;
    color: $v3-secondary;
    border: 1px solid $v3-border;

    &:hover { border-color: $v3-primary; color: $v3-primary; }
  }
}

// ─── Section ─────────────────────────────────────────────────────────────────
.v3-section {
  padding: 80px 0;
  border-top: 1px solid $v3-border;
}

.v3-section__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $v3-primary;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: $v3-border;
    max-width: 200px;
  }
}

// ─── Tags ───────────────────────────────────────────────────────────────────
.v3-tag {
  font-size: 13px;
  color: $v3-secondary;
  background: rgba(255, 255, 255, 0.05);
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid $v3-border;

  &--sm { font-size: 11px; padding: 3px 10px; }
}

// ─── About ───────────────────────────────────────────────────────────────────
.v3-about__grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  margin-bottom: 32px;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.v3-about__text {
  p {
    font-size: 16px;
    line-height: 1.8;
    color: rgba($v3-secondary, 0.8);
    margin-bottom: 16px;
  }
}

.v3-about__cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.v3-about__langs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.v3-lang-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: $v3-surface;
  border: 1px solid $v3-border;
  border-radius: 8px;
  padding: 12px 20px;
}

.v3-lang-item__name { font-size: 14px; font-weight: 600; }
.v3-lang-item__level { font-size: 12px; color: $v3-primary; }

// ─── Cards ───────────────────────────────────────────────────────────────────
.v3-card {
  background: $v3-surface;
  border: 1px solid $v3-border;
  border-radius: 10px;
  padding: 20px 24px;
  transition: border-color $transition-base;

  &:hover { border-color: rgba($v3-primary, 0.4); }

  &--sm {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: rgba($v3-secondary, 0.8);
  }

  &--row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
}

.v3-card__icon { color: $v3-primary; }
.v3-card__icon-wrap { font-size: 22px; flex-shrink: 0; margin-top: 2px; }

.v3-card__cat {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v3-primary;
  margin-bottom: 14px;
}

.v3-card__tags { display: flex; flex-wrap: wrap; gap: 8px; }

.v3-card__title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.v3-card__sub { font-size: 13px; color: $v3-muted; }

// ─── Timeline ────────────────────────────────────────────────────────────────
.v3-timeline {
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 0;
    width: 2px;
    background: $v3-border;
  }
}

.v3-timeline__item {
  position: relative;
  margin-bottom: 40px;

  &:last-child { margin-bottom: 0; }
}

.v3-timeline__dot {
  position: absolute;
  left: -24px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: $v3-bg;
  border: 2px solid $v3-primary;
}

.v3-timeline__content {
  background: $v3-surface;
  border: 1px solid $v3-border;
  border-radius: 10px;
  padding: 24px 28px;
  transition: border-color $transition-base;

  &:hover { border-color: rgba($v3-primary, 0.3); }
}

.v3-timeline__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  @media (max-width: $mobile) {
    flex-direction: column;
  }
}

.v3-timeline__role { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.v3-timeline__company { font-size: 14px; color: $v3-primary; }
.v3-timeline__period { font-size: 12px; color: $v3-muted; white-space: nowrap; }
.v3-timeline__desc { font-size: 14px; line-height: 1.75; color: rgba($v3-secondary, 0.7); margin-bottom: 14px; }
.v3-timeline__tags { display: flex; flex-wrap: wrap; gap: 6px; }

// ─── Skills ──────────────────────────────────────────────────────────────────
.v3-skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

// ─── Education ───────────────────────────────────────────────────────────────
.v3-edu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.v3-badge-progress {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba($v3-primary, 0.15);
  color: $v3-primary;
}

.v3-badge-private {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: $v3-muted;
}

// ─── Projects ────────────────────────────────────────────────────────────────
.v3-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.v3-proj-card {
  background: $v3-surface;
  border: 1px solid $v3-border;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all $transition-base;

  &:hover {
    border-color: rgba($v3-primary, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
}

.v3-proj-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.v3-proj-card__title { font-size: 17px; font-weight: 700; }
.v3-proj-card__desc { font-size: 14px; line-height: 1.7; color: rgba($v3-secondary, 0.7); flex: 1; }
.v3-proj-card__tech { display: flex; flex-wrap: wrap; gap: 6px; }
.v3-proj-card__links { display: flex; gap: 12px; }

.v3-link-btn {
  font-size: 13px;
  font-weight: 600;
  color: $v3-primary;
  transition: opacity $transition-base;
  &:hover { opacity: 0.75; }
}

// ─── Contact ─────────────────────────────────────────────────────────────────
.v3-contact__subtitle {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: rgba($v3-secondary, 0.9);
}

.v3-contact__box {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.v3-contact__email {
  font-size: 20px;
  font-weight: 600;
  color: $v3-primary;
  transition: opacity $transition-base;
  &:hover { opacity: 0.75; }
}

.v3-contact__copy {
  font-family: $v3-font;
  font-size: 13px;
  font-weight: 600;
  color: $v3-muted;
  padding: 8px 16px;
  border: 1px solid $v3-border;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  transition: all $transition-base;

  &:hover { color: $v3-secondary; border-color: $v3-primary; }
}

.v3-contact__links { display: flex; gap: 12px; flex-wrap: wrap; }

.v3-footer {
  margin-top: 60px;
  font-size: 12px;
  color: $v3-muted;
  letter-spacing: 0.06em;
}
</style>
