import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import cx from "clsx"
import React from "react"
import { AnswerObject } from "../../types"
import { AnswerButton } from "../AnswerButton"

interface Props {
  question: string
  answers: string[]
  callback: React.MouseEventHandler<HTMLButtonElement>
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
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
  totalQuestions,
}: QuestionProps) => {
  const cardStyles = useStyles()

  return (
    <div className={cx(cardStyles.root)}>
      <div>
        <div>
          <Typography
            className={cardStyles.title}
            color="textSecondary"
            gutterBottom
          >
            Question: {questionNumber} / {totalQuestions}
          </Typography>
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
