import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { AnswerObject } from "../../types"

interface Props {
  answers: string[]
  callback: React.MouseEventHandler<HTMLButtonElement>
  userAnswer: AnswerObject | undefined
}

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
    minWidth: 275,
  },
}))

export const AnswerButton = ({ answers, callback, userAnswer }: Props) => {
  const buttonStyles = useStyles()

  return (
    <Grid container spacing={3}>
      {answers.map((answer) => (
        <Grid item xs={6} key={answer}>
          <Button
            className={buttonStyles.root}
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span>{answer}</span>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
