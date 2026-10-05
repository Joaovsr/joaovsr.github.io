<template>
  <div class="home">
    <a class="skip-link" href="#main">{{ t('skip_content') }}</a>
    <TopBar />
    <main id="main" class="main">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
const { t } = useI18n()
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
  padding-top: 80px;
  @media (max-width: 650px) { padding-top: 104px; }
}
</style>
