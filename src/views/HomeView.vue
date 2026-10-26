<template>
  <div class="home">
    <a class="skip-link" href="#main">{{ t('skip_content') }}</a>
    <TopBar />
    <main id="main" ref="mainRef" class="main">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsGraphSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import TopBar from '@/components/TopBar.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsGraphSection from '@/components/sections/SkillsGraphSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
const { t } = useI18n()
const mainRef = ref<HTMLElement>()
useScrollReveal(mainRef)
</script>

<style lang="scss" scoped>
.home {
  background: $bg;
  color: $secondary;
  font-family: $font;
  min-height: 100vh;
  position: relative;
}

.main {
  position: relative;
  z-index: 2;
  padding-top: 76px;
}
</style>
