<template>
  <section id="ask" class="section ask">
    <div class="section__head">
      <span class="section__num">// 02</span>
      <h2 class="section__title">{{ t('ask.title') }}</h2>
      <p class="section__sub">{{ t('ask.sub') }}</p>
    </div>

    <div class="ask__panel">
      <div class="pipeline">
        <template v-for="(node, idx) in pipelineNodes" :key="node.id">
          <div class="pipe-node" :class="{ active: pipeStep >= idx + 1 }">
            <div class="pipe-node__icon">{{ node.icon }}</div>
            <div class="pipe-node__label">{{ node.label }}</div>
          </div>
          <div
            v-if="idx < pipelineNodes.length - 1"
            class="pipe-arrow"
            :class="{ active: pipeStep >= idx + 1 }"
          ></div>
        </template>
      </div>

      <div class="ask__chips">
        <button
          v-for="(q, i) in questions"
          :key="q.id"
          class="ask__chip"
          :class="{ active: askIndex === i }"
          :disabled="askLoading"
          @click="ask(i)"
        >
          {{ q.q }}
        </button>
      </div>

      <div v-if="askChunks.length" class="chunks">
        <div class="chunks__head">
          <span class="accent">›</span> {{ t('ask.retrieved') }}
          <span class="chunks__count">{{ askChunks.length }} {{ t('ask.chunks') }}</span>
        </div>
        <div class="chunk" v-for="(c, i) in askChunks" :key="i">
          <div class="chunk__meta">
            <span class="chunk__src">{{ c.src }}</span>
            <span class="chunk__score">sim: {{ c.score }}</span>
          </div>
          <p class="chunk__txt">{{ c.text }}</p>
        </div>
      </div>

      <div v-if="askAnswer" class="answer">
        <div class="answer__head">
          <span class="answer__avatar">JV</span>
          <span class="answer__model">gpt-4 · streaming</span>
          <span v-if="askLoading" class="answer__typing">●●●</span>
        </div>
        <p class="answer__txt">
          {{ askAnswer }}<span v-if="askLoading" class="cursor">▌</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ragPipeline, ragQuestions } from '@/data/ragDemo'
import { useRagDemoSimulation } from '@/composables/useRagDemoSimulation'

const { t } = useI18n()
const { askIndex, askLoading, askChunks, askAnswer, pipeStep, ask } = useRagDemoSimulation()

const pipelineNodes = computed(() =>
  ragPipeline.map(n => ({ id: n.id, icon: n.icon, label: t(n.labelKey) }))
)

const questions = computed(() =>
  ragQuestions.map(q => ({ id: q.id, q: t(q.questionKey) }))
)
</script>

<style lang="scss" scoped>
.ask__panel {
  background: rgba($surface, 0.6);
  border: 1px solid $border;
  padding: 32px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.pipe-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.4;
  transition: all 0.4s ease;
  &.active {
    opacity: 1;
    .pipe-node__icon {
      border-color: $accent;
      color: $accent;
      box-shadow: 0 0 16px rgba($accent, 0.4);
    }
  }
}
.pipe-node__icon {
  width: 42px;
  height: 42px;
  border: 1px solid $border;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: $muted;
  background: rgba($bg, 0.6);
  transition: all 0.4s ease;
}
.pipe-node__label {
  font-family: $mono;
  font-size: 10px;
  color: $muted;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.pipe-arrow {
  width: 28px;
  height: 1px;
  background: $border;
  transition: background 0.4s ease;
  &.active {
    background: $accent;
    box-shadow: 0 0 8px rgba($accent, 0.4);
  }
}

.ask__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.ask__chip {
  font-family: $mono;
  font-size: 12px;
  padding: 10px 16px;
  border: 1px solid $border;
  background: transparent;
  color: $secondary;
  cursor: pointer;
  transition: all $transition-base;
  text-align: left;
  &:hover:not(:disabled) {
    border-color: $primary;
    color: $primary;
    background: rgba($primary, 0.06);
  }
  &.active {
    border-color: $accent;
    color: $accent;
    background: rgba($accent, 0.08);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.chunks {
  border: 1px dashed $border;
  padding: 16px;
  margin-bottom: 24px;
  background: rgba($bg, 0.4);
}
.chunks__head {
  font-family: $mono;
  font-size: 11px;
  color: $muted;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.chunks__count { color: $accent; margin-left: auto; }
.chunk {
  padding: 12px 0;
  border-top: 1px solid $border;
  &:first-of-type { border-top: none; padding-top: 0; }
}
.chunk__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-family: $mono;
  font-size: 10px;
  color: $muted;
}
.chunk__src { color: $glow; }
.chunk__score { color: $accent; }
.chunk__txt {
  font-size: 13px;
  line-height: 1.6;
  color: rgba($secondary, 0.75);
}

.answer {
  background: linear-gradient(135deg, rgba($primary, 0.05), rgba($accent, 0.05));
  border: 1px solid rgba($primary, 0.2);
  padding: 20px;
  border-radius: 6px;
}
.answer__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $border;
}
.answer__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary, $accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: $bg;
}
.answer__model {
  font-family: $mono;
  font-size: 11px;
  color: $muted;
}
.answer__typing {
  font-family: $mono;
  font-size: 12px;
  color: $accent;
  margin-left: auto;
  animation: pulse 1s infinite;
}
.answer__txt {
  font-size: 14px;
  line-height: 1.75;
  color: $secondary;
}
</style>
