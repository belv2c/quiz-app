import React from "react"
import { AnswerObject } from "../../types"

interface Props {
  question: string
  answers: string[]
  //callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  callback: React.MouseEventHandler<HTMLButtonElement>
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

type QuestionProps = React.PropsWithChildren<Props>;

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: QuestionProps ) => (
  <div>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p>
      {question} 
    </p>
    <div>
      {answers.map((answer) => ( 
        <div key={answer}>
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span>
              {answer}
            </span>
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard
