export type CategoriesType = {
    id: number;
    name: string;
}

export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answer: string[] }

export type QuizRequestType = {
    answer: string
    options: string[]
    questions: string
}
  
export type SettingType = {
    numberOfQuestions: number;
    difficulty: string;
    category: number;
    categoryName: string;
    name: string;
}
