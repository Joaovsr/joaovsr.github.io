<template>
  <div class="v2">
    <!-- Top bar -->
    <header class="v2-header">
      <span class="v2-header__prompt">joaovsr@portfolio:~$</span>
      <div class="v2-header__right">
        <button class="v2-btn-lang" @click="toggleLocale">{{ t('lang_toggle') }}</button>
        <RouterLink to="/" class="v2-link-ghost">← versões</RouterLink>
      </div>
    </header>

    <!-- Nav bar -->
    <nav class="v2-nav">
      <button
        v-for="(section, idx) in sections"
        :key="section.id"
        class="v2-nav__item"
        :class="{ active: activeSection === idx }"
        @click="goTo(section.anchor)"
      >
        ./{{ section.label }}
      </button>
    </nav>

    <!-- Main terminal content -->
    <main class="v2-main">

      <!-- ── HERO ─────────────────────────────────────────────── -->
      <section id="v2-hero" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">whoami</span>
        </div>
        <div class="v2-output">
          <p class="v2-name">{{ t('name_short') }}</p>
          <p class="v2-role-line">
            <span class="v2-kw">role:</span>
            <span class="v2-val"> {{ t('role') }} | {{ t('role_sub') }}</span>
          </p>
          <p class="v2-role-line">
            <span class="v2-kw">location:</span>
            <span class="v2-val"> {{ t('location') }}</span>
          </p>
          <p class="v2-role-line">
            <span class="v2-kw">status:</span>
            <span class="v2-green"> {{ t('available_remote') }}</span>
          </p>
          <p class="v2-role-line">
            <span class="v2-kw">contact:</span>
            <span class="v2-val"> joaovinicius2525@gmail.com</span>
          </p>
        </div>

        <div class="v2-cmd" style="margin-top:32px">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">cat tagline.txt</span>
        </div>
        <div class="v2-output">
          <p class="v2-comment">// {{ t('tagline') }}</p>
        </div>

        <div class="v2-cmd" style="margin-top:32px">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">echo $STACK</span>
        </div>
        <div class="v2-output v2-stack-row">
          <span v-for="tech in heroStack" :key="tech" class="v2-tag">{{ tech }}</span>
        </div>

        <div class="v2-cmd v2-cta-cmd" style="margin-top:32px">
          <span class="v2-prompt">$</span>
          <a href="/cv-joaovinicius.pdf" download class="v2-cmd__text v2-link-action">{{ t('download_cv') }} ↓</a>
        </div>
      </section>

      <!-- ── ABOUT ───────────────────────────────────────────── -->
      <section id="v2-about" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">cat about.md</span>
        </div>
        <div class="v2-output">
          <p class="v2-md-h1"># {{ t('about.title') }}</p>
          <p class="v2-md-body">{{ t('about.text') }}</p>
          <p class="v2-md-body">{{ t('about.text2') }}</p>
          <div class="v2-md-list">
            <p v-for="d in (t('about.differentials') as unknown as string[])" :key="d">
              <span class="v2-green">+</span> {{ d }}
            </p>
          </div>
          <p class="v2-comment">// {{ t('about.languages_title') }}</p>
          <div v-for="lang in (t('about.languages') as unknown as Array<{name:string;level:string}>)" :key="lang.name" class="v2-lang-row">
            <span class="v2-kw">{{ lang.name }}</span>
            <span class="v2-separator"> → </span>
            <span class="v2-green">{{ lang.level }}</span>
          </div>
        </div>
      </section>

      <!-- ── EXPERIENCE ─────────────────────────────────────── -->
      <section id="v2-experience" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">ls -la ./experience/</span>
        </div>
        <div class="v2-output">
          <p class="v2-comment">total {{ experiences.length }}</p>
          <div v-for="exp in experiences" :key="exp.id" class="v2-exp-entry">
            <div class="v2-exp-header">
              <span class="v2-green">drwxr-xr-x</span>
              <span class="v2-exp-company">{{ exp.company }}</span>
              <span class="v2-exp-role">{{ exp.role }}</span>
            </div>
            <div class="v2-exp-period">
              <span class="v2-comment">
                // {{ formatDate(exp.startDate) }} → {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}
              </span>
            </div>
            <p class="v2-exp-desc">{{ exp.description }}</p>
            <div class="v2-exp-tags">
              <span v-for="skill in exp.skills" :key="skill" class="v2-tag v2-tag--dim">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SKILLS ─────────────────────────────────────────── -->
      <section id="v2-skills" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">node -e "require('./skills').list()"</span>
        </div>
        <div class="v2-output">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v2-skill-group">
            <p class="v2-skill-cat"><span class="v2-kw">{{ categoryLabel(cat) }}</span><span class="v2-comment">: [</span></p>
            <p class="v2-skill-items">
              <span v-for="(skill, i) in skillList" :key="skill.id">
                <span class="v2-string">"{{ skill.name }}"</span><span class="v2-comment" v-if="i < skillList.length - 1">, </span>
              </span>
            </p>
            <p class="v2-comment">]</p>
          </div>
        </div>

        <!-- Education -->
        <div class="v2-cmd" style="margin-top:40px">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">cat education.json</span>
        </div>
        <div class="v2-output">
          <div v-for="edu in education" :key="edu.id" class="v2-edu-entry">
            <span class="v2-kw">"{{ edu.institution }}"</span>
            <span class="v2-comment"> → </span>
            <span class="v2-val">{{ edu.degree }}</span>
            <span class="v2-comment"> ({{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }})</span>
          </div>
          <p class="v2-comment" style="margin-top:16px">// certifications</p>
          <div v-for="cert in certifications" :key="cert.id" class="v2-cert-entry">
            <span class="v2-green">✓ </span>
            <span class="v2-val">{{ cert.title }}</span>
            <span class="v2-comment"> — {{ cert.issuer }}</span>
            <span v-if="cert.status === 'in-progress'" class="v2-in-progress"> [IN PROGRESS]</span>
          </div>
        </div>
      </section>

      <!-- ── PROJECTS ───────────────────────────────────────── -->
      <section id="v2-projects" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">git log --oneline --all ./projects/</span>
        </div>
        <div class="v2-output">
          <div v-for="proj in projects" :key="proj.id" class="v2-proj-entry">
            <div class="v2-proj-header">
              <span class="v2-hash">{{ proj.id.toString(16).padStart(7, '0') }}a</span>
              <span class="v2-proj-title">{{ proj.title }}</span>
              <span v-if="proj.status === 'private'" class="v2-tag v2-tag--warn">[private]</span>
            </div>
            <p class="v2-comment">// {{ proj.description }}</p>
            <div class="v2-proj-tech">
              <span v-for="tech in proj.technologies" :key="tech" class="v2-tag v2-tag--dim">{{ tech }}</span>
            </div>
            <div class="v2-proj-links" v-if="proj.repoUrl || proj.siteUrl">
              <a v-if="proj.repoUrl" :href="proj.repoUrl" target="_blank" rel="noopener noreferrer" class="v2-link-action">$ open {{ proj.repoUrl }}</a>
              <a v-if="proj.siteUrl" :href="proj.siteUrl" target="_blank" rel="noopener noreferrer" class="v2-link-action">$ curl {{ proj.siteUrl }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CONTACT ─────────────────────────────────────────── -->
      <section id="v2-contact" class="v2-block">
        <div class="v2-cmd">
          <span class="v2-prompt">$</span>
          <span class="v2-cmd__text">send --message "{{ t('contact.subtitle') }}"</span>
        </div>
        <div class="v2-output">
          <div class="v2-contact-row">
            <span class="v2-kw">email</span>
            <span class="v2-separator"> → </span>
            <a href="mailto:joaovinicius2525@gmail.com" class="v2-link-action">joaovinicius2525@gmail.com</a>
            <button class="v2-copy-btn" @click="copyEmail">
              {{ copied ? '✓ ' + t('contact.copied') : '⎘ ' + t('contact.copy_label') }}
            </button>
          </div>
          <div class="v2-contact-row">
            <span class="v2-kw">github</span>
            <span class="v2-separator"> → </span>
            <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v2-link-action">github.com/joaovsr</a>
          </div>
          <div class="v2-contact-row">
            <span class="v2-kw">linkedin</span>
            <span class="v2-separator"> → </span>
            <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v2-link-action">linkedin.com/in/joão-vinicius-rodrigues</a>
          </div>
        </div>

        <div class="v2-cmd v2-cmd--blink" style="margin-top:40px">
          <span class="v2-prompt">$</span>
          <span class="v2-cursor">_</span>
        </div>

        <p class="v2-footer">// {{ t('contact.footer') }}</p>
      </section>

    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortfolio } from '@/composables/usePortfolio'
import { toggleLocale } from '@/plugins/i18n'

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, formatDate, categoryLabel } = usePortfolio()

const heroStack = ['TypeScript', 'React', 'NestJS', 'Flutter', 'Python', 'Docker', 'K8s']
const copied = ref(false)
const activeSection = ref(0)

const sections = [
  { id: 'hero', anchor: 'v2-hero', label: 'whoami' },
  { id: 'about', anchor: 'v2-about', label: 'about' },
  { id: 'experience', anchor: 'v2-experience', label: 'experience' },
  { id: 'skills', anchor: 'v2-skills', label: 'skills' },
  { id: 'projects', anchor: 'v2-projects', label: 'projects' },
  { id: 'contact', anchor: 'v2-contact', label: 'contact' }
]

function goTo(anchor: string) {
  document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
}

async function copyEmail() {
  await navigator.clipboard.writeText('joaovinicius2525@gmail.com')
  copied.value = true
  setTimeout(() => { copied.value = false }, 3000)
}

let observer: IntersectionObserver
onMounted(() => {
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = sections.findIndex(s => s.anchor === entry.target.id)
        if (idx !== -1) activeSection.value = idx
      }
    }
  }, { threshold: 0.3 })

  sections.forEach(s => {
    const el = document.getElementById(s.anchor)
    if (el) observer.observe(el)
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<style lang="scss" scoped>
.v2 {
  background: $v2-bg;
  color: $v2-secondary;
  font-family: $v2-font;
  min-height: 100vh;
  font-size: 14px;
  line-height: 1.6;
}

// ─── Header ──────────────────────────────────────────────────────────────────
.v2-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $v2-bg;
  border-bottom: 1px solid $v2-border;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v2-header__prompt {
  color: $v2-primary;
  font-size: 13px;
  font-weight: 700;
}

.v2-header__right {
  display: flex;
  gap: 20px;
  align-items: center;
}

.v2-btn-lang {
  background: transparent;
  border: 1px solid $v2-border;
  color: $v2-primary;
  font-family: $v2-font;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  cursor: pointer;
  transition: all $transition-base;
  text-transform: uppercase;

  &:hover {
    background: $v2-primary;
    color: $v2-bg;
  }
}

.v2-link-ghost {
  font-size: 12px;
  color: rgba($v2-primary, 0.5);
  transition: color $transition-base;
  &:hover { color: $v2-primary; }
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
.v2-nav {
  background: $v2-surface;
  border-bottom: 1px solid $v2-border;
  padding: 8px 32px;
  display: flex;
  gap: 4px;
  overflow-x: auto;

  @media (max-width: $mobile) {
    padding: 8px 16px;
  }
}

.v2-nav__item {
  background: transparent;
  border: none;
  font-family: $v2-font;
  font-size: 12px;
  color: rgba($v2-primary, 0.5);
  padding: 6px 14px;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;

  &:hover, &.active {
    color: $v2-primary;
    background: rgba($v2-primary, 0.08);
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────
.v2-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px 80px;

  @media (max-width: $mobile) {
    padding: 0 16px 60px;
  }
}

// ─── Block (section) ────────────────────────────────────────────────────────
.v2-block {
  padding: 60px 0;
  border-bottom: 1px solid $v2-border;

  &:last-child { border-bottom: none; }
}

// ─── Terminal primitives ────────────────────────────────────────────────────
.v2-cmd {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.v2-prompt {
  color: $v2-primary;
  font-weight: 700;
  user-select: none;
}

.v2-cmd__text {
  color: $v2-secondary;
  font-weight: 400;
}

.v2-output {
  padding-left: 20px;
  border-left: 2px solid rgba($v2-primary, 0.15);
  margin-left: 6px;
}

.v2-kw { color: $v2-primary; font-weight: 700; }
.v2-val { color: $v2-secondary; }
.v2-comment { color: rgba($v2-primary, 0.45); font-style: italic; }
.v2-string { color: #ffcc66; }
.v2-green { color: $v2-primary; }
.v2-separator { color: rgba($v2-primary, 0.4); margin: 0 6px; }
.v2-hash { color: rgba($v2-primary, 0.6); margin-right: 12px; font-size: 12px; }
.v2-in-progress { color: #ffaa00; font-weight: 700; }

// ─── Name ───────────────────────────────────────────────────────────────────
.v2-name {
  font-size: clamp(36px, 6vw, 60px);
  font-weight: 700;
  color: $v2-primary;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.v2-role-line {
  margin-bottom: 6px;
  font-size: 14px;
}

// ─── Stack ──────────────────────────────────────────────────────────────────
.v2-stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

// ─── Tags ───────────────────────────────────────────────────────────────────
.v2-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border: 1px solid $v2-border;
  color: $v2-primary;

  &--dim {
    color: rgba($v2-primary, 0.55);
    border-color: rgba($v2-primary, 0.15);
  }

  &--warn {
    color: #ffaa00;
    border-color: rgba(255, 170, 0, 0.3);
  }
}

// ─── Link action ────────────────────────────────────────────────────────────
.v2-link-action {
  color: $v2-primary;
  text-decoration: underline;
  text-decoration-color: rgba($v2-primary, 0.3);
  transition: text-decoration-color $transition-base;

  &:hover { text-decoration-color: $v2-primary; }
}

// ─── Experience ─────────────────────────────────────────────────────────────
.v2-exp-entry {
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px dashed $v2-border;

  &:last-child { border-bottom: none; margin-bottom: 0; }
}

.v2-exp-header {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.v2-exp-company { color: $v2-secondary; font-weight: 700; font-size: 16px; }
.v2-exp-role { color: rgba($v2-primary, 0.7); font-size: 13px; }
.v2-exp-period { margin-bottom: 10px; }
.v2-exp-desc { color: rgba($v2-secondary, 0.7); font-size: 13px; margin-bottom: 10px; line-height: 1.7; }
.v2-exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }

// ─── Skills ─────────────────────────────────────────────────────────────────
.v2-skill-group {
  margin-bottom: 16px;
}

.v2-skill-cat {
  margin-bottom: 6px;
}

.v2-skill-items {
  padding-left: 20px;
  margin-bottom: 4px;
}

// ─── Education ──────────────────────────────────────────────────────────────
.v2-edu-entry, .v2-cert-entry {
  margin-bottom: 12px;
  font-size: 13px;
}

// ─── Projects ───────────────────────────────────────────────────────────────
.v2-proj-entry {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px dashed $v2-border;

  &:last-child { border-bottom: none; }
}

.v2-proj-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.v2-proj-title { color: $v2-secondary; font-weight: 700; }
.v2-proj-tech { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
.v2-proj-links { display: flex; flex-direction: column; gap: 4px; }

// ─── Contact ────────────────────────────────────────────────────────────────
.v2-contact-row {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.v2-copy-btn {
  background: transparent;
  border: 1px solid $v2-border;
  color: rgba($v2-primary, 0.6);
  font-family: $v2-font;
  font-size: 11px;
  padding: 2px 8px;
  cursor: pointer;
  margin-left: 12px;
  transition: all $transition-base;

  &:hover { color: $v2-primary; border-color: $v2-primary; }
}

// ─── Cursor blink ───────────────────────────────────────────────────────────
.v2-cursor {
  color: $v2-primary;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

// ─── MD styling ─────────────────────────────────────────────────────────────
.v2-md-h1 {
  font-size: 22px;
  font-weight: 700;
  color: $v2-primary;
  margin-bottom: 16px;
}

.v2-md-body {
  color: rgba($v2-secondary, 0.75);
  font-size: 13px;
  line-height: 1.8;
  margin-bottom: 14px;
}

.v2-md-list {
  margin-bottom: 16px;
  p {
    font-size: 13px;
    margin-bottom: 6px;
    color: rgba($v2-secondary, 0.75);
  }
}

.v2-lang-row {
  font-size: 13px;
  margin-bottom: 6px;
}

// ─── Footer ─────────────────────────────────────────────────────────────────
.v2-footer {
  margin-top: 40px;
  font-size: 12px;
  color: rgba($v2-primary, 0.3);
}
</style>
