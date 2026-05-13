<template>
  <section id="hero" class="v2-section v2-hero">
    <div class="v2-hero__left">
      <div class="v2-tag">
        <span class="v2-tag__dot"></span> {{ t('v2.hero.tag') }}
      </div>
      <h1 class="v2-hero__name">
        <span class="v2-hero__name-line">{{ firstName }}</span>
        <span class="v2-hero__name-line v2-hero__name-line--accent">
          {{ lastName }}<span class="v2-cursor">_</span>
        </span>
      </h1>
      <p class="v2-hero__role">
        {{ t('role') }} <span class="v2-divider">·</span>
        <span class="v2-accent">{{ t('role_sub') }}</span>
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
        <div class="v2-metric">
          <span class="v2-metric__num">{{ years }}</span>
          <span class="v2-metric__lbl">{{ t('v2.hero.metric_years') }}</span>
        </div>
        <div class="v2-metric">
          <span class="v2-metric__num">{{ projects.length }}+</span>
          <span class="v2-metric__lbl">{{ t('v2.hero.metric_projects') }}</span>
        </div>
        <div class="v2-metric">
          <span class="v2-metric__num">{{ certifications.length }}</span>
          <span class="v2-metric__lbl">{{ t('v2.hero.metric_certs') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { certifications } from '@/data/education'
import { yearsOfExperience } from '@/utils/portfolio'
import { useCvPdf } from '@/composables/useCvPdf'

const { t } = useI18n()
const { downloadCv } = useCvPdf()

const years = yearsOfExperience(profile.careerStart)
const firstName = computed(() => profile.nameShort.split(' ')[0] ?? profile.nameShort)
const lastName = computed(() => profile.nameShort.split(' ').slice(1).join(' ') || '')

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

.v2-hero__role {
  font-size: clamp(16px, 2vw, 22px);
  color: $v2-muted;
  margin-bottom: 18px;
}
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
.v2-orb__ring {
  position: absolute;
  border: 1px solid rgba($v2-primary, 0.2);
  border-radius: 50%;
  &--1 { width: 140px; height: 140px; animation: spinSlow 12s linear infinite; }
  &--2 { width: 200px; height: 200px; animation: spinSlow 18s linear reverse infinite; border-color: rgba($v2-accent, 0.18); }
  &--3 { width: 260px; height: 260px; animation: spinSlow 24s linear infinite; border-color: rgba($v2-glow, 0.12); }
}
.v2-orb__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $v2-accent;
  box-shadow: 0 0 8px $v2-accent;
  animation: particleFloat var(--dur, 6s) infinite ease-in-out;
}

.v2-hero__metrics {
  display: flex;
  gap: 24px;
}
.v2-metric { text-align: center; }
.v2-metric__num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: $v2-secondary;
  line-height: 1;
}
.v2-metric__lbl {
  display: block;
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 6px;
}
</style>
