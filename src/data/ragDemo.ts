import type { IRagPipelineNode, IRagQuestion } from '@/interfaces/ragDemo'

export const ragPipeline: IRagPipelineNode[] = [
  { id: 'query', icon: '?', labelKey: 'ask.pipeline.query' },
  { id: 'embed', icon: '⟁', labelKey: 'ask.pipeline.embed' },
  { id: 'vector', icon: '▦', labelKey: 'ask.pipeline.vector' },
  { id: 'llm', icon: '✦', labelKey: 'ask.pipeline.llm' },
  { id: 'answer', icon: '↩', labelKey: 'ask.pipeline.answer' }
]

export const ragQuestions: IRagQuestion[] = [
  // ── AI ─────────────────────────────────────────────────────────
  {
    id: 'q1',
    questionKey: 'ask.q1',
    answerKey: 'ask.q1_answer',
    chunks: [
      { src: 'experience.json#fictor', score: '0.91', textKey: 'ask.q1_chunk1' },
      { src: 'projects.json#hr-platform', score: '0.86', textKey: 'ask.q1_chunk2' }
    ]
  },
  {
    id: 'q2',
    questionKey: 'ask.q2',
    answerKey: 'ask.q2_answer',
    chunks: [
      { src: 'projects.json#fictor360-ai', score: '0.94', textKey: 'ask.q2_chunk1' },
      { src: 'skills.json#data-ai', score: '0.83', textKey: 'ask.q2_chunk2' }
    ]
  },
  {
    id: 'q3',
    questionKey: 'ask.q3',
    answerKey: 'ask.q3_answer',
    chunks: [
      { src: 'projects.json#hr-platform', score: '0.93', textKey: 'ask.q3_chunk1' },
      { src: 'projects.json#candidate-portal', score: '0.81', textKey: 'ask.q3_chunk2' }
    ]
  },

  // ── Backend ────────────────────────────────────────────────────
  {
    id: 'q4',
    questionKey: 'ask.q4',
    answerKey: 'ask.q4_answer',
    chunks: [
      { src: 'skills.json#backend', score: '0.89', textKey: 'ask.q4_chunk1' },
      { src: 'projects.json#super-app', score: '0.84', textKey: 'ask.q4_chunk2' }
    ]
  },
  {
    id: 'q5',
    questionKey: 'ask.q5',
    answerKey: 'ask.q5_answer',
    chunks: [
      { src: 'projects.json#super-app', score: '0.92', textKey: 'ask.q5_chunk1' },
      { src: 'projects.json#candidate-portal', score: '0.85', textKey: 'ask.q5_chunk2' }
    ]
  },

  // ── Data Analytics ─────────────────────────────────────────────
  {
    id: 'q6',
    questionKey: 'ask.q6',
    answerKey: 'ask.q6_answer',
    chunks: [
      { src: 'experience.json#atalaia', score: '0.88', textKey: 'ask.q6_chunk1' },
      { src: 'projects.json#data-pipeline', score: '0.82', textKey: 'ask.q6_chunk2' }
    ]
  },

  // ── Career / Projects ──────────────────────────────────────────
  {
    id: 'q7',
    questionKey: 'ask.q7',
    answerKey: 'ask.q7_answer',
    chunks: [
      { src: 'projects.json#super-app', score: '0.95', textKey: 'ask.q7_chunk1' },
      { src: 'experience.json#fictor', score: '0.87', textKey: 'ask.q7_chunk2' }
    ]
  },
  {
    id: 'q8',
    questionKey: 'ask.q8',
    answerKey: 'ask.q8_answer',
    chunks: [
      { src: 'profile.json#career', score: '0.90', textKey: 'ask.q8_chunk1' },
      { src: 'profile.json#availability', score: '0.78', textKey: 'ask.q8_chunk2' }
    ]
  }
]
