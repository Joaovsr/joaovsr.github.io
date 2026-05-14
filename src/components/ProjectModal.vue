<template>
  <Transition name="modal">
    <div v-if="project" class="modal-backdrop" @click.self="$emit('close')" @keydown.esc="$emit('close')">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="modal__close" type="button" :aria-label="t('projects.close')" @click="$emit('close')">×</button>

        <header class="modal__head">
          <h3 class="modal__title">{{ project.title }}</h3>
          <span v-if="project.status === 'private'" class="proj__badge">
            {{ t('projects.private_label') }}
          </span>
        </header>

        <div class="modal__tech">
          <span v-for="tech in project.technologies" :key="tech" class="chip chip--sm">{{ tech }}</span>
        </div>

        <p class="modal__desc">{{ t(`projects.${project.slug}.description`) }}</p>

        <section class="modal__section">
          <h4 class="modal__section-title">
            <span class="accent">›</span> {{ t('projects.problem_label') }}
          </h4>
          <p class="modal__section-body">{{ t(`projects.${project.slug}.problem`) }}</p>
        </section>

        <section class="modal__section">
          <h4 class="modal__section-title">
            <span class="accent">›</span> {{ t('projects.solution_label') }}
          </h4>
          <p class="modal__section-body">{{ t(`projects.${project.slug}.solution`) }}</p>
        </section>

        <section class="modal__section">
          <h4 class="modal__section-title">
            <span class="accent">›</span> {{ t('projects.result_label') }}
          </h4>
          <p class="modal__section-body">{{ t(`projects.${project.slug}.result`) }}</p>
        </section>

        <section class="modal__section">
          <h4 class="modal__section-title">
            <span class="accent">›</span> {{ t('projects.screenshots_label') }}
          </h4>
          <div v-if="project.images && project.images.length" class="modal__gallery">
            <img
              v-for="(src, i) in project.images"
              :key="src"
              :src="src"
              :alt="`${project.title} — ${i + 1}`"
              class="modal__img"
              loading="lazy"
            />
          </div>
          <p v-else class="modal__pending">{{ t('projects.screenshots_pending') }}</p>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IProject } from '@/interfaces/project'

const props = defineProps<{ project: IProject | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { t } = useI18n()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.project) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

watch(() => props.project, (p) => {
  document.body.style.overflow = p ? 'hidden' : ''
})
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;
  overflow-y: auto;
}

.modal {
  position: relative;
  max-width: 800px;
  width: 100%;
  background: $surface;
  border: 1px solid $border;
  border-radius: 12px;
  padding: 36px 40px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);

  @media (max-width: $mobile) { padding: 28px 22px; }
}

.modal__close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: transparent;
  border: 1px solid $border;
  color: $muted;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  transition: all $transition-base;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { border-color: $accent; color: $accent; }
}

.modal__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
  padding-right: 40px;
}
.modal__title {
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 700;
  color: $secondary;
  letter-spacing: -0.015em;
}

.proj__badge {
  font-family: $mono;
  font-size: 9px;
  padding: 3px 8px;
  background: rgba($accent, 0.1);
  color: $accent;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.modal__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 22px;
}

.modal__desc {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($secondary, 0.85);
  margin-bottom: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid $border;
}

.modal__section {
  margin-bottom: 22px;
}
.modal__section-title {
  font-family: $mono;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $glow;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal__section-body {
  font-size: 14px;
  line-height: 1.75;
  color: rgba($secondary, 0.85);
}

.modal__gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.modal__img {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid $border;
  border-radius: 8px;
  background: rgba($bg, 0.5);
}
.modal__pending {
  font-family: $mono;
  font-size: 12px;
  color: $muted;
  padding: 24px;
  border: 1px dashed $border;
  border-radius: 8px;
  text-align: center;
  background: rgba($bg, 0.3);
}

// Transition
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-active .modal, .modal-leave-active .modal {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal, .modal-leave-to .modal {
  opacity: 0;
  transform: translateY(20px);
}
</style>
