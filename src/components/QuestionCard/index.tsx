import React from "react"
import { AnswerObject } from "../../types"
import {
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@material-ui/core"
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  question: string
  answers: string[]
  callback: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

type QuestionProps = React.PropsWithChildren<Props>

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1000,
    borderRadius: 20,
  },
  content: {
    padding: 24,
    textAlign: "left"
  },
  title: {
    fontSize: 14,
  },
}));

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: QuestionProps ) => {
  const cardStyles = useStyles();

  return (
    <Card className={cx(cardStyles.root)}>
      <CardContent className={cardStyles.content}>
        <div>
        <Typography className={cardStyles.title} color="textSecondary" gutterBottom>
          Question: {questionNumber} / {totalQuestions}
        </Typography>
          <p>
            {question} 
          </p>
          <div>
            {answers.map((answer) => ( 
              <div key={answer}>
                <form>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="quiz" name="quiz" onChange={callback}>
                      <FormControlLabel value={answer} control={<Radio />} label={answer} />
                    </RadioGroup>
                  </FormControl>
                </form>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
