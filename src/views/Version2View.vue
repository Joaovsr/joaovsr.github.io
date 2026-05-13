<template>
  <div class="v2">
    <NeuralBackground />
    <TopBar />
    <main class="v2-main">
      <HeroSection />
      <AboutSection />
      <RagDemoSection />
      <ProjectsSection />
      <SkillsGraphSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  </div>
</template>

<script lang="ts" setup>
import NeuralBackground from '@/components/NeuralBackground.vue'
import TopBar from '@/components/TopBar.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import RagDemoSection from '@/components/sections/RagDemoSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsGraphSection from '@/components/sections/SkillsGraphSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
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

.v2-main {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}
</style>
