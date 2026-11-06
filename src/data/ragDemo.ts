import type { IRagPipelineNode, IRagQuestion } from '@/interfaces/ragDemo'

export const ragPipeline: IRagPipelineNode[] = [
  { id: 'query', icon: '?', labelKey: 'ask.pipeline.query' },
  { id: 'embed', icon: '⟁', labelKey: 'ask.pipeline.embed' },
  { id: 'vector', icon: '▦', labelKey: 'ask.pipeline.vector' },
  { id: 'llm', icon: '✦', labelKey: 'ask.pipeline.llm' },
  { id: 'answer', icon: '↩', labelKey: 'ask.pipeline.answer' }
]

export const ragQuestions: IRagQuestion[] = [
  {
    id: 'q21',
    questionKey: 'ask.q21',
    answerKey: 'ask.q21_answer',
    relatedIds: ['q23', 'q9', 'q25'],
    chunks: [
      { src: 'src/locales/pt-BR.json#about', score: '0.91', textKey: 'ask.q21_chunk1' },
      { src: 'src/data/experience.ts#self_employed', score: '0.86', textKey: 'ask.q21_chunk2' }
    ]
  },
  {
    id: 'q23',
    questionKey: 'ask.q23',
    answerKey: 'ask.q23_answer',
    relatedIds: ['q3', 'q5', 'q24', 'q6'],
    chunks: [
      { src: 'src/data/experience.ts#inss', score: '0.91', textKey: 'ask.q23_chunk1' },
      { src: 'src/data/experience.ts#fictor', score: '0.86', textKey: 'ask.q23_chunk2' }
    ]
  },
  {
    id: 'q22',
    questionKey: 'ask.q22',
    answerKey: 'ask.q22_answer',
    relatedIds: ['q19', 'q6', 'q26'],
    chunks: [
      { src: 'src/locales/pt-BR.json#location', score: '0.91', textKey: 'ask.q22_chunk1' },
      { src: 'src/locales/pt-BR.json#available_remote', score: '0.86', textKey: 'ask.q22_chunk2' }
    ]
  },
  {
    id: 'q7',
    questionKey: 'ask.q7',
    answerKey: 'ask.q7_answer',
    relatedIds: ['q21', 'q19', 'q25'],
    chunks: [
      { src: 'src/data/education.ts#usp', score: '0.91', textKey: 'ask.q7_chunk1' },
      { src: 'src/data/education.ts#estacio', score: '0.86', textKey: 'ask.q7_chunk2' }
    ]
  },
  {
    id: 'q19',
    questionKey: 'ask.q19',
    answerKey: 'ask.q19_answer',
    relatedIds: ['q7', 'q22', 'q26'],
    chunks: [
      { src: 'src/locales/pt-BR.json#about.languages', score: '0.91', textKey: 'ask.q19_chunk1' },
      { src: 'src/locales/pt-BR.json#available_remote', score: '0.86', textKey: 'ask.q19_chunk2' }
    ]
  },
  {
    id: 'q25',
    questionKey: 'ask.q25',
    answerKey: 'ask.q25_answer',
    relatedIds: ['q5', 'q9', 'q12'],
    chunks: [
      { src: 'docs/ask-about-me-questions.md#q25', score: '0.91', textKey: 'ask.q25_chunk1' },
      { src: 'src/locales/pt-BR.json#about', score: '0.86', textKey: 'ask.q25_chunk2' }
    ]
  },
  {
    id: 'q3',
    questionKey: 'ask.q3',
    answerKey: 'ask.q3_answer',
    relatedIds: ['q2', 'q8', 'q14', 'q15'],
    chunks: [
      { src: 'src/data/experience.ts#fictor', score: '0.91', textKey: 'ask.q3_chunk1' },
      { src: 'src/data/projects.ts#hr_platform', score: '0.86', textKey: 'ask.q3_chunk2' }
    ]
  },
  {
    id: 'q5',
    questionKey: 'ask.q5',
    answerKey: 'ask.q5_answer',
    relatedIds: ['q23', 'q24', 'q17', 'q25'],
    chunks: [
      { src: 'src/data/experience.ts#atalaia_it', score: '0.91', textKey: 'ask.q5_chunk1' },
      { src: 'src/data/experience.ts#atalaia_dev', score: '0.86', textKey: 'ask.q5_chunk2' }
    ]
  },
  {
    id: 'q24',
    questionKey: 'ask.q24',
    answerKey: 'ask.q24_answer',
    relatedIds: ['q23', 'q5', 'q25'],
    chunks: [
      { src: 'src/data/experience.ts#inss', score: '0.91', textKey: 'ask.q24_chunk1' },
      { src: 'src/locales/pt-BR.json#experience.inss', score: '0.86', textKey: 'ask.q24_chunk2' }
    ]
  },
  {
    id: 'q6',
    questionKey: 'ask.q6',
    answerKey: 'ask.q6_answer',
    relatedIds: ['q9', 'q11', 'q22'],
    chunks: [
      { src: 'src/data/experience.ts#self_employed', score: '0.91', textKey: 'ask.q6_chunk1' },
      { src: 'src/locales/pt-BR.json#experience.self_employed', score: '0.86', textKey: 'ask.q6_chunk2' }
    ]
  },
  {
    id: 'q26',
    questionKey: 'ask.q26',
    answerKey: 'ask.q26_answer',
    relatedIds: ['q9', 'q22', 'q19'],
    chunks: [
      { src: 'src/data/profile.ts#email', score: '0.91', textKey: 'ask.q26_chunk1' },
      { src: 'src/data/profile.ts#social', score: '0.86', textKey: 'ask.q26_chunk2' }
    ]
  },
  {
    id: 'q9',
    questionKey: 'ask.q9',
    answerKey: 'ask.q9_answer',
    relatedIds: ['q6', 'q18', 'q26'],
    chunks: [
      { src: 'src/data/experience.ts#self_employed', score: '0.91', textKey: 'ask.q9_chunk1' },
      { src: 'src/data/experience.ts#fictor', score: '0.86', textKey: 'ask.q9_chunk2' }
    ]
  },
  {
    id: 'q1',
    questionKey: 'ask.q1',
    answerKey: 'ask.q1_answer',
    relatedIds: ['q11', 'q12', 'q20'],
    chunks: [
      { src: 'src/data/experience.ts#self_employed', score: '0.91', textKey: 'ask.q1_chunk1' },
      { src: 'src/data/experience.ts#fictor', score: '0.86', textKey: 'ask.q1_chunk2' }
    ]
  },
  {
    id: 'q2',
    questionKey: 'ask.q2',
    answerKey: 'ask.q2_answer',
    relatedIds: ['q3', 'q14', 'q17'],
    chunks: [
      { src: 'src/data/projects.ts#fictor360_ai', score: '0.91', textKey: 'ask.q2_chunk1' },
      { src: 'src/data/skills.ts#ai', score: '0.86', textKey: 'ask.q2_chunk2' }
    ]
  },
  {
    id: 'q4',
    questionKey: 'ask.q4',
    answerKey: 'ask.q4_answer',
    relatedIds: ['q10', 'q14', 'q16'],
    chunks: [
      { src: 'src/data/experience.ts#self_employed', score: '0.91', textKey: 'ask.q4_chunk1' },
      { src: 'src/data/skills.ts#backend', score: '0.86', textKey: 'ask.q4_chunk2' }
    ]
  },
  {
    id: 'q8',
    questionKey: 'ask.q8',
    answerKey: 'ask.q8_answer',
    relatedIds: ['q3', 'q10', 'q18'],
    chunks: [
      { src: 'src/data/projects.ts#super_app', score: '0.91', textKey: 'ask.q8_chunk1' },
      { src: 'src/data/skills.ts#mobile', score: '0.86', textKey: 'ask.q8_chunk2' }
    ]
  },
  {
    id: 'q10',
    questionKey: 'ask.q10',
    answerKey: 'ask.q10_answer',
    relatedIds: ['q4', 'q8', 'q16'],
    chunks: [
      { src: 'src/data/experience.ts#fictor', score: '0.91', textKey: 'ask.q10_chunk1' },
      { src: 'package.json', score: '0.86', textKey: 'ask.q10_chunk2' }
    ]
  },
  {
    id: 'q11',
    questionKey: 'ask.q11',
    answerKey: 'ask.q11_answer',
    relatedIds: ['q6', 'q1', 'q14'],
    chunks: [
      { src: 'src/data/experience.ts#self_employed', score: '0.91', textKey: 'ask.q11_chunk1' },
      { src: 'src/locales/pt-BR.json#experience.self_employed', score: '0.86', textKey: 'ask.q11_chunk2' }
    ]
  },
  {
    id: 'q12',
    questionKey: 'ask.q12',
    answerKey: 'ask.q12_answer',
    relatedIds: ['q13', 'q20', 'q25'],
    chunks: [
      { src: 'src/locales/pt-BR.json#experience.self_employed', score: '0.91', textKey: 'ask.q12_chunk1' },
      { src: 'docs/ask-about-me-questions.md#q12', score: '0.86', textKey: 'ask.q12_chunk2' }
    ]
  },
  {
    id: 'q13',
    questionKey: 'ask.q13',
    answerKey: 'ask.q13_answer',
    relatedIds: ['q12', 'q18', 'q20'],
    chunks: [
      { src: 'docs/ask-about-me-questions.md#q13', score: '0.91', textKey: 'ask.q13_chunk1' },
      { src: 'docs/ask-about-me-questions.md#q12', score: '0.86', textKey: 'ask.q13_chunk2' }
    ]
  },
  {
    id: 'q14',
    questionKey: 'ask.q14',
    answerKey: 'ask.q14_answer',
    relatedIds: ['q3', 'q4', 'q20'],
    chunks: [
      { src: 'src/locales/pt-BR.json#experience.fictor', score: '0.91', textKey: 'ask.q14_chunk1' },
      { src: 'src/data/experience.ts#fictor', score: '0.86', textKey: 'ask.q14_chunk2' }
    ]
  },
  {
    id: 'q15',
    questionKey: 'ask.q15',
    answerKey: 'ask.q15_answer',
    relatedIds: ['q3', 'q17', 'q20'],
    chunks: [
      { src: 'src/locales/pt-BR.json#projects.hr_platform', score: '0.91', textKey: 'ask.q15_chunk1' },
      { src: 'src/locales/pt-BR.json#projects.fictor360_pbi', score: '0.86', textKey: 'ask.q15_chunk2' }
    ]
  },
  {
    id: 'q16',
    questionKey: 'ask.q16',
    answerKey: 'ask.q16_answer',
    relatedIds: ['q3', 'q4', 'q10'],
    chunks: [
      { src: 'src/locales/pt-BR.json#experience.fictor', score: '0.91', textKey: 'ask.q16_chunk1' },
      { src: 'src/locales/pt-BR.json#experience.self_employed', score: '0.86', textKey: 'ask.q16_chunk2' }
    ]
  },
  {
    id: 'q17',
    questionKey: 'ask.q17',
    answerKey: 'ask.q17_answer',
    relatedIds: ['q2', 'q3', 'q5'],
    chunks: [
      { src: 'src/locales/pt-BR.json#experience.atalaia_dev', score: '0.91', textKey: 'ask.q17_chunk1' },
      { src: 'src/locales/pt-BR.json#projects.fictor360_ai', score: '0.86', textKey: 'ask.q17_chunk2' }
    ]
  },
  {
    id: 'q18',
    questionKey: 'ask.q18',
    answerKey: 'ask.q18_answer',
    relatedIds: ['q8', 'q13', 'q20'],
    chunks: [
      { src: 'docs/portfolio-evolution.md#projetos', score: '0.91', textKey: 'ask.q18_chunk1' },
      { src: 'docs/ask-about-me-questions.md#q18', score: '0.86', textKey: 'ask.q18_chunk2' }
    ]
  },
  {
    id: 'q20',
    questionKey: 'ask.q20',
    answerKey: 'ask.q20_answer',
    relatedIds: ['q12', 'q14', 'q15'],
    chunks: [
      { src: 'docs/ask-about-me-questions.md#q20', score: '0.91', textKey: 'ask.q20_chunk1' },
      { src: 'docs/ask-about-me-questions.md#q18', score: '0.86', textKey: 'ask.q20_chunk2' }
    ]
  }
]
