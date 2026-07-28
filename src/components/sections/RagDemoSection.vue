<template>
  <section id="ask" class="section ask">
    <div class="section__head">
      <span class="section__num">// 02</span>
      <h2 class="section__title">{{ t('ask.title') }}</h2>
      <p class="section__sub">{{ t('ask.sub') }}</p>
    </div>

    <div class="ask__panel" :aria-busy="loading">
      <div v-if="turns.length === 0" class="ask__intro">
        <span class="ask__eyebrow">{{ t('ask.suggestions') }}</span>
        <div class="ask__chips">
          <button
            v-for="prompt in prompts"
            :key="prompt.id"
            class="ask__chip"
            type="button"
            :disabled="loading"
            @click="submitPrompt(prompt.question)"
          >
            {{ prompt.question }}
          </button>
        </div>
      </div>

      <div
        v-if="turns.length > 0 || loading"
        ref="historyElement"
        class="chat"
        aria-live="polite"
        aria-relevant="additions"
      >
        <article v-for="turn in turns" :key="turn.id" class="chat__turn">
          <div class="message message--user">
            <span class="message__label">{{ t('ask.you') }}</span>
            <p>{{ turn.question }}</p>
          </div>

          <div
            class="message message--assistant"
            :class="`message--${turn.response.status}`"
          >
            <div class="message__head">
              <span class="answer__avatar" aria-hidden="true">JV</span>
              <span class="message__label">{{ t('ask.assistant') }}</span>
              <span class="message__status">
                {{ t(`ask.status.${turn.response.status}`) }}
              </span>
            </div>

            <div class="answer__items">
              <p
                v-for="(item, itemIndex) in turn.response.answerItems"
                :key="itemIndex"
                :class="{ answer__limitation: item.kind === 'limitation' }"
              >
                {{ item.text }}
                <template v-if="item.kind === 'claim'">
                  <a
                    v-for="citationId in item.citationIds"
                    :key="citationId"
                    class="answer__citation-ref"
                    :href="`#citation-${turn.id}-${citationId}`"
                    :aria-label="t('ask.open_citation', { number: citationNumber(turn, citationId) })"
                  >
                    [{{ citationNumber(turn, citationId) }}]
                  </a>
                </template>
              </p>
            </div>

            <div v-if="turn.response.citations.length" class="citations">
              <h3 class="citations__title">
                {{ t('ask.citations', { count: turn.response.citations.length }) }}
              </h3>
              <article
                v-for="(citation, citationIndex) in turn.response.citations"
                :id="`citation-${turn.id}-${citation.id}`"
                :key="citation.id"
                class="citation"
              >
                <div class="citation__head">
                  <span class="citation__number">[{{ citationIndex + 1 }}]</span>
                  <span class="citation__type">
                    {{ t(`ask.document_type.${citation.documentType}`) }}
                  </span>
                </div>
                <h4 class="citation__title">{{ citation.title }}</h4>
                <span class="citation__section">{{ citation.section }}</span>
                <blockquote>{{ citation.excerpt }}</blockquote>
                <a
                  v-if="citation.sourceUrl"
                  class="citation__link"
                  :href="citation.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t('ask.view_source') }} ↗
                </a>
              </article>
            </div>
          </div>
        </article>

        <div v-if="loading" class="chat__turn">
          <div class="message message--user">
            <span class="message__label">{{ t('ask.you') }}</span>
            <p>{{ pendingQuestion }}</p>
          </div>
          <div class="message message--assistant message--loading" role="status">
            <div class="message__head">
              <span class="answer__avatar" aria-hidden="true">JV</span>
              <span class="message__label">{{ t('ask.assistant') }}</span>
              <span class="answer__typing" aria-hidden="true">●●●</span>
            </div>
            <p>{{ t('ask.loading') }}</p>
          </div>
        </div>
      </div>

      <div v-if="errorCode" class="ask__error" role="alert">
        <div>
          <strong>{{ t('ask.error_title') }}</strong>
          <p>{{ t(`ask.errors.${errorCode}`) }}</p>
        </div>
        <button class="btn btn--ghost" type="button" :disabled="loading" @click="retryQuestion">
          {{ t('ask.retry') }}
        </button>
      </div>

      <form class="ask__form" @submit.prevent="submitQuestion">
        <label class="sr-only" for="portfolio-question">{{ t('ask.input_label') }}</label>
        <textarea
          id="portfolio-question"
          ref="questionInput"
          v-model="question"
          class="ask__input"
          :placeholder="t('ask.placeholder')"
          :disabled="loading"
          maxlength="1000"
          rows="2"
          @keydown.enter.exact.prevent="submitQuestion"
        ></textarea>
        <button
          class="btn btn--primary ask__submit"
          type="submit"
          :disabled="loading || !question.trim()"
        >
          {{ loading ? t('ask.sending') : t('ask.send') }}
        </button>
      </form>
      <p class="ask__privacy">{{ t('ask.privacy') }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Citation } from '@/api/ask'
import { usePortfolioChat, type PortfolioChatTurn } from '@/composables/usePortfolioChat'
import { ragQuestions } from '@/data/ragDemo'
import type { Locale } from '@/plugins/i18n'

const { t, locale } = useI18n()
const {
  turns,
  loading,
  pendingQuestion,
  errorCode,
  ask,
  retry
} = usePortfolioChat()

const question = ref('')
const questionInput = ref<HTMLTextAreaElement | null>(null)
const historyElement = ref<HTMLElement | null>(null)

const prompts = computed(() =>
  ragQuestions.map(prompt => ({ id: prompt.id, question: t(prompt.questionKey) }))
)

function citationNumber(turn: PortfolioChatTurn, citationId: Citation['id']): number {
  const index = turn.response.citations.findIndex(citation => citation.id === citationId)
  return index + 1
}

async function submitQuestion() {
  await finishSubmission(ask(question.value, locale.value as Locale))
}

async function submitPrompt(prompt: string) {
  await finishSubmission(ask(prompt, locale.value as Locale))
}

async function retryQuestion() {
  await finishSubmission(retry(locale.value as Locale))
}

async function finishSubmission(submission: Promise<boolean>) {
  const succeeded = await submission
  if (succeeded) question.value = ''
  await focusInput()
}

async function focusInput() {
  await nextTick()
  questionInput.value?.focus()
}

watch(
  () => [turns.value.length, loading.value],
  async () => {
    await nextTick()
    historyElement.value?.scrollTo({ top: historyElement.value.scrollHeight, behavior: 'smooth' })
  }
)
</script>

<style lang="scss" scoped>
.ask__panel {
  background: rgba($surface, 0.6);
  border: 1px solid $border;
  padding: 32px;
  border-radius: 8px;
  backdrop-filter: blur(8px);

  @media (max-width: $mobile) { padding: 20px; }
}

.ask__intro {
  padding-bottom: 8px;
}

.ask__eyebrow,
.message__label,
.message__status,
.citation__type,
.citation__number,
.citation__section,
.ask__privacy {
  font-family: $mono;
}

.ask__eyebrow {
  display: block;
  color: $muted;
  font-size: 11px;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  text-transform: uppercase;
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

  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.chat {
  max-height: 680px;
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 24px;
  scroll-behavior: smooth;
}

.chat__turn {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}

.message {
  border-radius: 6px;
  padding: 18px;

  p {
    color: $secondary;
    font-size: 14px;
    line-height: 1.75;
  }
}

.message--user {
  width: min(82%, 720px);
  margin-left: auto;
  background: rgba($accent, 0.08);
  border: 1px solid rgba($accent, 0.18);
}

.message--assistant {
  background: linear-gradient(135deg, rgba($primary, 0.05), rgba($accent, 0.05));
  border: 1px solid rgba($primary, 0.2);
}

.message--partial,
.message--insufficient {
  border-color: rgba(#fbbf24, 0.35);
}

.message__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid $border;
}

.message__label {
  display: block;
  color: $muted;
  font-size: 11px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  .message__head & { margin-bottom: 0; }
}

.message__status {
  margin-left: auto;
  color: $accent;
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.message--partial .message__status,
.message--insufficient .message__status {
  color: #fbbf24;
}

.answer__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary, $accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  font-size: 10px;
  font-weight: 700;
  color: $bg;
}

.answer__items {
  display: grid;
  gap: 12px;
}

.answer__limitation {
  padding-left: 12px;
  border-left: 2px solid #fbbf24;
  color: rgba($secondary, 0.72) !important;
}

.answer__citation-ref {
  margin-left: 4px;
  color: $accent;
  font-family: $mono;
  font-size: 11px;
  text-decoration: none;

  &:hover { text-decoration: underline; }
}

.answer__typing {
  color: $accent;
  margin-left: auto;
  font-family: $mono;
  font-size: 12px;
  animation: pulse 1s infinite;
}

.citations {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid $border;

  @media (max-width: $mobile) { grid-template-columns: 1fr; }
}

.citations__title {
  grid-column: 1 / -1;
  color: $muted;
  font-family: $mono;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.citation {
  padding: 16px;
  border: 1px dashed $border;
  background: rgba($bg, 0.4);
  scroll-margin-top: 90px;
}

.citation__head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.citation__number { color: $accent; font-size: 10px; }
.citation__type {
  color: $glow;
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.citation__title {
  color: $secondary;
  font-size: 14px;
  line-height: 1.4;
}

.citation__section {
  display: block;
  color: $muted;
  font-size: 10px;
  margin: 4px 0 10px;
}

.citation blockquote {
  color: rgba($secondary, 0.72);
  font-size: 13px;
  line-height: 1.6;
}

.citation__link {
  display: inline-block;
  margin-top: 12px;
  color: $accent;
  font-family: $mono;
  font-size: 10px;
  text-decoration: none;

  &:hover { text-decoration: underline; }
}

.ask__error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
  padding: 16px;
  border: 1px solid rgba(#fb7185, 0.35);
  background: rgba(#fb7185, 0.06);

  strong { color: #fb7185; font-size: 13px; }
  p { color: $muted; font-size: 13px; line-height: 1.5; margin-top: 4px; }

  @media (max-width: $mobile) { align-items: flex-start; flex-direction: column; }
}

.ask__form {
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid $border;

  @media (max-width: $mobile) { flex-direction: column; }
}

.ask__input {
  width: 100%;
  min-height: 54px;
  resize: vertical;
  padding: 14px 16px;
  border: 1px solid $border;
  border-radius: 4px;
  outline: none;
  background: rgba($bg, 0.55);
  color: $secondary;
  font-family: $font;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color $transition-fast;

  &::placeholder { color: $dim; }
  &:focus { border-color: $accent; }
  &:disabled { opacity: 0.55; cursor: not-allowed; }
}

.ask__submit {
  justify-content: center;
  min-width: 130px;

  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.ask__privacy {
  margin-top: 10px;
  color: $dim;
  font-size: 10px;
  line-height: 1.5;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
