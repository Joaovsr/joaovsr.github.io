<template>
  <div class="v4">
    <!-- Top bar -->
    <header class="v4-header">
      <div class="v4-header__left">
        <span class="v4-logo">JV</span>
        <span class="v4-logo-sub">RODRIGUES</span>
      </div>
      <div class="v4-header__right">
        <nav class="v4-nav">
          <a v-for="s in sections" :key="s.id" :href="`#v4-${s.id}`" class="v4-nav__link">{{ t(`nav.${s.id}`) }}</a>
        </nav>
        <button class="v4-lang-btn" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/versions" class="v4-versions">↗</RouterLink>
      </div>
    </header>

    <main class="v4-main">
      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v4-hero" class="v4-hero">
        <div class="v4-hero__label">FULL STACK · DATA & AI</div>
        <h1 class="v4-hero__name">
          <span class="v4-hero__name-line">João</span>
          <span class="v4-hero__name-line v4-hero__name-line--accent">Vinicius</span>
        </h1>
        <p class="v4-hero__tagline">{{ t('tagline') }}</p>
        <div class="v4-hero__bottom">
          <div class="v4-hero__stack">
            <span v-for="tech in heroStack" :key="tech" class="v4-chip">{{ tech }}</span>
          </div>
          <div class="v4-hero__cta">
            <a href="/cv-joaovinicius.pdf" download class="v4-btn v4-btn--fill">{{ t('download_cv') }}</a>
            <a href="#v4-contact" class="v4-btn v4-btn--outline">{{ t('contact.title') }}</a>
          </div>
        </div>
        <div class="v4-hero__stat-row">
          <div class="v4-stat">
            <span class="v4-stat__num">3+</span>
            <span class="v4-stat__label">{{ currentLocale === 'pt-BR' ? 'Anos de Exp.' : 'Years of Exp.' }}</span>
          </div>
          <div class="v4-stat">
            <span class="v4-stat__num">5+</span>
            <span class="v4-stat__label">{{ currentLocale === 'pt-BR' ? 'Empresas' : 'Companies' }}</span>
          </div>
          <div class="v4-stat">
            <span class="v4-stat__num">24</span>
            <span class="v4-stat__label">Skills</span>
          </div>
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v4-about" class="v4-section">
        <div class="v4-section__number">01</div>
        <h2 class="v4-section__title">{{ t('about.title') }}</h2>
        <div class="v4-about__grid">
          <div class="v4-about__text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.text2') }}</p>
          </div>
          <div class="v4-about__sidebar">
            <div class="v4-info-block">
              <div class="v4-info-block__label">{{ currentLocale === 'pt-BR' ? 'Localização' : 'Location' }}</div>
              <div class="v4-info-block__value">{{ t('location') }}</div>
            </div>
            <div class="v4-info-block">
              <div class="v4-info-block__label">Status</div>
              <div class="v4-info-block__value v4-info-block__value--accent">{{ t('available_remote') }}</div>
            </div>
            <div class="v4-info-block">
              <div class="v4-info-block__label">{{ t('about.languages_title') }}</div>
              <div v-for="lang in languages" :key="lang.name" class="v4-lang-row">
                <span>{{ lang.name }}</span><span class="v4-accent">{{ lang.level }}</span>
              </div>
            </div>
            <div class="v4-differentials">
              <div v-for="diff in differentials" :key="diff" class="v4-diff-item">
                <span class="v4-diff-icon">⟶</span> {{ diff }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v4-experience" class="v4-section v4-section--alt">
        <div class="v4-section__number">02</div>
        <h2 class="v4-section__title">{{ t('experience.title') }}</h2>
        <div class="v4-exp-list">
          <div v-for="(exp, i) in experiences" :key="exp.id" class="v4-exp-item">
            <div class="v4-exp-item__idx">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="v4-exp-item__body">
              <div class="v4-exp-item__header">
                <h3 class="v4-exp-item__role">{{ exp.role }}</h3>
                <div class="v4-exp-item__meta">
                  <span class="v4-exp-item__company">{{ exp.company }}</span>
                  <span class="v4-exp-item__period">
                    {{ formatDate(exp.startDate) }} — {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
                  </span>
                </div>
              </div>
              <p class="v4-exp-item__desc">{{ exp.description }}</p>
              <div class="v4-exp-item__tags">
                <span v-for="skill in exp.skills" :key="skill" class="v4-tag">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="v4-skills" class="v4-section">
        <div class="v4-section__number">03</div>
        <h2 class="v4-section__title">{{ t('skills.title') }}</h2>
        <div class="v4-skills__grid">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v4-skills__col">
            <h3 class="v4-skills__cat">{{ categoryLabel(cat) }}</h3>
            <div class="v4-skills__items">
              <div v-for="skill in skillList" :key="skill.id" class="v4-skill-item">
                <component :is="skill.icon" v-if="skill.icon" class="v4-skill-item__icon" />
                <span v-else class="v4-skill-item__bullet">—</span>
                {{ skill.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- Education strip -->
        <div class="v4-edu-strip">
          <div v-for="edu in education" :key="edu.id" class="v4-edu-item">
            <div class="v4-edu-item__degree">{{ edu.degree }}</div>
            <div class="v4-edu-item__inst">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</div>
          </div>
          <div v-for="cert in certifications" :key="cert.id" class="v4-edu-item">
            <div class="v4-edu-item__degree">
              {{ cert.title }}
              <span v-if="cert.status === 'in-progress'" class="v4-badge-prog">{{ t('education.in_progress') }}</span>
            </div>
            <div class="v4-edu-item__inst">{{ cert.issuer }}</div>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ───────────────────────────────────────── -->
      <section id="v4-projects" class="v4-section v4-section--alt">
        <div class="v4-section__number">04</div>
        <h2 class="v4-section__title">{{ t('projects.title') }}</h2>
        <div class="v4-proj-list">
          <div v-for="(proj, i) in projects" :key="proj.id" class="v4-proj-item">
            <div class="v4-proj-item__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="v4-proj-item__body">
              <div class="v4-proj-item__header">
                <h3 class="v4-proj-item__title">{{ proj.title }}</h3>
                <div class="v4-proj-item__links">
                  <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v4-icon-link" :title="t('projects.repo_label')">↗</a>
                  <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v4-icon-link" :title="t('projects.site_label')">⌘</a>
                </div>
              </div>
              <p class="v4-proj-item__desc">{{ proj.description }}</p>
              <div class="v4-proj-item__tech">
                <span v-for="tech in proj.technologies" :key="tech" class="v4-tag v4-tag--dim">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v4-contact" class="v4-section v4-contact">
        <div class="v4-section__number">05</div>
        <h2 class="v4-section__title v4-section__title--xl">{{ t('contact.subtitle') }}</h2>
        <a href="mailto:joaovinicius2525@gmail.com" class="v4-contact__email">joaovinicius2525@gmail.com</a>
        <div class="v4-contact__actions">
          <button class="v4-btn v4-btn--outline" @click="copyEmail">{{ copied ? '✓ ' + t('contact.copied') : t('contact.copy_label') }}</button>
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v4-btn v4-btn--outline">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v4-btn v4-btn--outline">LinkedIn ↗</a>
        </div>
        <footer class="v4-footer">{{ t('contact.footer') }}</footer>
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

const heroStack = ['TypeScript', 'React', 'NestJS', 'Flutter', 'Python', 'Docker', 'K8s', 'Data & AI']
const copied = ref(false)
const sections = [{ id: 'about' }, { id: 'experience' }, { id: 'skills' }, { id: 'projects' }, { id: 'contact' }]

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}
</script>

<style lang="scss" scoped>
.v4 {
  background: $v4-bg;
  color: $v4-secondary;
  font-family: $v4-font;
  min-height: 100vh;
}

// ─── Header ──────────────────────────────────────────────────────────────────
.v4-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $v4-bg;
  border-bottom: 1px solid $v4-border;
  padding: 0 60px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $mobile) { padding: 0 20px; }
}

.v4-header__left { display: flex; align-items: baseline; gap: 10px; }

.v4-logo {
  font-size: 22px;
  font-weight: 700;
  color: $v4-primary;
  letter-spacing: 0.05em;
}

.v4-logo-sub {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: rgba($v4-secondary, 0.3);
}

.v4-header__right { display: flex; align-items: center; gap: 20px; }

.v4-nav {
  display: flex;
  gap: 4px;

  @media (max-width: $tablet) { display: none; }
}

.v4-nav__link {
  font-size: 13px;
  font-weight: 500;
  color: rgba($v4-secondary, 0.4);
  padding: 6px 12px;
  transition: color $transition-base;

  &:hover { color: $v4-secondary; }
}

.v4-lang-btn {
  font-family: $v4-font;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $v4-primary;
  border: 1px solid $v4-border;
  background: transparent;
  padding: 6px 14px;
  cursor: pointer;
  transition: all $transition-base;

  &:hover { background: $v4-primary; color: $v4-bg; }
}

.v4-versions {
  font-size: 18px;
  color: rgba($v4-secondary, 0.3);
  transition: color $transition-base;
  &:hover { color: $v4-primary; }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v4-main { max-width: 1200px; margin: 0 auto; }

// ─── Hero ────────────────────────────────────────────────────────────────────
.v4-hero {
  min-height: calc(100vh - 64px);
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid $v4-border;

  @media (max-width: $mobile) { padding: 60px 20px; }
}

.v4-hero__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: $v4-primary;
  margin-bottom: 24px;
}

.v4-hero__name {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  margin-bottom: 32px;
}

.v4-hero__name-line {
  font-size: clamp(64px, 12vw, 140px);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: $v4-secondary;

  &--accent { color: $v4-primary; }
}

.v4-hero__tagline {
  font-size: 18px;
  font-weight: 400;
  color: rgba($v4-secondary, 0.5);
  max-width: 520px;
  line-height: 1.6;
  margin-bottom: 48px;
}

.v4-hero__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 60px;
}

.v4-hero__stack { display: flex; flex-wrap: wrap; gap: 8px; }

.v4-chip {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid $v4-border;
  color: rgba($v4-secondary, 0.5);
  transition: all $transition-base;

  &:hover { border-color: $v4-primary; color: $v4-primary; }
}

.v4-hero__cta { display: flex; gap: 12px; flex-wrap: wrap; }

.v4-hero__stat-row {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
  border-top: 1px solid $v4-border;
  padding-top: 32px;
}

.v4-stat {}
.v4-stat__num { display: block; font-size: 40px; font-weight: 700; color: $v4-primary; line-height: 1; }
.v4-stat__label { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba($v4-secondary, 0.4); }

// ─── Buttons ─────────────────────────────────────────────────────────────────
.v4-btn {
  font-family: $v4-font;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 12px 28px;
  cursor: pointer;
  transition: all $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &--fill {
    background: $v4-primary;
    color: $v4-bg;
    border: 1px solid $v4-primary;
    &:hover { background: rgba($v4-primary, 0.85); }
  }

  &--outline {
    background: transparent;
    color: $v4-secondary;
    border: 1px solid $v4-border;
    &:hover { border-color: $v4-primary; color: $v4-primary; }
  }
}

// ─── Sections ────────────────────────────────────────────────────────────────
.v4-section {
  padding: 100px 60px;
  border-bottom: 1px solid $v4-border;
  position: relative;

  &--alt { background: $v4-surface; }

  @media (max-width: $mobile) { padding: 60px 20px; }
}

.v4-section__number {
  font-size: 100px;
  font-weight: 700;
  color: rgba($v4-secondary, 0.04);
  position: absolute;
  top: 40px;
  right: 60px;
  line-height: 1;
  user-select: none;
  pointer-events: none;
}

.v4-section__title {
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 60px;
  text-transform: uppercase;
  line-height: 1;

  &--xl {
    font-size: clamp(40px, 6vw, 70px);
    margin-bottom: 24px;
  }
}

// ─── About ───────────────────────────────────────────────────────────────────
.v4-about__grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  align-items: start;

  @media (max-width: $tablet) { grid-template-columns: 1fr; gap: 40px; }
}

.v4-about__text {
  p {
    font-size: 17px;
    line-height: 1.8;
    color: rgba($v4-secondary, 0.75);
    margin-bottom: 20px;
  }
}

.v4-info-block { margin-bottom: 24px; }
.v4-info-block__label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba($v4-secondary, 0.3); margin-bottom: 6px; }
.v4-info-block__value { font-size: 15px; color: $v4-secondary; }
.v4-info-block__value--accent { color: $v4-primary; }

.v4-lang-row { display: flex; justify-content: space-between; font-size: 14px; padding: 4px 0; }

.v4-accent { color: $v4-primary; }

.v4-differentials { margin-top: 24px; }
.v4-diff-item { font-size: 14px; color: rgba($v4-secondary, 0.6); margin-bottom: 10px; }
.v4-diff-icon { color: $v4-primary; margin-right: 8px; }

// ─── Experience ───────────────────────────────────────────────────────────────
.v4-exp-list { display: flex; flex-direction: column; gap: 0; }

.v4-exp-item {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid $v4-border;
  align-items: flex-start;

  &:last-child { border-bottom: none; }
}

.v4-exp-item__idx { font-size: 12px; font-weight: 700; color: rgba($v4-secondary, 0.2); letter-spacing: 0.1em; flex-shrink: 0; padding-top: 4px; }
.v4-exp-item__body { flex: 1; }
.v4-exp-item__header { margin-bottom: 10px; }
.v4-exp-item__role { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.v4-exp-item__meta { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.v4-exp-item__company { font-size: 14px; color: $v4-primary; font-weight: 600; }
.v4-exp-item__period { font-size: 12px; color: rgba($v4-secondary, 0.4); }
.v4-exp-item__desc { font-size: 14px; line-height: 1.75; color: rgba($v4-secondary, 0.65); margin-bottom: 14px; }
.v4-exp-item__tags { display: flex; flex-wrap: wrap; gap: 8px; }

// ─── Tags ───────────────────────────────────────────────────────────────────
.v4-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 4px 12px;
  border: 1px solid rgba($v4-primary, 0.4);
  color: $v4-primary;

  &--dim {
    border-color: $v4-border;
    color: rgba($v4-secondary, 0.5);
  }
}

// ─── Skills ──────────────────────────────────────────────────────────────────
.v4-skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 48px;
  margin-bottom: 60px;
}

.v4-skills__cat {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: $v4-primary;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid $v4-primary;
}

.v4-skills__items { display: flex; flex-direction: column; gap: 10px; }

.v4-skill-item { font-size: 14px; color: rgba($v4-secondary, 0.75); display: flex; align-items: center; gap: 10px; }
.v4-skill-item__bullet { color: $v4-primary; }
.v4-skill-item__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  :deep(svg) { width: 100%; height: 100%; }
}

// ─── Edu strip ───────────────────────────────────────────────────────────────
.v4-edu-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding-top: 48px;
  border-top: 1px solid $v4-border;
}

.v4-edu-item__degree { font-size: 15px; font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.v4-edu-item__inst { font-size: 13px; color: rgba($v4-secondary, 0.4); }

.v4-badge-prog {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border: 1px solid $v4-primary;
  color: $v4-primary;
}

// ─── Projects ────────────────────────────────────────────────────────────────
.v4-proj-list { display: flex; flex-direction: column; }

.v4-proj-item {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid $v4-border;
  align-items: flex-start;

  &:last-child { border-bottom: none; }
}

.v4-proj-item__num { font-size: 12px; font-weight: 700; color: rgba($v4-secondary, 0.2); flex-shrink: 0; padding-top: 4px; }
.v4-proj-item__body { flex: 1; }
.v4-proj-item__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.v4-proj-item__title { font-size: 22px; font-weight: 700; }
.v4-proj-item__links { display: flex; gap: 12px; }
.v4-proj-item__desc { font-size: 14px; line-height: 1.75; color: rgba($v4-secondary, 0.65); margin-bottom: 14px; }
.v4-proj-item__tech { display: flex; flex-wrap: wrap; gap: 8px; }

.v4-icon-link {
  font-size: 20px;
  color: rgba($v4-secondary, 0.3);
  transition: color $transition-base;
  &:hover { color: $v4-primary; }
}

// ─── Contact ─────────────────────────────────────────────────────────────────
.v4-contact__email {
  display: block;
  font-size: clamp(24px, 4vw, 44px);
  font-weight: 700;
  color: $v4-secondary;
  border-bottom: 3px solid $v4-primary;
  width: fit-content;
  margin-bottom: 40px;
  padding-bottom: 6px;
  transition: color $transition-base;

  &:hover { color: $v4-primary; }
}

.v4-contact__actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 60px; }

.v4-footer { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba($v4-secondary, 0.2); }
</style>
