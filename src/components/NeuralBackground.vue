<template>
  <canvas v-show="active" ref="canvasRef" class="canvas" aria-hidden="true" />
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { useNeuralCanvas } from '@/composables/useNeuralCanvas'

const canvasRef = ref<HTMLCanvasElement>()
const props = defineProps<{ active: boolean }>()
useNeuralCanvas(canvasRef, toRef(props, 'active'))
</script>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.45;
}
</style>
