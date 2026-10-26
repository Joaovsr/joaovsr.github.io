<template>
  <section id="hero" ref="heroRef" class="section hero" :class="{ 'hero--paused': !motionActive }" aria-labelledby="hero-title">
    <NeuralBackground :active="motionActive" />
    <div class="hero__left">
      <div class="tag">
        <span class="tag__dot" aria-hidden="true"></span> {{ t('hero.tag') }}
      </div>
      <h1 id="hero-title" class="hero__name">
        <span class="hero__name-line">{{ firstName }}</span>
        <span class="hero__name-line hero__name-line--accent">
          {{ lastName }}<span class="cursor" aria-hidden="true">_</span>
        </span>
      </h1>
      <p class="hero__role">
        <span class="accent">{{ t('role') }}</span> <span class="divider">·</span>
        <span class="accent">{{ t('role_sub') }}</span>
      </p>
      <p class="hero__tag">{{ t('tagline') }}</p>

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
        <a href="#projects" class="btn btn--ghost">
          {{ t('hero.projects_cta') }} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <div class="hero__right">
      <div ref="orbRef" class="orb" aria-hidden="true">
        <ThreeOrb :active="motionActive" :pointer="pointer" :progress="progress" />
      </div>
      <div class="hero__metrics">
        <div class="metric">
          <span class="metric__num">{{ years }}</span>
          <span class="metric__lbl">{{ t('hero.metric_years') }}</span>
        </div>
        <div class="metric">
          <span class="metric__num">{{ projects.length }}+</span>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { certifications } from '@/data/education'
import { yearsOfExperience } from '@/utils/portfolio'
import { useCvPdf } from '@/composables/useCvPdf'
import { useHeroMotion } from '@/composables/useHeroMotion'
import NeuralBackground from '@/components/NeuralBackground.vue'
import ThreeOrb from '@/components/ThreeOrb.vue'

const { t } = useI18n()
const { downloadCv } = useCvPdf()
const heroRef = ref<HTMLElement>()
const orbRef = ref<HTMLElement>()
const { active: motionActive, pointer, progress } = useHeroMotion(heroRef, orbRef)

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

</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 60px;
  min-height: calc(100svh - 76px);
  align-items: center;
  padding-top: 60px;

  @media (max-width: $tablet) { grid-template-columns: minmax(0, 1fr) 280px; gap: 28px; }
  @media (max-width: $mobile) { grid-template-columns: minmax(0, 1fr); min-height: auto; gap: 36px; padding-top: 40px; }
}
.hero__left, .hero__right { position: relative; z-index: 1; }
.hero--paused :deep(*) { animation-play-state: paused !important; }
@media (prefers-reduced-motion: no-preference) {
  .hero__left > * { animation: hero-enter .6s both; }
  .hero__left > :nth-child(2) { animation-delay: .06s; }
  .hero__left > :nth-child(3) { animation-delay: .12s; }
  .hero__left > :nth-child(4) { animation-delay: .18s; }
  .hero__left > :nth-child(5) { animation-delay: .24s; }
  .hero__left > :nth-child(6) { animation-delay: .3s; }
  .hero__right { animation: hero-enter .8s .18s both; }
}
@keyframes hero-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
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
  width: 380px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(var(--orb-x, 0px), var(--orb-y, 0px));
  transition: transform .6s cubic-bezier(.22, 1, .36, 1);
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
@media (max-width: $tablet) { .orb { width: 280px; height: 280px; } }
@media (max-width: $mobile) {
  .orb { width: 240px; height: 240px; }
  .hero__right { gap: 20px; }
}
</style>
