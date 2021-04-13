import { Step, StepLabel, Stepper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import cx from "clsx"
import React from "react"
import { AnswerObject, QuestionState } from "../../types"
import { AnswerButton } from "../AnswerButton"

interface Props {
  question: string
  answers: string[]
  callback: React.MouseEventHandler<HTMLButtonElement>
  userAnswer: AnswerObject | undefined
  questionNumber: number
  questions: QuestionState[]
}

type QuestionProps = React.PropsWithChildren<Props>

const useStyles = makeStyles(() => ({
  root: {
    width: "40%",
    margin: "0 auto",
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
  },
  question: {
    fontSize: 20,
    marginBottom: 50,
  },
}))

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  questions,
}: QuestionProps) => {
  const cardStyles = useStyles()

  return (
    <div className={cx(cardStyles.root)}>
      <div>
        <div>
          <Stepper activeStep={questionNumber - 1} alternativeLabel={false}>
            {questions.map((label, i) => (
              <Step key={i}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <p className={cardStyles.question}>{question}</p>
          <AnswerButton
            answers={answers}
            callback={callback}
            userAnswer={userAnswer}
          />
        </div>
      </div>
    </div>
  )
}
