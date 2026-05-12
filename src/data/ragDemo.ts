import type { IRagPipelineNode, IRagQuestion } from '@/interfaces/ragDemo'

export const ragPipeline: IRagPipelineNode[] = [
  { id: 'query', icon: '?', labelKey: 'v2.ask.pipeline.query' },
  { id: 'embed', icon: '⟁', labelKey: 'v2.ask.pipeline.embed' },
  { id: 'vector', icon: '▦', labelKey: 'v2.ask.pipeline.vector' },
  { id: 'llm', icon: '✦', labelKey: 'v2.ask.pipeline.llm' },
  { id: 'answer', icon: '↩', labelKey: 'v2.ask.pipeline.answer' }
]

export const ragQuestions: IRagQuestion[] = [
  // ── AI ─────────────────────────────────────────────────────────
  {
    id: 'q1',
    questionKey: 'v2.ask.q1',
    answerKey: 'v2.ask.q1_answer',
    chunks: [
      { src: 'experience.json#fictor', score: '0.91', textKey: 'v2.ask.q1_chunk1' },
      { src: 'projects.json#hr-platform', score: '0.86', textKey: 'v2.ask.q1_chunk2' }
    ]
  },
  {
    id: 'q2',
    questionKey: 'v2.ask.q2',
    answerKey: 'v2.ask.q2_answer',
    chunks: [
      { src: 'projects.json#fictor360-ai', score: '0.94', textKey: 'v2.ask.q2_chunk1' },
      { src: 'skills.json#data-ai', score: '0.83', textKey: 'v2.ask.q2_chunk2' }
    ]
  },
  {
    id: 'q3',
    questionKey: 'v2.ask.q3',
    answerKey: 'v2.ask.q3_answer',
    chunks: [
      { src: 'projects.json#hr-platform', score: '0.93', textKey: 'v2.ask.q3_chunk1' },
      { src: 'projects.json#candidate-portal', score: '0.81', textKey: 'v2.ask.q3_chunk2' }
    ]
  },

  // ── Backend ────────────────────────────────────────────────────
  {
    id: 'q4',
    questionKey: 'v2.ask.q4',
    answerKey: 'v2.ask.q4_answer',
    chunks: [
      { src: 'skills.json#backend', score: '0.89', textKey: 'v2.ask.q4_chunk1' },
      { src: 'projects.json#super-app', score: '0.84', textKey: 'v2.ask.q4_chunk2' }
    ]
  },
  {
    id: 'q5',
    questionKey: 'v2.ask.q5',
    answerKey: 'v2.ask.q5_answer',
    chunks: [
      { src: 'projects.json#super-app', score: '0.92', textKey: 'v2.ask.q5_chunk1' },
      { src: 'projects.json#candidate-portal', score: '0.85', textKey: 'v2.ask.q5_chunk2' }
    ]
  },

  // ── Data Analytics ─────────────────────────────────────────────
  {
    id: 'q6',
    questionKey: 'v2.ask.q6',
    answerKey: 'v2.ask.q6_answer',
    chunks: [
      { src: 'experience.json#atalaia', score: '0.88', textKey: 'v2.ask.q6_chunk1' },
      { src: 'projects.json#data-pipeline', score: '0.82', textKey: 'v2.ask.q6_chunk2' }
    ]
  },

  // ── Career / Projects ──────────────────────────────────────────
  {
    id: 'q7',
    questionKey: 'v2.ask.q7',
    answerKey: 'v2.ask.q7_answer',
    chunks: [
      { src: 'projects.json#super-app', score: '0.95', textKey: 'v2.ask.q7_chunk1' },
      { src: 'experience.json#fictor', score: '0.87', textKey: 'v2.ask.q7_chunk2' }
    ]
  },
  {
    id: 'q8',
    questionKey: 'v2.ask.q8',
    answerKey: 'v2.ask.q8_answer',
    chunks: [
      { src: 'profile.json#career', score: '0.90', textKey: 'v2.ask.q8_chunk1' },
      { src: 'profile.json#availability', score: '0.78', textKey: 'v2.ask.q8_chunk2' }
    ]
  }
]
