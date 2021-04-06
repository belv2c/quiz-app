import React from "react"

export type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
}

export type CategoriesType = {
    id: number;
    name: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export type Question = {
    category: string
    correct_answer: string
    difficulty: Difficulty
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
    numberOfQuestions: number
    difficulty: Difficulty
    category: number
    categoryName: string
    name: string
}

export type SettingPropsType = {
    newUserSetting: React.Dispatch<React.SetStateAction<SettingType>>
    setSendRequest: React.Dispatch<React.SetStateAction<boolean>>
}