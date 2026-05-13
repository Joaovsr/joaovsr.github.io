<template>
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
        <img :src="profile.avatar" :alt="profile.nameShort" class="v2-about__avatar" />
        <div class="v2-about__meta">
          <div class="v2-about__row">
            <span class="v2-about__key">location</span>
            <span class="v2-about__val">{{ t('location') }}</span>
          </div>
          <div class="v2-about__row">
            <span class="v2-about__key">email</span>
            <span class="v2-about__val v2-accent">{{ profile.email }}</span>
          </div>
          <div class="v2-about__row">
            <span class="v2-about__key">status</span>
            <span class="v2-about__val">
              <span class="v2-pulse"></span> {{ t('about.open_to') }}
            </span>
          </div>
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
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'

const { t, tm } = useI18n()
const differentials = computed(() => tm('about.differentials') as string[])
const languages = computed(() => tm('about.languages') as Array<{ name: string; level: string }>)
</script>

<style lang="scss" scoped>
.v2-about__grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.v2-about__lead {
  font-size: 17px;
  line-height: 1.8;
  color: $v2-secondary;
  margin-bottom: 18px;
}
.v2-about__body {
  font-size: 15px;
  line-height: 1.8;
  color: rgba($v2-secondary, 0.75);
  margin-bottom: 24px;
}
.v2-about__diff {
  display: flex;
  flex-direction: column;
  gap: 8px;
  li {
    font-size: 14px;
    color: $v2-muted;
    display: flex;
    gap: 10px;
  }
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
.v2-about__meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $v2-border;
}
.v2-about__row { display: flex; flex-direction: column; gap: 2px; }
.v2-about__key {
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.v2-about__val {
  font-size: 13px;
  color: $v2-secondary;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v2-about__langs { display: flex; flex-direction: column; gap: 6px; }
.v2-about__lang {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
}
</style>
