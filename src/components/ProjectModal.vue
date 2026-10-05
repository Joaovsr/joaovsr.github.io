<template>
  <dialog ref="dialog" class="project-dialog" aria-labelledby="project-title" @close="emit('close')" @click="closeBackdrop">
    <template v-if="project">
      <header class="dialog__header"><span>{{ t('projects.private_label') }}</span><button type="button" autofocus :aria-label="t('projects.close')" @click="dialog?.close()">{{ t('projects.close') }} ×</button></header>
      <div class="dialog__body">
        <p class="eyebrow">{{ t('projects.' + project.slug + '.category') }}</p>
        <h2 id="project-title">{{ t('projects.' + project.slug + '.name') }}</h2>
        <p class="dialog__description">{{ t('projects.' + project.slug + '.description') }}</p>
        <div class="dialog__tech"><span v-for="tech in project.technologies" :key="tech" class="chip">{{ tech }}</span></div>
        <div class="dialog__story"><section v-for="part in ['problem', 'solution', 'result']" :key="part" :class="'dialog__' + part"><h3>{{ t('projects.' + part + '_label') }}</h3><p>{{ t('projects.' + project.slug + '.' + part) }}</p></section></div>
        <section><h3>{{ t('projects.screenshots_label') }}</h3><div class="dialog__gallery"><a v-for="(src, index) in project.images" :key="src" :href="src" target="_blank" rel="noopener noreferrer" :aria-label="t('projects.enlarge', { number: index + 1 }) + ': ' + t('projects.' + project.slug + '.name')"><img :src="src" :alt="t('projects.' + project.slug + '.image_alt') + ' (' + (index + 1) + ')'" loading="lazy" /></a></div><p class="dialog__hint">{{ t('projects.image_hint') }}</p></section>
      </div>
    </template>
  </dialog>
</template>
<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IProject } from '@/interfaces/project'
const props = defineProps<{ project: IProject | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const { t } = useI18n()
const dialog = ref<HTMLDialogElement | null>(null)
watch(() => props.project, project => {
  if (project) dialog.value?.showModal()
  else dialog.value?.close()
  document.body.style.overflow = project ? 'hidden' : ''
}, { flush: 'post' })
onUnmounted(() => { document.body.style.overflow = '' })
function closeBackdrop(event: MouseEvent) {
  if (event.target !== dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.value.close()
}
</script>
<style scoped lang="scss">
.project-dialog { width: min(880px, calc(100% - 32px)); max-height: calc(100dvh - 48px); margin: auto; border: 0; border-radius: 12px; padding: 0; background: $bg; color: $secondary; overscroll-behavior: contain; }
.project-dialog::backdrop { background: #192a43b3; }
.dialog__header { position: sticky; top: 0; background: $bg; z-index: 1; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 32px; border-bottom: 1px solid $border; font-size: 12px; color: $muted; }
.dialog__header button { padding: 12px 0 12px 16px; color: $secondary; }
.dialog__body { padding: 32px; }
.dialog__body > .eyebrow { font-size: 10px; margin-bottom: 14px; }
h2 { font-size: clamp(28px, 4vw, 42px); letter-spacing: -.045em; font-weight: 600; line-height: 1.15; margin-bottom: 20px; }
p { font-size: 14px; line-height: 1.85; color: $muted; }
.dialog__description { font-size: 16px; }
.dialog__tech { display: flex; flex-wrap: wrap; gap: 6px; margin: 24px 0 32px; }
section { margin-top: 28px; }
.dialog__story { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 28px; }
.dialog__story section { margin: 0; }
.dialog__story .dialog__result { grid-column: 1 / -1; padding: 24px; border-left: 3px solid $primary; background: $elevated; }
.dialog__result h3 { color: $primary; }
h3 { font-size: 17px; font-weight: 600; margin-bottom: 12px; }
.dialog__gallery { display: grid; gap: 20px; }
.dialog__gallery a { display: block; background: $elevated; padding: 16px; border-radius: 6px; }
.dialog__gallery img { max-height: 420px; width: auto; max-width: 100%; margin: auto; object-fit: contain; }
.dialog__hint { margin-top: 12px; font-size: 12px; }
@media (max-width: 650px) { .dialog__body { padding: 24px 20px; } .dialog__header { padding-inline: 20px; } .dialog__story { grid-template-columns: 1fr; } }
</style>
