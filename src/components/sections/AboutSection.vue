<template>
  <section id="about" class="section about">
    <div class="section__head">
      <span class="section__num">// 01</span>
      <h2 class="section__title">{{ t('about.title') }}</h2>
    </div>
    <div class="about__grid">
      <div class="about__main">
        <p class="about__lead">{{ profile.aboutLead }}</p>
        <p class="about__body">{{ profile.aboutBody }}</p>
        <ul class="about__diff">
          <li v-for="d in profile.differentials" :key="d">
            <span class="accent">›</span> {{ d }}
          </li>
        </ul>
      </div>
      <aside class="about__side">
        <img :src="profile.avatar" :alt="profile.nameShort" class="about__avatar" />
        <div class="about__meta">
          <div class="about__row">
            <span class="about__key">location</span>
            <span class="about__val">{{ profile.location }}</span>
          </div>
          <div class="about__row">
            <span class="about__key">email</span>
            <span class="about__val accent">{{ profile.email }}</span>
          </div>
          <div class="about__row">
            <span class="about__key">status</span>
            <span class="about__val">
              <span class="pulse"></span> {{ profile.openTo }}
            </span>
          </div>
        </div>
        <div class="about__langs">
          <span class="about__key">{{ t('about.languages_title') }}</span>
          <div v-for="lang in profile.languages" :key="lang.name" class="about__lang">
            <span>{{ lang.name }}</span>
            <span class="accent">{{ lang.level }}</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { PortfolioProfile } from '@/api/content'

const { t } = useI18n()
defineProps<{ profile: PortfolioProfile }>()
</script>

<style lang="scss" scoped>
.about__grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
  @media (max-width: $tablet) { grid-template-columns: 1fr; }
}
.about__lead {
  font-size: 17px;
  line-height: 1.8;
  color: $secondary;
  margin-bottom: 18px;
}
.about__body {
  font-size: 15px;
  line-height: 1.8;
  color: rgba($secondary, 0.75);
  margin-bottom: 24px;
}
.about__diff {
  display: flex;
  flex-direction: column;
  gap: 8px;
  li {
    font-size: 14px;
    color: $muted;
    display: flex;
    gap: 10px;
  }
}
.about__side {
  background: rgba($surface, 0.5);
  border: 1px solid $border;
  border-radius: 8px;
  padding: 24px;
  backdrop-filter: blur(8px);
}
.about__avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid $primary;
  margin-bottom: 18px;
  box-shadow: 0 0 24px rgba($primary, 0.3);
}
.about__meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $border;
}
.about__row { display: flex; flex-direction: column; gap: 2px; }
.about__key {
  font-family: $mono;
  font-size: 10px;
  color: $muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.about__val {
  font-size: 13px;
  color: $secondary;
  display: flex;
  align-items: center;
  gap: 8px;
}
.about__langs { display: flex; flex-direction: column; gap: 6px; }
.about__lang {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
}
</style>
