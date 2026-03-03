<template>
  <div class="v5">
    <!-- Header -->
    <header class="v5-header">
      <span class="v5-header__name">João Vinicius</span>
      <nav class="v5-header__nav">
        <a v-for="s in sections" :key="s.id" :href="`#v5-${s.id}`" class="v5-header__link">{{ t(`nav.${s.id}`) }}</a>
      </nav>
      <div class="v5-header__right">
        <button class="v5-lang-btn" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/versions" class="v5-back">↗</RouterLink>
      </div>
    </header>

    <main class="v5-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v5-hero" class="v5-hero">
        <div class="v5-hero__eyebrow">{{ t('role') }}</div>
        <h1 class="v5-hero__name">
          João<br />
          <span class="v5-hero__name--accent">Vinicius</span>
        </h1>
        <div class="v5-hero__meta">
          <span class="v5-meta-tag">Full Stack</span>
          <span class="v5-meta-sep">·</span>
          <span class="v5-meta-tag">Data & AI</span>
          <span class="v5-meta-sep">·</span>
          <span class="v5-meta-tag">{{ t('location') }}</span>
        </div>
        <p class="v5-hero__tagline">{{ t('tagline') }}</p>
        <div class="v5-hero__actions">
          <a href="/cv-joaovinicius.pdf" download class="v5-btn">{{ t('download_cv') }}</a>
          <a href="#v5-contact" class="v5-btn v5-btn--text">{{ t('contact.title') }} →</a>
        </div>
        <div class="v5-hero__scroll-hint">
          <div class="v5-scroll-line" />
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v5-about" class="v5-section">
        <div class="v5-section__label">{{ String('01').padStart(2, '0') }}</div>
        <h2 class="v5-section__title">{{ t('about.title') }}</h2>
        <div class="v5-about__layout">
          <div class="v5-about__body">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
            <div class="v5-about__diffs">
              <span v-for="d in differentials" :key="d" class="v5-diff-pill">{{ d }}</span>
            </div>
          </div>
          <div class="v5-about__aside">
            <div class="v5-aside-block">
              <span class="v5-aside-block__label">{{ t('about.languages_title') }}</span>
              <div v-for="lang in languages" :key="lang.name" class="v5-lang-item">
                <span>{{ lang.name }}</span>
                <span class="v5-accent">{{ lang.level }}</span>
              </div>
            </div>
            <div class="v5-aside-block">
              <span class="v5-aside-block__label">{{ currentLocale === 'pt-BR' ? 'Localização' : 'Location' }}</span>
              <span class="v5-aside-block__val">{{ t('location') }}</span>
            </div>
            <div class="v5-aside-block">
              <span class="v5-aside-block__label">Status</span>
              <span class="v5-accent">{{ t('about.open_to') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v5-experience" class="v5-section">
        <div class="v5-section__label">02</div>
        <h2 class="v5-section__title">{{ t('experience.title') }}</h2>
        <div class="v5-exp-timeline">
          <div v-for="exp in experiences" :key="exp.id" class="v5-exp-row">
            <div class="v5-exp-row__period">
              {{ formatDate(exp.startDate) }}<br />
              <span>{{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}</span>
            </div>
            <div class="v5-exp-row__line">
              <div class="v5-exp-row__dot" />
            </div>
            <div class="v5-exp-row__content">
              <h3 class="v5-exp-row__role">{{ exp.role }}</h3>
              <p class="v5-exp-row__company">{{ exp.company }}</p>
              <p class="v5-exp-row__desc">{{ exp.description }}</p>
              <div class="v5-exp-row__tags">
                <span v-for="skill in exp.skills" :key="skill" class="v5-tag">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="v5-skills" class="v5-section">
        <div class="v5-section__label">03</div>
        <h2 class="v5-section__title">{{ t('skills.title') }}</h2>
        <div class="v5-skills__categories">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v5-skills__cat">
            <h3 class="v5-skills__cat-name">{{ categoryLabel(cat) }}</h3>
            <div class="v5-skills__list">
              <div v-for="skill in skillList" :key="skill.id" class="v5-skill-item">
                <div class="v5-skill-item__icon-wrap">
                  <component :is="skill.icon" v-if="skill.icon" class="v5-skill-item__icon" />
                  <span v-else class="v5-skill-item__letter">{{ skill.name.charAt(0) }}</span>
                </div>
                <span class="v5-skill-item__name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="v5-edu-block">
          <h2 class="v5-section__title" style="margin-top:72px">{{ t('education.title') }}</h2>
          <div class="v5-edu-list">
            <div v-for="edu in education" :key="edu.id" class="v5-edu-item">
              <span class="v5-edu-item__date">{{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</span>
              <div>
                <p class="v5-edu-item__degree">{{ edu.degree }}</p>
                <p class="v5-edu-item__inst">{{ edu.institution }}</p>
              </div>
            </div>
            <div v-for="cert in certifications" :key="cert.id" class="v5-edu-item">
              <span class="v5-edu-item__date">
                <span v-if="cert.status === 'in-progress'" class="v5-badge-cyan">{{ t('education.in_progress') }}</span>
                <span v-else>✓</span>
              </span>
              <div>
                <p class="v5-edu-item__degree">{{ cert.title }}</p>
                <p class="v5-edu-item__inst">{{ cert.issuer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ─────────────────────────────────────────── -->
      <section id="v5-projects" class="v5-section">
        <div class="v5-section__label">04</div>
        <h2 class="v5-section__title">{{ t('projects.title') }}</h2>
        <div class="v5-proj-list">
          <div v-for="proj in projects" :key="proj.id" class="v5-proj-item">
            <div class="v5-proj-item__left">
              <h3 class="v5-proj-item__title">{{ proj.title }}</h3>
              <p class="v5-proj-item__desc">{{ proj.description }}</p>
              <div class="v5-proj-item__tags">
                <span v-for="tech in proj.technologies" :key="tech" class="v5-tag v5-tag--dim">{{ tech }}</span>
              </div>
            </div>
            <div class="v5-proj-item__right">
              <span v-if="proj.status === 'private'" class="v5-badge-gray">{{ t('projects.private_label') }}</span>
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v5-icon-btn" :title="t('projects.repo_label')">↗</a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v5-icon-btn" :title="t('projects.site_label')">⌘</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v5-contact" class="v5-section v5-contact">
        <div class="v5-section__label">05</div>
        <h2 class="v5-contact__title">{{ t('contact.subtitle') }}</h2>
        <a href="mailto:joaovinicius2525@gmail.com" class="v5-contact__email">joaovinicius2525@gmail.com</a>
        <div class="v5-contact__actions">
          <button class="v5-btn" @click="copyEmail">
            {{ copied ? '✓ ' + t('contact.copied') : t('contact.copy_label') }}
          </button>
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v5-btn v5-btn--text">GitHub →</a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v5-btn v5-btn--text">LinkedIn →</a>
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

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, differentials, languages, formatDate, categoryLabel } = usePortfolio()

const sections = [{ id: 'about' }, { id: 'experience' }, { id: 'skills' }, { id: 'projects' }, { id: 'contact' }]
const copied = ref(false)

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}
</script>

<style lang="scss" scoped>
.v5 {
  background: $v5-bg;
  color: $v5-secondary;
  font-family: $v5-font;
  min-height: 100vh;
}

.v5-accent { color: $v5-primary; }

// ─── Header ─────────────────────────────────────────────────────────────────
.v5-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $v5-bg;
  border-bottom: 1px solid $v5-border;
  padding: 0 64px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $mobile) { padding: 0 24px; }
}

.v5-header__name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: $v5-secondary;
}

.v5-header__nav {
  display: flex;
  gap: 6px;

  @media (max-width: $tablet) { display: none; }
}

.v5-header__link {
  font-size: 13px;
  font-weight: 500;
  color: $v5-muted;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all $transition-base;

  &:hover {
    color: $v5-secondary;
    background: $v5-surface;
  }
}

.v5-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.v5-lang-btn {
  font-family: $v5-font;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $v5-primary;
  background: transparent;
  border: 1px solid rgba($v5-primary, 0.3);
  padding: 5px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all $transition-base;

  &:hover { background: rgba($v5-primary, 0.08); }
}

.v5-back {
  font-size: 16px;
  color: $v5-muted;
  transition: color $transition-base;
  &:hover { color: $v5-primary; }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v5-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 64px;

  @media (max-width: $mobile) { padding: 0 24px; }
}

// ─── Section ────────────────────────────────────────────────────────────────
.v5-section {
  padding: 100px 0;
  border-top: 1px solid $v5-border;
  position: relative;

  @media (max-width: $mobile) { padding: 64px 0; }
}

.v5-section__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: $v5-primary;
  margin-bottom: 16px;
}

.v5-section__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 52px;
  line-height: 1.1;
}

// ─── Hero ───────────────────────────────────────────────────────────────────
.v5-hero {
  padding: 120px 0 80px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: $mobile) { padding: 80px 0 60px; }
}

.v5-hero__eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: $v5-primary;
  margin-bottom: 24px;
}

.v5-hero__name {
  font-size: clamp(60px, 11vw, 96px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: 32px;

  &--accent {
    color: $v5-primary;
  }
}

.v5-hero__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.v5-meta-tag {
  font-size: 13px;
  color: $v5-muted;
  font-weight: 500;
}

.v5-meta-sep {
  color: rgba($v5-secondary, 0.15);
}

.v5-hero__tagline {
  font-size: 16px;
  color: $v5-muted;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 40px;
  font-weight: 400;
}

.v5-hero__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.v5-hero__scroll-hint {
  display: flex;
  align-items: center;
  gap: 12px;
}

.v5-scroll-line {
  width: 40px;
  height: 1px;
  background: $v5-border;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: $v5-primary;
    animation: scrollScan 2s ease-in-out infinite;
  }
}

@keyframes scrollScan {
  to { left: 100%; }
}

// ─── Buttons ────────────────────────────────────────────────────────────────
.v5-btn {
  font-family: $v5-font;
  font-size: 13px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: $v5-primary;
  color: $v5-bg;
  border: 1px solid $v5-primary;
  letter-spacing: 0.02em;

  &:hover {
    background: rgba($v5-primary, 0.15);
    color: $v5-primary;
  }

  &--text {
    background: transparent;
    color: $v5-muted;
    border: 1px solid $v5-border;

    &:hover {
      color: $v5-secondary;
      border-color: $v5-border;
      background: $v5-surface;
    }
  }
}

// ─── About ──────────────────────────────────────────────────────────────────
.v5-about__layout {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 64px;
  align-items: start;

  @media (max-width: $tablet) { grid-template-columns: 1fr; gap: 40px; }
}

.v5-about__body {
  p {
    font-size: 16px;
    line-height: 1.85;
    color: rgba($v5-secondary, 0.75);
    margin-bottom: 20px;
    font-weight: 400;
  }
}

.v5-about__diffs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.v5-diff-pill {
  font-size: 12px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid $v5-border;
  color: $v5-muted;
  background: $v5-surface;
}

.v5-about__aside {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.v5-aside-block__label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: $v5-muted;
  margin-bottom: 10px;
}

.v5-aside-block__val {
  font-size: 14px;
  color: rgba($v5-secondary, 0.8);
}

.v5-lang-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba($v5-secondary, 0.8);
  padding: 4px 0;
}

// ─── Experience timeline ─────────────────────────────────────────────────────
.v5-exp-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.v5-exp-row {
  display: grid;
  grid-template-columns: 100px 24px 1fr;
  gap: 0 24px;

  @media (max-width: $mobile) {
    grid-template-columns: 24px 1fr;
  }
}

.v5-exp-row__period {
  font-size: 12px;
  color: $v5-muted;
  line-height: 1.5;
  padding-top: 4px;
  text-align: right;

  span { color: $v5-primary; }

  @media (max-width: $mobile) { display: none; }
}

.v5-exp-row__line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.v5-exp-row__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $v5-primary;
  flex-shrink: 0;
  margin-top: 6px;
  box-shadow: 0 0 8px rgba($v5-primary, 0.5);

  &::after {
    content: '';
    display: block;
    width: 1px;
    background: $v5-border;
    height: calc(100% + 32px);
    margin: 8px auto 0;
  }
}

.v5-exp-row__content {
  padding-bottom: 48px;
}

.v5-exp-row:last-child .v5-exp-row__dot::after {
  display: none;
}

.v5-exp-row__role {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.2;
}

.v5-exp-row__company {
  font-size: 14px;
  color: $v5-primary;
  font-weight: 500;
  margin-bottom: 12px;
}

.v5-exp-row__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($v5-secondary, 0.6);
  margin-bottom: 14px;
}

.v5-exp-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

// ─── Tags ───────────────────────────────────────────────────────────────────
.v5-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid rgba($v5-primary, 0.3);
  color: rgba($v5-primary, 0.8);

  &--dim {
    border-color: $v5-border;
    color: $v5-muted;
  }
}

// ─── Skills ─────────────────────────────────────────────────────────────────
.v5-skills__categories {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.v5-skills__cat-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: $v5-muted;
  margin-bottom: 20px;
}

.v5-skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.v5-skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border: 1px solid $v5-border;
  border-radius: 8px;
  background: $v5-surface;
  transition: all $transition-fast;
  cursor: default;

  &:hover {
    border-color: rgba($v5-primary, 0.35);
    background: rgba($v5-primary, 0.04);
  }
}

.v5-skill-item__icon-wrap {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.v5-skill-item__icon {
  width: 20px;
  height: 20px;

  :deep(svg) { width: 100%; height: 100%; }
}

.v5-skill-item__letter {
  font-size: 14px;
  font-weight: 800;
  color: $v5-primary;
}

.v5-skill-item__name {
  font-size: 13px;
  font-weight: 500;
  color: rgba($v5-secondary, 0.8);
}

// ─── Education ──────────────────────────────────────────────────────────────
.v5-edu-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid $v5-border;
  border-radius: 10px;
  overflow: hidden;
}

.v5-edu-item {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 22px 28px;
  border-bottom: 1px solid $v5-border;

  &:last-child { border-bottom: none; }
}

.v5-edu-item__date {
  font-size: 11px;
  font-weight: 600;
  color: $v5-muted;
  white-space: nowrap;
  min-width: 80px;
  padding-top: 2px;
}

.v5-edu-item__degree {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.v5-edu-item__inst {
  font-size: 13px;
  color: $v5-muted;
}

.v5-badge-cyan {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid $v5-primary;
  color: $v5-primary;
}

.v5-badge-gray {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid $v5-border;
  color: $v5-muted;
}

// ─── Projects ───────────────────────────────────────────────────────────────
.v5-proj-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.v5-proj-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid $v5-border;
  transition: background $transition-fast;

  &:first-child { padding-top: 0; }
  &:last-child { border-bottom: none; }
}

.v5-proj-item__left { flex: 1; }

.v5-proj-item__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.v5-proj-item__desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba($v5-secondary, 0.6);
  margin-bottom: 14px;
}

.v5-proj-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.v5-proj-item__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding-top: 4px;
}

.v5-icon-btn {
  font-size: 18px;
  color: $v5-muted;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $v5-border;
  border-radius: 6px;
  transition: all $transition-fast;

  &:hover {
    color: $v5-primary;
    border-color: rgba($v5-primary, 0.35);
  }
}

// ─── Contact ────────────────────────────────────────────────────────────────
.v5-contact {
  padding-bottom: 100px;
}

.v5-contact__title {
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 28px;
}

.v5-contact__email {
  display: inline-block;
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 600;
  color: $v5-primary;
  margin-bottom: 32px;
  transition: opacity $transition-fast;

  &:hover { opacity: 0.75; }
}

.v5-contact__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 80px;
}

.v5-footer {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba($v5-secondary, 0.2);
}
</style>
