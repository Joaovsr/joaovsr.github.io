<template>
  <section id="hero" class="section hero">
    <div class="hero__left">
      <div class="tag">
        <span class="tag__dot"></span> {{ t('hero.tag') }}
      </div>
      <h1 class="hero__name">
        <span class="hero__name-line">{{ firstName }}</span>
        <span class="hero__name-line hero__name-line--accent">
          {{ lastName }}<span class="cursor">_</span>
        </span>
      </h1>
      <p class="hero__role">
        <span class="accent">{{ profile.role }}</span> <span class="divider">·</span>
        <span class="accent">{{ profile.roleSub }}</span>
      </p>
      <p class="hero__tag">{{ profile.tagline }}</p>

      <div class="hero__embed">
        <div class="hero__embed-label">{{ t('hero.embed_label') }}</div>
        <div class="hero__embed-vector">
          <span v-for="n in embedSample" :key="n.i" class="embed-num">{{ n.v }}</span>
          <span class="embed-num embed-num--dim">…dim 1536</span>
        </div>
      </div>

      <div class="hero__cta">
        <button type="button" @click="downloadCv" class="btn btn--primary">
          {{ t('download_cv') }} <span>↓</span>
        </button>
        <a href="#ask" class="btn btn--ghost">
          {{ t('hero.ask_cta') }} <span>→</span>
        </a>
      </div>
    </div>

    <div class="hero__right">
      <div class="orb">
        <div class="orb__core"></div>
        <div class="orb__ring orb__ring--1"></div>
        <div class="orb__ring orb__ring--2"></div>
        <div class="orb__ring orb__ring--3"></div>
        <span v-for="(p, i) in orbParticles" :key="i" class="orb__particle" :style="p" />
      </div>
      <div class="hero__metrics">
        <div class="metric">
          <span class="metric__num">{{ years }}</span>
          <span class="metric__lbl">{{ t('hero.metric_years') }}</span>
        </div>
        <div class="metric">
          <span class="metric__num">{{ projectCount }}+</span>
          <span class="metric__lbl">{{ t('hero.metric_projects') }}</span>
        </div>
        <div class="metric">
          <span class="metric__num">{{ certifications.length }}</span>
          <span class="metric__lbl">{{ t('hero.metric_certs') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { certifications } from '@/data/education'
import { yearsOfExperience } from '@/utils/portfolio'
import { useCvPdf } from '@/composables/useCvPdf'
import type { PortfolioProfile } from '@/api/content'

const { t } = useI18n()
const props = defineProps<{ profile: PortfolioProfile; projectCount: number }>()
const { downloadCv } = useCvPdf(props.profile)

const years = computed(() => yearsOfExperience(props.profile.careerStart))
const firstName = computed(() => props.profile.nameShort.split(' ')[0] ?? props.profile.nameShort)
const lastName = computed(() => props.profile.nameShort.split(' ').slice(1).join(' ') || '')

const embedSample = computed(() =>
  Array.from({ length: 6 }, (_, i) => {
    const seed = (i * 73 + 41) % 199
    const v = (seed / 100 - 1).toFixed(3)
    return { i, v: (Number(v) >= 0 ? '+' : '') + v }
  })
)

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
</script>

<style lang="scss" scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  min-height: calc(100vh - 60px);
  align-items: center;
  padding-top: 60px;

  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid $border;
  background: rgba($primary, 0.06);
  font-family: $mono;
  font-size: 11px;
  color: $primary;
  letter-spacing: 0.06em;
  margin-bottom: 28px;
}
.tag__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $accent;
  box-shadow: 0 0 10px $accent;
  animation: pulse 2s infinite;
}
.hero__name {
  font-size: clamp(56px, 9vw, 110px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
}
.hero__name-line {
  display: block;
  &--accent {
    background: linear-gradient(120deg, $primary 0%, $accent 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.hero__role {
  font-size: clamp(16px, 2vw, 22px);
  color: $muted;
  margin-bottom: 18px;
}
.hero__tag {
  font-size: 15px;
  color: rgba($secondary, 0.72);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 28px;
}

.hero__embed {
  border: 1px dashed $border;
  padding: 14px 18px;
  background: rgba($surface, 0.4);
  margin-bottom: 32px;
  max-width: 540px;
}
.hero__embed-label {
  font-family: $mono;
  font-size: 10px;
  color: $muted;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
.hero__embed-vector {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-family: $mono;
  font-size: 13px;
}
.embed-num { color: $glow; }
.embed-num--dim { color: $dim; }

.hero__cta { display: flex; gap: 14px; flex-wrap: wrap; }

.hero__right { display: flex; flex-direction: column; align-items: center; gap: 32px; }
.orb {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orb__core {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, $glow, $primary);
  box-shadow: 0 0 60px rgba($primary, 0.6), 0 0 120px rgba($glow, 0.3);
  position: relative;
  z-index: 2;
  animation: orbPulse 3s infinite ease-in-out;
}
.orb__ring {
  position: absolute;
  border: 1px solid rgba($primary, 0.2);
  border-radius: 50%;
  &--1 { width: 140px; height: 140px; animation: spinSlow 12s linear infinite; }
  &--2 { width: 200px; height: 200px; animation: spinSlow 18s linear reverse infinite; border-color: rgba($accent, 0.18); }
  &--3 { width: 260px; height: 260px; animation: spinSlow 24s linear infinite; border-color: rgba($glow, 0.12); }
}
.orb__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $accent;
  box-shadow: 0 0 8px $accent;
  animation: particleFloat var(--dur, 6s) infinite ease-in-out;
}

.hero__metrics {
  display: flex;
  gap: 24px;
}
.metric { text-align: center; }
.metric__num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: $secondary;
  line-height: 1;
}
.metric__lbl {
  display: block;
  font-family: $mono;
  font-size: 10px;
  color: $muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 6px;
}
</style>
