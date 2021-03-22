import { CategoriesType, Question, QuestionState } from "../../types"

  export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)
  
  export const fetchQuizQuestions = async (
    amount: number,
    difficulty: string,
    category: number,
  ): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    const data = await (await fetch(endpoint)).json()
    
       return data.results.map((question: Question) => ({
        ...question,
        answer: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }))
    }
  
export const fetchQuizCategories = async (): Promise<CategoriesType[]> => {
  const endpoint = `https://opentdb.com/api_category.php`
  const data = await (await fetch(endpoint)).json()

     return data.trivia_categories.map((category: CategoriesType) => ({
      ...category, 
    }))
  }