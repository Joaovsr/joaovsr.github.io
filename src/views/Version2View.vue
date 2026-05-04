<template>
  <div class="v2">
    <!-- Neural canvas background -->
    <canvas ref="canvasRef" class="v2-canvas" aria-hidden="true" />

    <!-- Top bar -->
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
          <span class="v2-top__name">João Vinicius</span>
          <span class="v2-top__sys">// neural-lab</span>
        </div>
      </div>

      <nav class="v2-top__nav">
        <a v-for="(s, i) in sections" :key="s.id" :href="`#${s.id}`" class="v2-top__link" :class="{ active: activeIdx === i }">
          {{ t(`nav.${s.id}`) }}
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

    <main class="v2-main">
      <!-- HERO -->
      <section id="hero" class="v2-section v2-hero">
        <div class="v2-hero__left">
          <div class="v2-tag">
            <span class="v2-tag__dot"></span> {{ t('v2.hero.tag') }}
          </div>
          <h1 class="v2-hero__name">
            <span class="v2-hero__name-line">João</span>
            <span class="v2-hero__name-line v2-hero__name-line--accent">Vinicius<span class="v2-cursor">_</span></span>
          </h1>
          <p class="v2-hero__role">
            {{ t('role') }} <span class="v2-divider">·</span> <span class="v2-accent">{{ t('role_sub') }}</span>
          </p>
          <p class="v2-hero__tag">{{ t('tagline') }}</p>

          <div class="v2-hero__embed">
            <div class="v2-hero__embed-label">{{ t('v2.hero.embed_label') }}</div>
            <div class="v2-hero__embed-vector">
              <span v-for="n in embedSample" :key="n.i" class="v2-embed-num">{{ n.v }}</span>
              <span class="v2-embed-num v2-embed-num--dim">…dim 1536</span>
            </div>
          </div>

          <div class="v2-hero__cta">
            <button type="button" @click="downloadCv" class="v2-btn v2-btn--primary">
              {{ t('download_cv') }} <span>↓</span>
            </button>
            <a href="#ask" class="v2-btn v2-btn--ghost">
              {{ t('v2.hero.ask_cta') }} <span>→</span>
            </a>
          </div>
        </div>

        <div class="v2-hero__right">
          <div class="v2-orb">
            <div class="v2-orb__core"></div>
            <div class="v2-orb__ring v2-orb__ring--1"></div>
            <div class="v2-orb__ring v2-orb__ring--2"></div>
            <div class="v2-orb__ring v2-orb__ring--3"></div>
            <span v-for="(p, i) in orbParticles" :key="i" class="v2-orb__particle" :style="p" />
          </div>
          <div class="v2-hero__metrics">
            <div class="v2-metric"><span class="v2-metric__num">4</span><span class="v2-metric__lbl">{{ t('v2.hero.metric_years') }}</span></div>
            <div class="v2-metric"><span class="v2-metric__num">{{ projects.length }}+</span><span class="v2-metric__lbl">{{ t('v2.hero.metric_projects') }}</span></div>
            <div class="v2-metric"><span class="v2-metric__num">{{ certifications.length }}</span><span class="v2-metric__lbl">{{ t('v2.hero.metric_certs') }}</span></div>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="v2-section v2-about">
        <div class="v2-section__head">
          <span class="v2-section__num">// 01</span>
          <h2 class="v2-section__title">{{ t('about.title') }}</h2>
        </div>
        <div class="v2-about__grid">
          <div class="v2-about__main">
            <p class="v2-about__lead">{{ t('about.text') }}</p>
            <p class="v2-about__body">{{ t('about.text2') }}</p>
            <ul class="v2-about__diff">
              <li v-for="d in differentials" :key="d">
                <span class="v2-accent">›</span> {{ d }}
              </li>
            </ul>
          </div>
          <aside class="v2-about__side">
            <img src="/avatar.jpg" alt="João Vinicius" class="v2-about__avatar" />
            <div class="v2-about__meta">
              <div class="v2-about__row"><span class="v2-about__key">location</span><span class="v2-about__val">{{ t('location') }}</span></div>
              <div class="v2-about__row"><span class="v2-about__key">email</span><span class="v2-about__val v2-accent">joaovinicius2525@gmail.com</span></div>
              <div class="v2-about__row"><span class="v2-about__key">status</span><span class="v2-about__val"><span class="v2-pulse"></span> {{ t('about.open_to') }}</span></div>
            </div>
            <div class="v2-about__langs">
              <span class="v2-about__key">{{ t('about.languages_title') }}</span>
              <div v-for="lang in languages" :key="lang.name" class="v2-about__lang">
                <span>{{ lang.name }}</span>
                <span class="v2-accent">{{ lang.level }}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <!-- ASK ME (RAG demo) -->
      <section id="ask" class="v2-section v2-ask">
        <div class="v2-section__head">
          <span class="v2-section__num">// 02</span>
          <h2 class="v2-section__title">{{ t('v2.ask.title') }}</h2>
          <p class="v2-section__sub">{{ t('v2.ask.sub') }}</p>
        </div>

        <div class="v2-ask__panel">
          <!-- Pipeline visualization -->
          <div class="v2-pipeline">
            <div class="v2-pipe-node" :class="{ active: pipeStep >= 1 }">
              <div class="v2-pipe-node__icon">?</div>
              <div class="v2-pipe-node__label">query</div>
            </div>
            <div class="v2-pipe-arrow" :class="{ active: pipeStep >= 1 }"></div>
            <div class="v2-pipe-node" :class="{ active: pipeStep >= 2 }">
              <div class="v2-pipe-node__icon">⟁</div>
              <div class="v2-pipe-node__label">embed</div>
            </div>
            <div class="v2-pipe-arrow" :class="{ active: pipeStep >= 2 }"></div>
            <div class="v2-pipe-node" :class="{ active: pipeStep >= 3 }">
              <div class="v2-pipe-node__icon">▦</div>
              <div class="v2-pipe-node__label">vector db</div>
            </div>
            <div class="v2-pipe-arrow" :class="{ active: pipeStep >= 3 }"></div>
            <div class="v2-pipe-node" :class="{ active: pipeStep >= 4 }">
              <div class="v2-pipe-node__icon">✦</div>
              <div class="v2-pipe-node__label">LLM</div>
            </div>
            <div class="v2-pipe-arrow" :class="{ active: pipeStep >= 4 }"></div>
            <div class="v2-pipe-node" :class="{ active: pipeStep >= 5 }">
              <div class="v2-pipe-node__icon">↩</div>
              <div class="v2-pipe-node__label">answer</div>
            </div>
          </div>

          <!-- Question chips -->
          <div class="v2-ask__chips">
            <button
              v-for="(q, i) in askQuestions"
              :key="i"
              class="v2-ask__chip"
              :class="{ active: askIndex === i }"
              :disabled="askLoading"
              @click="runAsk(i)"
            >
              {{ q.q }}
            </button>
          </div>

          <!-- Chunks -->
          <div v-if="askChunks.length" class="v2-chunks">
            <div class="v2-chunks__head">
              <span class="v2-accent">›</span> {{ t('v2.ask.retrieved') }}
              <span class="v2-chunks__count">{{ askChunks.length }} {{ t('v2.ask.chunks') }}</span>
            </div>
            <div class="v2-chunk" v-for="(c, i) in askChunks" :key="i">
              <div class="v2-chunk__meta">
                <span class="v2-chunk__src">{{ c.src }}</span>
                <span class="v2-chunk__score">sim: {{ c.score }}</span>
              </div>
              <p class="v2-chunk__txt">{{ c.text }}</p>
            </div>
          </div>

          <!-- Answer -->
          <div v-if="askAnswer" class="v2-answer">
            <div class="v2-answer__head">
              <span class="v2-answer__avatar">JV</span>
              <span class="v2-answer__model">gpt-4 · streaming</span>
              <span v-if="askLoading" class="v2-answer__typing">●●●</span>
            </div>
            <p class="v2-answer__txt">{{ askAnswer }}<span v-if="askLoading" class="v2-cursor">▌</span></p>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience" class="v2-section v2-exp">
        <div class="v2-section__head">
          <span class="v2-section__num">// 03</span>
          <h2 class="v2-section__title">{{ t('experience.title') }}</h2>
        </div>
        <div class="v2-exp__list">
          <article v-for="(exp, idx) in experiences" :key="exp.id" class="v2-exp-item">
            <div class="v2-exp-item__rail">
              <div class="v2-exp-item__node">
                <div class="v2-exp-item__node-inner"></div>
              </div>
              <div v-if="idx < experiences.length - 1" class="v2-exp-item__line"></div>
            </div>
            <div class="v2-exp-item__body">
              <header class="v2-exp-item__head">
                <div>
                  <div class="v2-exp-item__period">{{ formatDate(exp.startDate) }} → {{ exp.finishDate ? formatDate(exp.finishDate) : t('experience.present') }}</div>
                  <h3 class="v2-exp-item__role">{{ exp.role }}</h3>
                  <p class="v2-exp-item__company">@ {{ exp.company }}</p>
                </div>
              </header>
              <p class="v2-exp-item__desc">{{ exp.description }}</p>
              <div class="v2-exp-item__skills">
                <span v-for="s in exp.skills" :key="s" class="v2-chip">{{ s }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- SKILLS GRAPH -->
      <section id="skills" class="v2-section v2-skills">
        <div class="v2-section__head">
          <span class="v2-section__num">// 04</span>
          <h2 class="v2-section__title">{{ t('skills.title') }}</h2>
          <p class="v2-section__sub">{{ t('v2.skills.sub') }}</p>
        </div>

        <div class="v2-graph-wrap">
          <svg class="v2-graph" :viewBox="`0 0 ${graphSize} ${graphSize}`" @mouseleave="hoverNode = null">
            <!-- Edges -->
            <line
              v-for="(e, i) in graphEdges"
              :key="`e-${i}`"
              :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
              :class="['v2-graph__edge', { active: hoverNode && (hoverNode === e.a || hoverNode === e.b) }]"
            />
            <!-- Category center labels -->
            <g v-for="(c, i) in graphCenters" :key="`c-${i}`">
              <circle :cx="c.x" :cy="c.y" r="6" class="v2-graph__cat-dot" />
              <text :x="c.x" :y="c.y - 14" text-anchor="middle" class="v2-graph__cat-label">{{ c.label }}</text>
            </g>
            <!-- Nodes -->
            <g
              v-for="n in graphNodes"
              :key="n.id"
              class="v2-graph__node"
              :class="{ hovered: hoverNode === n.id }"
              @mouseenter="hoverNode = n.id"
            >
              <circle :cx="n.x" :cy="n.y" :r="hoverNode === n.id ? 8 : 5" class="v2-graph__node-circle" />
              <text :x="n.x" :y="n.y - 12" text-anchor="middle" class="v2-graph__node-label">{{ n.label }}</text>
            </g>
          </svg>

          <div v-if="hoverNode" class="v2-graph__hint">
            <span class="v2-accent">▸</span> {{ hoverNodeLabel }}
          </div>
        </div>

        <!-- Skill chips fallback / list -->
        <div class="v2-skills__list">
          <div v-for="(skillList, cat) in groupedSkills" :key="cat" class="v2-skills__group">
            <div class="v2-skills__group-name">{{ categoryLabel(cat) }}</div>
            <div class="v2-skills__group-tags">
              <span v-for="s in skillList" :key="s.id" class="v2-chip v2-chip--skill" @mouseenter="hoverNode = s.name" @mouseleave="hoverNode = null">{{ s.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="v2-section v2-projects">
        <div class="v2-section__head">
          <span class="v2-section__num">// 05</span>
          <h2 class="v2-section__title">{{ t('projects.title') }}</h2>
        </div>
        <div class="v2-projects__grid">
          <article v-for="proj in projects" :key="proj.id" class="v2-proj">
            <header class="v2-proj__head">
              <h3 class="v2-proj__title">{{ proj.title }}</h3>
              <span v-if="proj.status === 'private'" class="v2-proj__badge">{{ t('projects.private_label') }}</span>
            </header>
            <p class="v2-proj__desc">{{ proj.description }}</p>
            <div class="v2-proj__tech">
              <span v-for="t in proj.technologies" :key="t" class="v2-chip v2-chip--sm">{{ t }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- EDUCATION + CERTS -->
      <section class="v2-section v2-edu">
        <div class="v2-section__head">
          <span class="v2-section__num">// 06</span>
          <h2 class="v2-section__title">{{ t('education.title') }}</h2>
        </div>
        <div class="v2-edu__grid">
          <div>
            <div v-for="edu in education" :key="edu.id" class="v2-edu-item">
              <span class="v2-accent">▸</span>
              <div>
                <p class="v2-edu-item__deg">{{ edu.degree }}</p>
                <p class="v2-edu-item__inst">{{ edu.institution }} · {{ edu.startDate }}–{{ edu.finishDate ?? t('education.ongoing') }}</p>
              </div>
            </div>
          </div>
          <div class="v2-certs">
            <h3 class="v2-certs__title">{{ t('education.certifications_title') }}</h3>
            <div v-for="cert in certifications" :key="cert.id" class="v2-cert">
              <span class="v2-cert__icon">✦</span>
              <div>
                <p class="v2-cert__title">{{ cert.title }}</p>
                <p class="v2-cert__issuer">{{ cert.issuer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="v2-section v2-contact">
        <div class="v2-section__head">
          <span class="v2-section__num">// 07</span>
          <h2 class="v2-section__title">{{ t('contact.title') }}</h2>
        </div>
        <p class="v2-contact__sub">{{ t('contact.subtitle') }}</p>
        <a href="mailto:joaovinicius2525@gmail.com" class="v2-contact__email">joaovinicius2525@gmail.com</a>
        <div class="v2-contact__row">
          <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="v2-contact__btn"><GithubIcon /> GitHub</a>
          <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="v2-contact__btn"><LinkedinIcon /> LinkedIn</a>
          <button type="button" @click="downloadCv" class="v2-contact__btn">↓ {{ t('download_cv') }}</button>
        </div>
        <footer class="v2-footer">
          <span>{{ t('contact.footer') }} · neural-lab</span>
          <span class="v2-footer__sig">© {{ year }} João Vinicius</span>
        </footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'
import { useCvPdf } from '@/composables/useCvPdf'
import { toggleLocale } from '@/plugins/i18n'
import GithubIcon from '@/components/icons/Github.vue'
import LinkedinIcon from '@/components/icons/Linkedin.vue'

const { t, currentLocale, experiences, groupedSkills, projects, education, certifications, differentials, languages, formatDate, categoryLabel } = usePortfolio()
const { downloadCv } = useCvPdf()

const sections = [
  { id: 'about' },
  { id: 'experience' },
  { id: 'skills' },
  { id: 'projects' },
  { id: 'contact' }
]

const activeIdx = ref(-1)
const year = new Date().getFullYear()

// ─── Embedding sample (decorative) ─────────────────────────────────
const embedSample = computed(() => {
  return Array.from({ length: 6 }, (_, i) => {
    const seed = (i * 73 + 41) % 199
    const v = (seed / 100 - 1).toFixed(3)
    return { i, v: (Number(v) >= 0 ? '+' : '') + v }
  })
})

// ─── Orb particles ─────────────────────────────────────────────────
const orbParticles = computed(() =>
  Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const distance = 110 + (i % 3) * 18
    return {
      transform: `rotate(${angle}rad) translateX(${distance}px)`,
      animationDelay: `${i * 0.4}s`,
      animationDuration: `${6 + (i % 4)}s`
    }
  })
)

// ─── Neural canvas ─────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement>()
let rafId: number | null = null
let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
let signals: { from: number; to: number; t: number; speed: number }[] = []

function setupCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  const resize = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
  }
  resize()
  window.addEventListener('resize', resize)

  const count = window.innerWidth < 768 ? 22 : 38
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.18 * dpr,
    vy: (Math.random() - 0.5) * 0.18 * dpr,
    r: (1 + Math.random() * 1.5) * dpr
  }))

  const ctx = canvas.getContext('2d')!
  const maxDist = 180 * dpr

  function spawnSignal() {
    if (nodes.length < 2) return
    const a = Math.floor(Math.random() * nodes.length)
    let b = Math.floor(Math.random() * nodes.length)
    if (a === b) b = (b + 1) % nodes.length
    const dx = nodes[a].x - nodes[b].x
    const dy = nodes[a].y - nodes[b].y
    if (Math.hypot(dx, dy) < maxDist) {
      signals.push({ from: a, to: b, t: 0, speed: 0.012 + Math.random() * 0.012 })
    }
  }
  const signalInterval = setInterval(spawnSignal, 320)

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update nodes
    for (const n of nodes) {
      n.x += n.vx
      n.y += n.vy
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1
    }

    // Edges
    ctx.lineWidth = 0.6 * dpr
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < maxDist) {
          const op = (1 - dist / maxDist) * 0.16
          ctx.strokeStyle = `rgba(124, 92, 255, ${op})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    // Nodes
    for (const n of nodes) {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(183, 148, 246, 0.6)'
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Signals
    signals = signals.filter(s => s.t < 1)
    for (const s of signals) {
      s.t += s.speed
      const a = nodes[s.from], b = nodes[s.to]
      if (!a || !b) continue
      const x = a.x + (b.x - a.x) * s.t
      const y = a.y + (b.y - a.y) * s.t
      ctx.beginPath()
      ctx.fillStyle = `rgba(34, 211, 238, ${1 - s.t})`
      ctx.shadowColor = '#22d3ee'
      ctx.shadowBlur = 8 * dpr
      ctx.arc(x, y, 2.4 * dpr, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    rafId = requestAnimationFrame(frame)
  }
  frame()

  return () => {
    window.removeEventListener('resize', resize)
    clearInterval(signalInterval)
  }
}

// ─── RAG demo ──────────────────────────────────────────────────────
interface AskItem {
  q: string
  chunks: { src: string; score: string; text: string }[]
  answer: string
}

const askQuestions = computed<AskItem[]>(() => [
  {
    q: t('v2.ask.q1'),
    chunks: [
      { src: 'experience.json#fictor', score: '0.91', text: t('v2.ask.q1_chunk1') },
      { src: 'projects.json#hr-platform', score: '0.86', text: t('v2.ask.q1_chunk2') }
    ],
    answer: t('v2.ask.q1_answer')
  },
  {
    q: t('v2.ask.q2'),
    chunks: [
      { src: 'projects.json#fictor360-ai', score: '0.94', text: t('v2.ask.q2_chunk1') },
      { src: 'skills.json#data-ai', score: '0.83', text: t('v2.ask.q2_chunk2') }
    ],
    answer: t('v2.ask.q2_answer')
  },
  {
    q: t('v2.ask.q3'),
    chunks: [
      { src: 'experience.json#atalaia', score: '0.88', text: t('v2.ask.q3_chunk1') },
      { src: 'skills.json#data', score: '0.79', text: t('v2.ask.q3_chunk2') }
    ],
    answer: t('v2.ask.q3_answer')
  }
])

const askIndex = ref<number | null>(null)
const askLoading = ref(false)
const askChunks = ref<AskItem['chunks']>([])
const askAnswer = ref('')
const pipeStep = ref(0)
let typingTimer: ReturnType<typeof setTimeout> | null = null

async function runAsk(idx: number) {
  if (askLoading.value) return
  askIndex.value = idx
  askLoading.value = true
  askChunks.value = []
  askAnswer.value = ''
  pipeStep.value = 0

  const item = askQuestions.value[idx]

  // Simulate pipeline
  pipeStep.value = 1
  await delay(280)
  pipeStep.value = 2
  await delay(360)
  pipeStep.value = 3
  await delay(420)
  askChunks.value = item.chunks
  pipeStep.value = 4
  await delay(380)

  // Stream answer
  pipeStep.value = 5
  const text = item.answer
  for (let i = 0; i <= text.length; i++) {
    askAnswer.value = text.slice(0, i)
    await delay(14)
  }
  askLoading.value = false
}

function delay(ms: number) {
  return new Promise<void>(resolve => {
    typingTimer = setTimeout(() => resolve(), ms)
  })
}

// ─── Skills graph (radial layout) ─────────────────────────────────
const graphSize = 720
const graphCenter = graphSize / 2

interface GraphNode { id: string; label: string; cat: string; x: number; y: number }
interface GraphEdge { a: string; b: string; x1: number; y1: number; x2: number; y2: number }

const allSkills = computed(() => {
  const list: { name: string; cat: string }[] = []
  for (const cat in groupedSkills.value) {
    for (const s of groupedSkills.value[cat]) {
      list.push({ name: s.name, cat })
    }
  }
  return list
})

const categoryOrder = ['frontend', 'backend', 'mobile', 'data-ai', 'devops']

const graphCenters = computed(() => {
  const cats = categoryOrder.filter(c => groupedSkills.value[c]?.length)
  return cats.map((c, i) => {
    const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2
    const r = 130
    return {
      cat: c,
      label: categoryLabel(c).toUpperCase(),
      x: graphCenter + Math.cos(angle) * r,
      y: graphCenter + Math.sin(angle) * r
    }
  })
})

const graphNodes = computed<GraphNode[]>(() => {
  const out: GraphNode[] = []
  const centers = graphCenters.value
  for (const center of centers) {
    const skillsInCat = allSkills.value.filter(s => s.cat === center.cat)
    const ringR = 105
    skillsInCat.forEach((s, i) => {
      const angle = (i / skillsInCat.length) * Math.PI * 2 + (center.x + center.y) * 0.005
      out.push({
        id: s.name,
        label: s.name,
        cat: s.cat,
        x: center.x + Math.cos(angle) * ringR,
        y: center.y + Math.sin(angle) * ringR
      })
    })
  }
  return out
})

const graphEdges = computed<GraphEdge[]>(() => {
  const edges: GraphEdge[] = []
  const centers = graphCenters.value
  const nodesByCat = new Map<string, GraphNode[]>()
  for (const n of graphNodes.value) {
    if (!nodesByCat.has(n.cat)) nodesByCat.set(n.cat, [])
    nodesByCat.get(n.cat)!.push(n)
  }
  // Center-to-node
  for (const center of centers) {
    const list = nodesByCat.get(center.cat) || []
    for (const n of list) {
      edges.push({ a: n.id, b: `cat-${center.cat}`, x1: center.x, y1: center.y, x2: n.x, y2: n.y })
    }
  }
  return edges
})

const hoverNode = ref<string | null>(null)
const hoverNodeLabel = computed(() => {
  if (!hoverNode.value) return ''
  const n = graphNodes.value.find(x => x.id === hoverNode.value)
  if (!n) return hoverNode.value
  return `${n.label} — ${categoryLabel(n.cat)}`
})

// ─── Active section observer ──────────────────────────────────────
let observer: IntersectionObserver | null = null
let cleanupCanvas: (() => void) | undefined

onMounted(() => {
  cleanupCanvas = setupCanvas() ?? undefined

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const idx = sections.findIndex(s => s.id === entry.target.id)
        if (idx !== -1) activeIdx.value = idx
      }
    },
    { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
  )
  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (typingTimer) clearTimeout(typingTimer)
  observer?.disconnect()
  cleanupCanvas?.()
})
</script>

<style lang="scss" scoped>
.v2 {
  background: $v2-bg;
  color: $v2-secondary;
  font-family: $v2-font;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.v2-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
}

// ─── Top ─────────────────────────────────────────────────────────────
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
.v2-status { display: flex; align-items: center; gap: 6px; font-family: $v2-mono; font-size: 11px; color: $v2-muted;
  @media (max-width: $mobile) { display: none; }
}
.v2-status__dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; animation: pulse2 2s infinite; }
@keyframes pulse2 { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
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

// ─── Main / Sections ────────────────────────────────────────────────
.v2-main { position: relative; z-index: 2; padding-top: 60px; }

.v2-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 60px;

  @media (max-width: $mobile) { padding: 70px 20px; }
}

.v2-section__head {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.v2-section__num {
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-accent;
  letter-spacing: 0.08em;
}
.v2-section__title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: $v2-secondary;
  background: linear-gradient(90deg, $v2-secondary 0%, $v2-glow 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.v2-section__sub {
  font-size: 14px;
  color: $v2-muted;
  max-width: 560px;
  line-height: 1.6;
}
.v2-accent { color: $v2-accent; }

// ─── Hero ────────────────────────────────────────────────────────────
.v2-hero {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  min-height: calc(100vh - 60px);
  align-items: center;
  padding-top: 60px;

  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.v2-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid $v2-border;
  background: rgba($v2-primary, 0.06);
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-primary;
  letter-spacing: 0.06em;
  margin-bottom: 28px;
}
.v2-tag__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $v2-accent;
  box-shadow: 0 0 10px $v2-accent;
  animation: pulse2 2s infinite;
}
.v2-hero__name {
  font-size: clamp(56px, 9vw, 110px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
}
.v2-hero__name-line {
  display: block;
  &--accent {
    background: linear-gradient(120deg, $v2-primary 0%, $v2-accent 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
.v2-cursor {
  display: inline-block;
  color: $v2-accent;
  animation: blink 1.1s step-end infinite;
  margin-left: 4px;
}
@keyframes blink { 50% { opacity: 0; } }

.v2-hero__role {
  font-size: clamp(16px, 2vw, 22px);
  color: $v2-muted;
  margin-bottom: 18px;
}
.v2-divider { color: $v2-dim; margin: 0 6px; }
.v2-hero__tag {
  font-size: 15px;
  color: rgba($v2-secondary, 0.72);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 28px;
}

.v2-hero__embed {
  border: 1px dashed $v2-border;
  padding: 14px 18px;
  background: rgba($v2-surface, 0.4);
  margin-bottom: 32px;
  max-width: 540px;
}
.v2-hero__embed-label {
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
.v2-hero__embed-vector {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-family: $v2-mono;
  font-size: 13px;
}
.v2-embed-num { color: $v2-glow; }
.v2-embed-num--dim { color: $v2-dim; }

.v2-hero__cta { display: flex; gap: 14px; flex-wrap: wrap; }
.v2-btn {
  font-family: $v2-mono;
  font-size: 12px;
  letter-spacing: 0.06em;
  padding: 12px 22px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all $transition-base;
  border: 1px solid;
  text-transform: uppercase;
  &--primary {
    background: $v2-primary;
    border-color: $v2-primary;
    color: $v2-bg;
    &:hover { background: transparent; color: $v2-primary; }
  }
  &--ghost {
    background: transparent;
    border-color: $v2-border;
    color: $v2-secondary;
    &:hover { border-color: $v2-accent; color: $v2-accent; }
  }
}

.v2-hero__right { display: flex; flex-direction: column; align-items: center; gap: 32px; }
.v2-orb {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v2-orb__core {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, $v2-glow, $v2-primary);
  box-shadow: 0 0 60px rgba($v2-primary, 0.6), 0 0 120px rgba($v2-glow, 0.3);
  position: relative;
  z-index: 2;
  animation: orbPulse 3s infinite ease-in-out;
}
@keyframes orbPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 60px rgba($v2-primary, 0.6), 0 0 120px rgba($v2-glow, 0.3); }
  50% { transform: scale(1.08); box-shadow: 0 0 80px rgba($v2-primary, 0.8), 0 0 160px rgba($v2-glow, 0.4); }
}
.v2-orb__ring {
  position: absolute;
  border: 1px solid rgba($v2-primary, 0.2);
  border-radius: 50%;
  &--1 { width: 140px; height: 140px; animation: spinSlow 12s linear infinite; }
  &--2 { width: 200px; height: 200px; animation: spinSlow 18s linear reverse infinite; border-color: rgba($v2-accent, 0.18); }
  &--3 { width: 260px; height: 260px; animation: spinSlow 24s linear infinite; border-color: rgba($v2-glow, 0.12); }
}
@keyframes spinSlow { to { transform: rotate(360deg); } }
.v2-orb__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $v2-accent;
  box-shadow: 0 0 8px $v2-accent;
  animation: particleFloat var(--dur, 6s) infinite ease-in-out;
}
@keyframes particleFloat {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.v2-hero__metrics {
  display: flex;
  gap: 24px;
}
.v2-metric { text-align: center; }
.v2-metric__num { display: block; font-size: 28px; font-weight: 700; color: $v2-secondary; line-height: 1; }
.v2-metric__lbl { display: block; font-family: $v2-mono; font-size: 10px; color: $v2-muted; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 6px; }

// ─── About ──────────────────────────────────────────────────────────
.v2-about__grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.v2-about__lead { font-size: 17px; line-height: 1.8; color: $v2-secondary; margin-bottom: 18px; }
.v2-about__body { font-size: 15px; line-height: 1.8; color: rgba($v2-secondary, 0.75); margin-bottom: 24px; }
.v2-about__diff {
  display: flex;
  flex-direction: column;
  gap: 8px;
  li { font-size: 14px; color: $v2-muted; display: flex; gap: 10px; }
}
.v2-about__side {
  background: rgba($v2-surface, 0.5);
  border: 1px solid $v2-border;
  border-radius: 8px;
  padding: 24px;
  backdrop-filter: blur(8px);
}
.v2-about__avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid $v2-primary;
  margin-bottom: 18px;
  box-shadow: 0 0 24px rgba($v2-primary, 0.3);
}
.v2-about__meta { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid $v2-border; }
.v2-about__row { display: flex; flex-direction: column; gap: 2px; }
.v2-about__key { font-family: $v2-mono; font-size: 10px; color: $v2-muted; text-transform: uppercase; letter-spacing: 0.08em; }
.v2-about__val { font-size: 13px; color: $v2-secondary; display: flex; align-items: center; gap: 8px; }
.v2-pulse {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse2 2s infinite;
}
.v2-about__langs { display: flex; flex-direction: column; gap: 6px; }
.v2-about__lang { display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0; }

// ─── Ask (RAG) ──────────────────────────────────────────────────────
.v2-ask__panel {
  background: rgba($v2-surface, 0.6);
  border: 1px solid $v2-border;
  padding: 32px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.v2-pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.v2-pipe-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.4;
  transition: all 0.4s ease;
  &.active {
    opacity: 1;
    .v2-pipe-node__icon {
      border-color: $v2-accent;
      color: $v2-accent;
      box-shadow: 0 0 16px rgba($v2-accent, 0.4);
    }
  }
}
.v2-pipe-node__icon {
  width: 42px;
  height: 42px;
  border: 1px solid $v2-border;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: $v2-muted;
  background: rgba($v2-bg, 0.6);
  transition: all 0.4s ease;
}
.v2-pipe-node__label {
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.v2-pipe-arrow {
  width: 28px;
  height: 1px;
  background: $v2-border;
  transition: background 0.4s ease;
  &.active { background: $v2-accent; box-shadow: 0 0 8px rgba($v2-accent, 0.4); }
}

.v2-ask__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.v2-ask__chip {
  font-family: $v2-mono;
  font-size: 12px;
  padding: 10px 16px;
  border: 1px solid $v2-border;
  background: transparent;
  color: $v2-secondary;
  cursor: pointer;
  transition: all $transition-base;
  text-align: left;
  &:hover:not(:disabled) {
    border-color: $v2-primary;
    color: $v2-primary;
    background: rgba($v2-primary, 0.06);
  }
  &.active {
    border-color: $v2-accent;
    color: $v2-accent;
    background: rgba($v2-accent, 0.08);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.v2-chunks {
  border: 1px dashed $v2-border;
  padding: 16px;
  margin-bottom: 24px;
  background: rgba($v2-bg, 0.4);
}
.v2-chunks__head {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v2-chunks__count { color: $v2-accent; margin-left: auto; }
.v2-chunk { padding: 12px 0; border-top: 1px solid $v2-border; &:first-of-type { border-top: none; padding-top: 0; } }
.v2-chunk__meta { display: flex; justify-content: space-between; margin-bottom: 6px; font-family: $v2-mono; font-size: 10px; color: $v2-muted; }
.v2-chunk__src { color: $v2-glow; }
.v2-chunk__score { color: $v2-accent; }
.v2-chunk__txt { font-size: 13px; line-height: 1.6; color: rgba($v2-secondary, 0.75); }

.v2-answer {
  background: linear-gradient(135deg, rgba($v2-primary, 0.05), rgba($v2-accent, 0.05));
  border: 1px solid rgba($v2-primary, 0.2);
  padding: 20px;
  border-radius: 6px;
}
.v2-answer__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $v2-border;
}
.v2-answer__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, $v2-primary, $v2-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: $v2-bg;
}
.v2-answer__model { font-family: $v2-mono; font-size: 11px; color: $v2-muted; }
.v2-answer__typing { font-family: $v2-mono; font-size: 12px; color: $v2-accent; margin-left: auto; animation: pulse2 1s infinite; }
.v2-answer__txt { font-size: 14px; line-height: 1.75; color: $v2-secondary; }

// ─── Experience ─────────────────────────────────────────────────────
.v2-exp__list { display: flex; flex-direction: column; }
.v2-exp-item { display: grid; grid-template-columns: 32px 1fr; gap: 24px; padding-bottom: 36px; }
.v2-exp-item__rail { display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
.v2-exp-item__node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid $v2-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $v2-bg;
  box-shadow: 0 0 14px rgba($v2-primary, 0.4);
}
.v2-exp-item__node-inner { width: 4px; height: 4px; border-radius: 50%; background: $v2-accent; }
.v2-exp-item__line { flex: 1; width: 1px; background: linear-gradient(to bottom, $v2-primary, transparent); margin-top: 8px; min-height: 60px; }
.v2-exp-item__body {
  background: rgba($v2-surface, 0.5);
  border: 1px solid $v2-border;
  padding: 22px 26px;
  backdrop-filter: blur(8px);
  transition: all $transition-base;
  &:hover { border-color: rgba($v2-primary, 0.4); transform: translateX(4px); }
}
.v2-exp-item__period { font-family: $v2-mono; font-size: 11px; color: $v2-accent; margin-bottom: 6px; letter-spacing: 0.04em; }
.v2-exp-item__role { font-size: 18px; font-weight: 700; color: $v2-secondary; margin-bottom: 4px; }
.v2-exp-item__company { font-size: 13px; color: $v2-glow; margin-bottom: 14px; font-family: $v2-mono; }
.v2-exp-item__desc { font-size: 14px; line-height: 1.75; color: rgba($v2-secondary, 0.72); margin-bottom: 16px; }
.v2-exp-item__skills { display: flex; flex-wrap: wrap; gap: 6px; }

.v2-chip {
  font-family: $v2-mono;
  font-size: 11px;
  padding: 4px 10px;
  border: 1px solid $v2-border;
  color: $v2-muted;
  background: rgba($v2-bg, 0.4);
  &--sm { font-size: 10px; padding: 3px 8px; }
  &--skill { cursor: pointer; transition: all $transition-fast; &:hover { border-color: $v2-accent; color: $v2-accent; } }
}

// ─── Skills graph ───────────────────────────────────────────────────
.v2-graph-wrap {
  position: relative;
  margin-bottom: 40px;
  border: 1px solid $v2-border;
  background: rgba($v2-surface, 0.4);
  padding: 12px;

  @media (max-width: $mobile) { display: none; }
}
.v2-graph { width: 100%; height: auto; display: block; }
.v2-graph__edge {
  stroke: rgba(124, 92, 255, 0.18);
  stroke-width: 0.8;
  transition: stroke 0.2s, stroke-width 0.2s;
  &.active { stroke: $v2-accent; stroke-width: 1.6; }
}
.v2-graph__cat-dot { fill: $v2-glow; opacity: 0.8; }
.v2-graph__cat-label {
  fill: $v2-glow;
  font-family: $v2-mono;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 700;
}
.v2-graph__node { cursor: pointer; }
.v2-graph__node-circle {
  fill: $v2-primary;
  transition: all 0.2s;
  filter: drop-shadow(0 0 4px rgba($v2-primary, 0.5));
}
.v2-graph__node.hovered .v2-graph__node-circle { fill: $v2-accent; filter: drop-shadow(0 0 12px rgba($v2-accent, 0.8)); }
.v2-graph__node-label {
  fill: $v2-secondary;
  font-family: $v2-mono;
  font-size: 9px;
  opacity: 0;
  transition: opacity 0.2s;
}
.v2-graph__node.hovered .v2-graph__node-label { opacity: 1; }
.v2-graph__hint {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-accent;
  background: rgba($v2-bg, 0.8);
  padding: 6px 12px;
  border: 1px solid $v2-border;
}
.v2-skills__list { display: flex; flex-direction: column; gap: 24px; }
.v2-skills__group {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: start;
  @media (max-width: $mobile) { grid-template-columns: 1fr; gap: 8px; }
}
.v2-skills__group-name {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-glow;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: 6px;
}
.v2-skills__group-tags { display: flex; flex-wrap: wrap; gap: 8px; }

// ─── Projects ───────────────────────────────────────────────────────
.v2-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.v2-proj {
  border: 1px solid $v2-border;
  background: rgba($v2-surface, 0.5);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all $transition-base;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, $v2-primary, $v2-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  &:hover {
    border-color: rgba($v2-accent, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
    &::before { transform: scaleX(1); }
  }
}
.v2-proj__head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.v2-proj__title { font-size: 16px; font-weight: 700; color: $v2-secondary; }
.v2-proj__badge {
  font-family: $v2-mono;
  font-size: 9px;
  padding: 3px 8px;
  background: rgba($v2-accent, 0.1);
  color: $v2-accent;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.v2-proj__desc { font-size: 13px; line-height: 1.7; color: rgba($v2-secondary, 0.7); flex: 1; }
.v2-proj__tech { display: flex; flex-wrap: wrap; gap: 6px; }

// ─── Education ──────────────────────────────────────────────────────
.v2-edu__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.v2-edu-item { display: flex; gap: 12px; padding: 12px 0; }
.v2-edu-item__deg { font-size: 14px; font-weight: 600; color: $v2-secondary; margin-bottom: 4px; }
.v2-edu-item__inst { font-size: 12px; color: $v2-muted; font-family: $v2-mono; }
.v2-certs__title { font-family: $v2-mono; font-size: 12px; color: $v2-glow; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
.v2-cert { display: flex; gap: 10px; padding: 10px 0; align-items: flex-start; border-top: 1px solid $v2-border; &:first-of-type { border-top: none; } }
.v2-cert__icon { color: $v2-accent; font-size: 14px; line-height: 1.3; }
.v2-cert__title { font-size: 13px; color: $v2-secondary; margin-bottom: 2px; }
.v2-cert__issuer { font-size: 11px; color: $v2-muted; font-family: $v2-mono; }

// ─── Contact ────────────────────────────────────────────────────────
.v2-contact__sub { font-size: clamp(20px, 3vw, 28px); color: rgba($v2-secondary, 0.55); margin-bottom: 24px; }
.v2-contact__email {
  display: inline-block;
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 700;
  background: linear-gradient(120deg, $v2-primary, $v2-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 28px;
  border-bottom: 1px solid $v2-border;
  padding-bottom: 6px;
}
.v2-contact__row { display: flex; gap: 14px; flex-wrap: wrap; }
.v2-contact__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: $v2-mono;
  font-size: 13px;
  padding: 12px 22px;
  border: 1px solid $v2-border;
  color: $v2-secondary;
  transition: all $transition-base;
  &:hover { border-color: $v2-primary; color: $v2-primary; }
  :deep(svg) { width: 16px; height: 16px; fill: currentColor; }
}
.v2-footer {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid $v2-border;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
  flex-wrap: wrap;
  gap: 12px;
}
.v2-footer__sig { color: $v2-muted; }
</style>
