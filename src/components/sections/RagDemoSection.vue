<template>
  <section id="ask" class="v2-section v2-ask">
    <div class="v2-section__head">
      <span class="v2-section__num">// 02</span>
      <h2 class="v2-section__title">{{ t('v2.ask.title') }}</h2>
      <p class="v2-section__sub">{{ t('v2.ask.sub') }}</p>
    </div>

    <div class="v2-ask__panel">
      <div class="v2-pipeline">
        <template v-for="(node, idx) in pipelineNodes" :key="node.id">
          <div class="v2-pipe-node" :class="{ active: pipeStep >= idx + 1 }">
            <div class="v2-pipe-node__icon">{{ node.icon }}</div>
            <div class="v2-pipe-node__label">{{ node.label }}</div>
          </div>
          <div
            v-if="idx < pipelineNodes.length - 1"
            class="v2-pipe-arrow"
            :class="{ active: pipeStep >= idx + 1 }"
          ></div>
        </template>
      </div>

      <div class="v2-ask__chips">
        <button
          v-for="(q, i) in questions"
          :key="q.id"
          class="v2-ask__chip"
          :class="{ active: askIndex === i }"
          :disabled="askLoading"
          @click="ask(i)"
        >
          {{ q.q }}
        </button>
      </div>

      <div v-if="askChunks.length" class="v2-chunks">
        <div class="v2-chunks__head">
          <span class="v2-accent">›</span> {{ t('v2.ask.retrieved') }}
          <span class="v2-chunks__count">{{ askChunks.length }} {{ t('v2.ask.chunks') }}</span>
        </div>
        <div class="v2-chunk" v-for="(c, i) in askChunks" :key="i">
          <div class="v2-chunk__meta">
            <span class="v2-chunk__src">{{ c.src }}</span>
            <span class="v2-chunk__score">sim: {{ c.score }}</span>
          </div>
          <p class="v2-chunk__txt">{{ c.text }}</p>
        </div>
      </div>

      <div v-if="askAnswer" class="v2-answer">
        <div class="v2-answer__head">
          <span class="v2-answer__avatar">JV</span>
          <span class="v2-answer__model">gpt-4 · streaming</span>
          <span v-if="askLoading" class="v2-answer__typing">●●●</span>
        </div>
        <p class="v2-answer__txt">
          {{ askAnswer }}<span v-if="askLoading" class="v2-cursor">▌</span>
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
.v2-ask__panel {
  background: rgba($v2-surface, 0.6);
  border: 1px solid $v2-border;
  padding: 32px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.v2-pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.v2-pipe-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.4;
  transition: all 0.4s ease;
  &.active {
    opacity: 1;
    .v2-pipe-node__icon {
      border-color: $v2-accent;
      color: $v2-accent;
      box-shadow: 0 0 16px rgba($v2-accent, 0.4);
    }
  }
}
.v2-pipe-node__icon {
  width: 42px;
  height: 42px;
  border: 1px solid $v2-border;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: $v2-muted;
  background: rgba($v2-bg, 0.6);
  transition: all 0.4s ease;
}
.v2-pipe-node__label {
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.v2-pipe-arrow {
  width: 28px;
  height: 1px;
  background: $v2-border;
  transition: background 0.4s ease;
  &.active {
    background: $v2-accent;
    box-shadow: 0 0 8px rgba($v2-accent, 0.4);
  }
}

.v2-ask__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.v2-ask__chip {
  font-family: $v2-mono;
  font-size: 12px;
  padding: 10px 16px;
  border: 1px solid $v2-border;
  background: transparent;
  color: $v2-secondary;
  cursor: pointer;
  transition: all $transition-base;
  text-align: left;
  &:hover:not(:disabled) {
    border-color: $v2-primary;
    color: $v2-primary;
    background: rgba($v2-primary, 0.06);
  }
  &.active {
    border-color: $v2-accent;
    color: $v2-accent;
    background: rgba($v2-accent, 0.08);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.v2-chunks {
  border: 1px dashed $v2-border;
  padding: 16px;
  margin-bottom: 24px;
  background: rgba($v2-bg, 0.4);
}
.v2-chunks__head {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v2-chunks__count { color: $v2-accent; margin-left: auto; }
.v2-chunk {
  padding: 12px 0;
  border-top: 1px solid $v2-border;
  &:first-of-type { border-top: none; padding-top: 0; }
}
.v2-chunk__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-family: $v2-mono;
  font-size: 10px;
  color: $v2-muted;
}
.v2-chunk__src { color: $v2-glow; }
.v2-chunk__score { color: $v2-accent; }
.v2-chunk__txt {
  font-size: 13px;
  line-height: 1.6;
  color: rgba($v2-secondary, 0.75);
}

.v2-answer {
  background: linear-gradient(135deg, rgba($v2-primary, 0.05), rgba($v2-accent, 0.05));
  border: 1px solid rgba($v2-primary, 0.2);
  padding: 20px;
  border-radius: 6px;
}
.v2-answer__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $v2-border;
}
.v2-answer__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, $v2-primary, $v2-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: $v2-bg;
}
.v2-answer__model {
  font-family: $v2-mono;
  font-size: 11px;
  color: $v2-muted;
}
.v2-answer__typing {
  font-family: $v2-mono;
  font-size: 12px;
  color: $v2-accent;
  margin-left: auto;
  animation: pulse2 1s infinite;
}
.v2-answer__txt {
  font-size: 14px;
  line-height: 1.75;
  color: $v2-secondary;
}
</style>
