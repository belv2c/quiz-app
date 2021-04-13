import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import {
  AnswerObject,
  Difficulty,
  QuestionState,
  SettingType,
} from "../../types"
import { fetchQuizQuestions } from "../../utils/quizUtil"
import { QuestionCard } from "../QuestionCard"
import { QuizSettingsForm } from "../QuizSettings"
import { Result } from "../Result"
import "./styles.css"

export function App() {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [sendRequest, setSendRequest] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const [newSetting, newUserSetting] = useState<SettingType>({
    numberOfQuestions: 5,
    difficulty: Difficulty.EASY,
    category: 9,
    categoryName: "",
    name: "",
  })

  const useStyles = makeStyles(() => ({
    root: {
      padding: "10px 20px",
      overflow: "hidden",
      position: "relative",
      textDecoration: "none",
      borderRadius: 20,
      background: "rgba(76, 175, 80, 0.3)",
      border: "none",
      fontSize: "14px",
      textAlign: "center",
      margin: 40,
    },
  }))

  const appStyles = useStyles()

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

  const newQuiz = () => {
    // clear the state to return back to settings page
    setGameOver(true)
    setShowResult(false)
  }

  const nextQuestion = () => {
    //Move onto the next question if not the last question
    const nextQuestion = number + 1

    if (nextQuestion === questions.length) {
      setGameOver(true)
      setShowResult(true)
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
          newSetting.category,
        )
        setQuestions(fetchedData)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
        setGameOver(false)
      }
    }
    fetchQuestions()
  }, [newSetting, sendRequest])

  return (
    <div className="App">
      <header>
        {gameOver && !showResult ? (
          <div>
            <Typography variant="h4" gutterBottom>
              QUIZ WHIZ
            </Typography>
            <QuizSettingsForm
              newUserSetting={newUserSetting}
              setSendRequest={setSendRequest}
            />
          </div>
        ) : null}
        {showResult && gameOver && (
          <Result
            name={newSetting.name}
            totalScore={score}
            numberOfQuestions={newSetting.numberOfQuestions}
            category={newSetting.categoryName || ""}
            difficulty={newSetting.difficulty}
            callback={newQuiz}
          />
        )}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            questions={questions}
          />
        )}
        {!gameOver && !loading && number !== number - 1 ? (
          <Button
            className={appStyles.root}
            type="submit"
            variant="contained"
            onClick={nextQuestion}
          >
            Next Question
          </Button>
        ) : null}
      </header>
    </div>
  )
}
