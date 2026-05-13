<template>
  <canvas ref="canvasRef" class="v2-canvas" aria-hidden="true" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNeuralCanvas } from '@/composables/useNeuralCanvas'

const canvasRef = ref<HTMLCanvasElement>()
useNeuralCanvas(canvasRef)
</script>

<style lang="scss" scoped>
.v2-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
}
</style>
