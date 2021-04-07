import { Question, QuestionState } from "../../types"

export const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5)

// TODO: useQuizQuestions - move to hooks folder
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: string,
  category: number,
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }))
}
