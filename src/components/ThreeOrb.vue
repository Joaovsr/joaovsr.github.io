<template>
  <div ref="hostRef" class="orb3d" :class="{ 'orb3d--ready': ready }" aria-hidden="true">
    <div class="orb3d__fallback"><span></span></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { createOrbScene } from '@/utils/createOrbScene'

const props = defineProps<{ active: boolean; pointer: { x: number; y: number }; progress: number }>()
const hostRef = ref<HTMLElement>()
const ready = ref(false)
let scene: ReturnType<typeof createOrbScene> | undefined
let unmounted = false

watch(() => props.active, active => scene?.setActive(active))
onMounted(async () => {
  try {
    const { createOrbScene } = await import('@/utils/createOrbScene')
    if (unmounted || !hostRef.value) return
    scene = createOrbScene(hostRef.value, () => ({ pointer: props.pointer, progress: props.progress }), () => {
      scene?.dispose()
      scene = undefined
      ready.value = false
    })
    ready.value = true
    scene.setActive(props.active)
  } catch {
    scene?.dispose()
    scene = undefined
    ready.value = false
  }
})
onUnmounted(() => { unmounted = true; scene?.dispose() })
</script>

<style scoped lang="scss">
.orb3d { width: 100%; height: 100%; position: relative; }
.orb3d::before { content: ''; position: absolute; inset: 18%; border-radius: 50%; background: radial-gradient(circle, rgba($primary, .13), transparent 70%); }
.orb3d :deep(canvas) { position: absolute; inset: 0; width: 100%; height: 100%; }
.orb3d__fallback { position: absolute; inset: 20%; border: 1px solid rgba($accent, .2); border-radius: 50%; display: grid; place-items: center; }
.orb3d__fallback::before { content: ''; position: absolute; inset: 16%; border: 1px solid rgba($primary, .3); border-radius: 50%; }
.orb3d__fallback span { width: 25%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 30% 30%, $glow, $primary); box-shadow: 0 0 44px rgba($primary, .4); }
.orb3d--ready .orb3d__fallback { display: none; }
</style>
