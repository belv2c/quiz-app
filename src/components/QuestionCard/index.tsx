import React from "react"
import { AnswerObject } from "../../types"
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core"

interface Props {
  question: string
  answers: string[]
  callback: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

type QuestionProps = React.PropsWithChildren<Props>

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
)

export default QuestionCard
