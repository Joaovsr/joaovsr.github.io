<template>
  <section id="projects" class="section projects">
    <header class="section__head projects__heading">
      <div><p class="eyebrow"><span>01 /</span> {{ t('projects.eyebrow') }}</p><h2 class="section__title">{{ t('projects.title') }}</h2></div>
      <p class="section__sub">{{ t('projects.intro') }}</p>
    </header>
    <div class="projects__grid">
      <article v-for="(project, index) in projects" :key="project.slug" class="project" :class="{ 'project--featured': index === 0 }">
        <button class="project__image" :class="'project__image--' + project.slug" type="button" :aria-label="t('projects.open', { name: t('projects.' + project.slug + '.name') })" @click="selected = project">
          <span class="project__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
          <img v-if="project.images?.length" :src="project.images[0]" :alt="t('projects.' + project.slug + '.image_alt')" :loading="index === 0 ? 'eager' : 'lazy'" :width="index === 0 ? 1280 : undefined" :height="index === 0 ? 2629 : undefined" />
          <span class="project__open" aria-hidden="true">↗</span>
        </button>
        <div class="project__info">
          <p v-if="index === 0" class="project__featured-label">{{ t('projects.featured') }} <span aria-hidden="true">↗</span></p>
          <p class="project__category">{{ t('projects.' + project.slug + '.category') }}</p>
          <h3><button type="button" @click="selected = project">{{ t('projects.' + project.slug + '.name') }}</button></h3>
          <p class="project__description">{{ t('projects.' + project.slug + '.summary') }}</p>
          <ul class="project__tools" :aria-label="t('projects.tech_label')"><li v-for="tech in project.technologies.slice(0, 4)" :key="tech">{{ tech }}</li></ul>
          <button class="text-link" type="button" @click="selected = project">{{ t('projects.see_details') }}<span aria-hidden="true">↗</span></button>
        </div>
      </article>
    </div>
    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal.vue'
import type { IProject } from '@/interfaces/project'
const { t } = useI18n()
const selected = ref<IProject | null>(null)
</script>
<style scoped lang="scss">
.projects { padding-top: 64px; }
.projects__heading { flex-direction: row; justify-content: space-between; align-items: end; gap: 36px; margin-bottom: 36px; }
.projects__heading .eyebrow { margin-bottom: 18px; }
.projects__heading .section__sub { max-width: 300px; }
.projects__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px 32px; }
.project { min-width: 0; }
.project__image { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; aspect-ratio: 1.5; overflow: hidden; background: #e9edf5; border-radius: 8px; padding: 44px 24px; }
.project__image img { width: 100%; height: auto; max-height: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 14px 30px #17263d14; transition: transform .35s ease; }
.project__image--hr_platform { background: #e1ebe4; }
.project__image--fictor360_ai { background: #e7e5ef; }
.project__image--candidate_portal { background: #eee8df; }
.project__image--candidate_portal img { aspect-ratio: 1.75; object-fit: cover; object-position: top; }
.project__image--data_pipeline { background: #e3edf2; }
.project__number { position: absolute; left: 20px; top: 18px; color: $muted; font: 10px $mono; letter-spacing: .08em; }
.project__open { position: absolute; right: 16px; bottom: 16px; width: 40px; height: 40px; border: 1px solid #ffffff80; border-radius: 50%; background: $surface; display: grid; place-items: center; font-size: 22px; color: $secondary; transition: background .2s, color .2s; }
.project__image:hover .project__open { background: $primary; color: white; }
.project__info { padding-top: 24px; }
.project__category { font-size: 10px; font-family: $mono; line-height: 1.7; letter-spacing: .025em; color: $muted; margin-bottom: 12px; }
h3 { font-size: 27px; font-weight: 600; line-height: 1.25; letter-spacing: -.045em; margin-bottom: 12px; }
h3 button { text-align: left; color: inherit; }
h3 button:hover { color: $primary; }
.project__description { font-size: 14px; line-height: 1.8; color: $muted; max-width: 54ch; }
.project__tools { display: flex; flex-wrap: wrap; gap: 6px; margin: 20px 0 12px; }
.project__tools li { font-size: 10px; line-height: 1.6; padding: 4px 8px; border: 1px solid $border; border-radius: 3px; color: $muted; }
.project--featured { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 24px; background: #e8edf8; border-radius: 10px; overflow: hidden; }
.project--featured .project__image { grid-column: 2; grid-row: 1; height: 460px; aspect-ratio: auto; background: #dce5f5; border-radius: 0; padding: 35px; }
.project--featured .project__image img { height: 100%; width: auto; max-width: calc(100% - 36px); object-fit: cover; border: 5px solid #23334b; border-radius: 24px; box-shadow: 12px 20px 30px #17263d26; transform: rotate(-6deg); }
.project--featured .project__number { left: 22px; }
.project--featured .project__info { grid-column: 1; grid-row: 1; padding: 44px; }
.project__featured-label { display: flex; gap: 20px; align-items: center; color: $primary; font: 10px $mono; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 40px; }
.project__featured-label span { font-size: 18px; }
.project--featured h3 { font-size: clamp(40px, 4.5vw, 60px); letter-spacing: -.055em; }
.project--featured .project__description { font-size: 15px; }
.project--featured .text-link { color: $primary; text-decoration-color: #244bd740; }
.project:last-child { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding-block: 32px; border-block: 1px solid $border; }
.project:last-child .project__image { aspect-ratio: 1.8; }
.project:last-child .project__info { padding: 0; }
@media (hover: hover) {
  .project__image:hover img { transform: translateY(-4px) scale(1.025); }
  .project--featured .project__image:hover img { transform: rotate(-3deg) translateY(-3px); }
}
@media (max-width: 950px) {
  .project--featured { gap: 0; }
  .project--featured .project__info { padding: 32px; }
  .project--featured .project__image { height: 440px; }
  .project__image { padding-inline: 18px; }
  .project__featured-label { margin-bottom: 26px; }
}
@media (max-width: 650px) {
  .projects { padding-top: 48px; }
  .projects__heading { flex-direction: column; align-items: start; gap: 18px; margin-bottom: 28px; }
  .projects__heading .section__sub { max-width: 38ch; }
  .projects__heading .eyebrow { margin-bottom: 14px; }
  .projects__grid { display: flex; flex-direction: column; gap: 40px; }
  .project--featured { display: flex; flex-direction: column; }
  .project--featured .project__image { height: 360px; padding: 30px; }
  .project--featured .project__info { padding: 28px 24px; }
  .project--featured .project__image img { border-radius: 20px; border-width: 4px; }
  .project__featured-label { margin-bottom: 20px; }
  .project--featured h3 { font-size: 40px; }
  h3 { font-size: 25px; }
  .project__image { aspect-ratio: 1.35; padding: 44px 16px; }
  .project__info { padding-top: 20px; }
  .project:last-child { display: flex; flex-direction: column; gap: 20px; align-items: stretch; }
  .project:last-child .project__image { aspect-ratio: 1.4; }
}
</style>
