import { useEffect, useState } from "react"
import { fetchQuizQuestions } from "../../utils/quizUtil"
import QuizSettingsForm from "../QuizSettings"
import { QuestionCard } from "../QuestionCard"
import { AnswerObject, SettingType, QuestionState } from "../../types"
import {
  Button,
} from "@material-ui/core";
import "./styles.css"

const TOTAL_QUESTIONS = 10

export function App() {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [sendRequest, setSendRequest] = useState(false)

  const [newSetting, newUserSetting] = useState<SettingType>({
    numberOfQuestions: 5,
    difficulty: "",
    category: 9,
    categoryName: "",
    name: "",
  });

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

  useEffect(() => {
    setLoading(true)
    setGameOver(true)
    setSendRequest(false)

    const fetchQuestions = async () => {
      if (sendRequest) {
        const fetchedData = await fetchQuizQuestions(
          newSetting.numberOfQuestions,
          newSetting.difficulty,
          newSetting.category
        );
        setQuestions(fetchedData)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
        setGameOver(false)
      }
    }
   fetchQuestions();
  }, [newSetting, sendRequest]);

  return (
    <div className="App">
      <header>
        {gameOver || loading || userAnswers.length === TOTAL_QUESTIONS ? (
          <div>
          <QuizSettingsForm 
            newUserSetting={newUserSetting} 
            setSendRequest={setSendRequest}
          />
        </div>
        ) : null}
        {!gameOver ? <p className="name">Hello {newSetting.name}</p> : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={newSetting.numberOfQuestions}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <Button 
              className="next"
              type="submit" 
              variant="contained" 
              color="primary"
              onClick={nextQuestion}
            >
              Next Question
            </Button>
          ) : null}
      </header>
    </div>
  )
}
