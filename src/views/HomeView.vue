<template>
  <div class="home">
    <NeuralBackground />
    <TopBar v-if="content" :profile="content.profile" />
    <main class="main">
      <template v-if="content">
        <HeroSection :profile="content.profile" :project-count="content.projects.length" />
        <AboutSection :profile="content.profile" />
      </template>
      <section v-else class="content-state section" role="status">
        {{ loading ? 'Carregando conteúdo publicado…' : 'O conteúdo publicado está indisponível.' }}
      </section>
      <RagDemoSection />
      <ProjectsSection v-if="content" :projects="content.projects" />
      <SkillsGraphSection />
      <ExperienceSection v-if="content" :experiences="content.experiences" />
      <EducationSection />
      <ContactSection v-if="content" :profile="content.profile" :experiences="content.experiences" />
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
import { useI18n } from 'vue-i18n'
import { usePortfolioContent } from '@/composables/usePortfolioContent'

const { locale } = useI18n()
const { content, loading } = usePortfolioContent(locale)
</script>

<style lang="scss" scoped>
.home {
  background: $bg;
  color: $secondary;
  font-family: $font;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.main {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}

.content-state { min-height: 40vh; display: grid; place-items: center; color: $muted; }
</style>
