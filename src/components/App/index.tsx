import { useEffect, useState } from "react"
import {
  fetchQuizQuestions,
  fetchQuizCategories
} from "../../utils/quizUtil"
import QuizSettingsForm from "../QuizSettings"
import QuestionCard from "../QuestionCard"
import { SettingType, CategoriesType, QuestionState } from "../../types"
import "./styles.css"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

export function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  const [newSetting, setSetting] = useState<SettingType>({
    numberOfQuestions: 5,
    difficulty: "",
    category: 9,
    categoryName: "",
    name: "",
  });

  useEffect(() => {
    const getCategoriesData = async () => {
      const fetchedCategories = await fetchQuizCategories();
      setCategories(fetchedCategories);
    };

    getCategoriesData();
  }, []);

  if (!categories.length) {
    return (
        <div className="loading">
            ...loading
        </div>
    );
  }

  let categoryName = categories.filter((category) => {
      return category.id === newSetting.category;
  });

  const AppliedSettings: SettingType = {
    numberOfQuestions: newSetting.numberOfQuestions,
    difficulty: newSetting.difficulty,
    category: newSetting.category,
    categoryName: categoryName[0].name,
    name: newSetting.name,
  } 

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const fetchedData = await fetchQuizQuestions(
      newSetting.numberOfQuestions,
      newSetting.difficulty,
      newSetting.category
      );
    setSetting(newSetting)
    setQuestions(fetchedData);
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      //Users answer
      const answer = e.currentTarget.value
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1)
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    //Move onto the next question if not the last question
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div>
          <QuizSettingsForm />
            <button className="start" onClick={startTrivia}>
            Start
          </button>
        </div>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions</p>}
        {!gameOver && !loading && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </header>
    </div>
  )
}
