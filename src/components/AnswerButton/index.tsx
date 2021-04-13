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
    justifyContent: "center",
  },
  button: {
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
  const styles = useStyles()

  return (
    <Grid className={styles.root} container spacing={3}>
      {answers.map((answer) => (
        <Grid item key={answer}>
          <Button
            className={styles.button}
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
