export interface Answer {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export type AnswerPartial = Partial<Answer>