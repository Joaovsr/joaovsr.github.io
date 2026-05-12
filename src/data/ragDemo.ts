import type { IRagPipelineNode, IRagQuestion } from '@/interfaces/ragDemo'

export const ragPipeline: IRagPipelineNode[] = [
  { id: 'query', icon: '?', labelKey: 'v2.ask.pipeline.query' },
  { id: 'embed', icon: '⟁', labelKey: 'v2.ask.pipeline.embed' },
  { id: 'vector', icon: '▦', labelKey: 'v2.ask.pipeline.vector' },
  { id: 'llm', icon: '✦', labelKey: 'v2.ask.pipeline.llm' },
  { id: 'answer', icon: '↩', labelKey: 'v2.ask.pipeline.answer' }
]

export const ragQuestions: IRagQuestion[] = [
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
      { src: 'experience.json#atalaia', score: '0.88', textKey: 'v2.ask.q3_chunk1' },
      { src: 'skills.json#data', score: '0.79', textKey: 'v2.ask.q3_chunk2' }
    ]
  }
]
