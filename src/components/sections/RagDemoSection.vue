<template>
  <section id="ask" class="section ask" aria-labelledby="ask-title">
    <div class="section__head">
      <span class="section__num">// 01</span>
      <h2 id="ask-title" class="section__title">{{ t('ask.title') }}</h2>
      <p class="section__sub">{{ t('ask.sub') }}</p>
    </div>

    <div class="ask__panel" :aria-busy="askLoading">
      <p class="ask__status" role="status">{{ askLoading ? t('ask.loading') : askAnswer }}</p>
      <div class="pipeline" aria-hidden="true">
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
          v-for="q in questions.slice(0, 6)"
          :key="q.id"
          class="ask__chip"
          type="button"
          :class="{ active: askIndex === q.index }"
          :aria-pressed="askIndex === q.index"
          :disabled="askLoading"
          @click="ask(q.index)"
        >
          {{ q.q }}
        </button>
      </div>

      <details ref="moreQuestions" class="ask__more">
        <summary>{{ t('ask.more_questions') }} <span aria-hidden="true">+</span></summary>
        <div class="ask__chips">
          <button
            v-for="q in questions.slice(6)"
            :key="q.id"
            class="ask__chip"
            type="button"
            :class="{ active: askIndex === q.index }"
            :aria-pressed="askIndex === q.index"
            :disabled="askLoading"
            @click="askMore(q.index)"
          >{{ q.q }}</button>
        </div>
      </details>

      <div v-if="askAnswer" ref="answerRef" class="answer" tabindex="-1" role="region" aria-labelledby="ask-selected-question" :aria-hidden="askLoading">
        <h3 v-if="askIndex !== null" id="ask-selected-question" class="answer__question">{{ questions[askIndex].q }}</h3>
        <div class="answer__head">
          <span class="answer__avatar">JV</span>
          <span class="answer__model">{{ t('ask.answer_label') }}</span>
          <span v-if="askLoading" class="answer__typing" aria-hidden="true">●●●</span>
        </div>
        <p class="answer__txt">
          {{ askAnswer }}<span v-if="askLoading" class="cursor" aria-hidden="true">▌</span>
        </p>
      </div>

      <div v-if="!askLoading && relatedQuestions.length" class="ask__related">
        <h3 class="ask__related-title">{{ t('ask.related_questions') }}</h3>
        <div class="ask__chips">
          <button v-for="q in relatedQuestions" :key="q.id" class="ask__chip" type="button" @click="askRelated(q.index)">{{ q.q }}</button>
        </div>
      </div>

      <details v-if="askChunks.length" class="chunks">
        <summary class="chunks__head">
          <span class="chunks__toggle accent" aria-hidden="true">›</span> {{ t('ask.retrieved') }}
          <span class="chunks__count">{{ askChunks.length }} {{ t('ask.chunks') }}</span>
        </summary>
        <div class="chunk" v-for="(c, i) in askChunks" :key="i">
          <div class="chunk__meta">
            <span class="chunk__src">{{ c.src }}</span>
            <span class="chunk__score" :title="t('ask.similarity_label')">sim: {{ c.score }}</span>
          </div>
          <p class="chunk__txt">{{ c.text }}</p>
        </div>
      </details>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ragPipeline, ragQuestions } from '@/data/ragDemo'
import { useRagDemoSimulation } from '@/composables/useRagDemoSimulation'

const { t } = useI18n()
const { askIndex, askLoading, askChunks, askAnswer, pipeStep, ask } = useRagDemoSimulation()
const moreQuestions = ref<HTMLDetailsElement>()
const answerRef = ref<HTMLElement>()

function askMore(index: number) {
  moreQuestions.value?.removeAttribute('open')
  moreQuestions.value?.querySelector('summary')?.focus()
  void ask(index)
}

async function askRelated(index: number) {
  await ask(index)
  answerRef.value?.focus({ preventScroll: true })
}

const pipelineNodes = computed(() =>
  ragPipeline.map(n => ({ id: n.id, icon: n.icon, label: t(n.labelKey) }))
)

const questions = computed(() =>
  ragQuestions.map((q, index) => ({ id: q.id, index, q: t(q.questionKey) }))
)

const relatedQuestions = computed(() => {
  const selected = askIndex.value === null ? undefined : ragQuestions[askIndex.value]
  return questions.value.filter(q => selected?.relatedIds.includes(q.id))
})
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
  margin-bottom: 12px;
}
.ask__more { margin-bottom: 24px; }
.ask__more summary { display: flex; align-items: center; gap: 12px; min-height: 44px; font-size: 12px; color: $accent; cursor: pointer; list-style: none; }
.ask__more summary::-webkit-details-marker { display: none; }
.ask__more summary span { font-size: 20px; transition: transform $transition-fast; }
.ask__more[open] summary span { transform: rotate(45deg); }
.ask__more .ask__chips { margin-top: 12px; margin-bottom: 0; }
.ask__related { margin-top: 24px; }
.ask__related-title { margin-bottom: 12px; font-size: 13px; font-weight: 500; color: $muted; }
.ask__chip {
  min-height: 44px;
  max-width: 100%;
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
  margin-top: 24px;
  background: rgba($bg, 0.4);
}
.chunks__head {
  flex-wrap: wrap;
  font-family: $mono;
  font-size: 11px;
  color: $muted;
  min-height: 44px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  list-style: none;
}
.chunks__head::-webkit-details-marker { display: none; }
.chunks[open] .chunks__head { margin-bottom: 14px; }
.chunks[open] .chunks__toggle { transform: rotate(90deg); }
.chunks__count { color: $accent; margin-left: auto; }
.chunk {
  padding: 12px 0;
  border-top: 1px solid $border;
  &:first-of-type { border-top: none; padding-top: 0; }
}
.chunk__meta {
  gap: 8px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-family: $mono;
  font-size: 10px;
  color: $muted;
}
.chunk__src { color: $glow; overflow-wrap: anywhere; min-width: 0; }
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
.answer__question { margin-bottom: 16px; font-size: 14px; line-height: 1.6; font-weight: 600; }
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
.ask__status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: $mobile) {
  .ask__panel { padding: 20px 16px; }
  .pipeline { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; }
  .pipe-arrow { display: none; }
  .pipe-node__icon { width: 36px; height: 36px; font-size: 16px; }
  .pipe-node__label { font-size: 8px; letter-spacing: 0; max-width: 100%; overflow-wrap: anywhere; text-align: center; }
  .ask__chip { width: 100%; }
  .chunks { padding: 12px; }
  .answer { padding: 16px; }
}
</style>
