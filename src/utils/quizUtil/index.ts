/**
 * quizUtil
 * ------------------------------------------------
 * DESCRIPTION_HERE
 */
 export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
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
  
  export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)
  
  export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty,
  ): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
  
    //console.log(data);
  
    return data.results.map((question: Question) => ({
      ...question,
      answer: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))
  }
  
  export const quizUtil = <A>(x: A) => x
  