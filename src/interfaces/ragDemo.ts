export interface IRagPipelineNode {
  id: string
  icon: string
  labelKey: string
}

export interface IRagChunk {
  src: string
  score: string
  textKey: string
}

export interface IRagQuestion {
  id: string
  questionKey: string
  answerKey: string
  chunks: IRagChunk[]
}
