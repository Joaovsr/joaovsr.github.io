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
        <a href="#ask" class="btn btn--ghost">
          {{ t('hero.ask_cta') }} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <div class="hero__right">
      <img
        ref="portraitRef"
        class="hero__portrait"
        :src="profile.avatar"
        :alt="profile.name"
        width="1042"
        height="1042"
        fetchpriority="high"
      />
      <div class="hero__caption">
        <p class="hero__location">{{ t('location') }}</p>
        <dl class="hero__languages" :aria-label="t('about.languages_title')">
          <div v-for="language in languages" :key="language.name">
            <dt>{{ language.name }}</dt>
            <dd>{{ language.level }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { useCvPdf } from '@/composables/useCvPdf'
import { useHeroMotion } from '@/composables/useHeroMotion'
import NeuralBackground from '@/components/NeuralBackground.vue'

const { t, tm } = useI18n()
const { downloadCv } = useCvPdf()
const heroRef = ref<HTMLElement>()
const portraitRef = ref<HTMLElement>()
const { active: motionActive } = useHeroMotion(heroRef, portraitRef)

const firstName = computed(() => profile.nameShort.split(' ')[0] ?? profile.nameShort)
const lastName = computed(() => profile.nameShort.split(' ').slice(1).join(' ') || '')
const languages = computed(() => tm('about.languages') as Array<{ name: string; level: string }>)

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
  font-size: clamp(16px, 1.4vw, 18px);
  color: rgba($secondary, 0.78);
  line-height: 1.75;
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

.hero__right { display: flex; flex-direction: column; align-items: center; }
.hero__portrait {
  display: block;
  width: 380px;
  height: 380px;
  object-fit: cover;
  border-radius: 50%;
}
.hero__caption {
  width: 100%;
  max-width: 340px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid $border;
  text-align: center;
}
.hero__location { margin-bottom: 12px; font-size: 13px; color: rgba($secondary, 0.8); }
.hero__languages { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px 24px; font-size: 12px; line-height: 1.5; }
.hero__languages div { display: flex; gap: 6px; }
.hero__languages dt { color: $muted; }
.hero__languages dd { color: $accent; }

@media (max-width: $tablet) { .hero__portrait { width: 280px; height: 280px; } }
@media (max-width: $mobile) {
  .hero__portrait { width: 240px; height: 240px; }
}
</style>
