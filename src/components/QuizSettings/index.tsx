import { useState } from "react"
import { useForm } from "react-hook-form"
import { SettingType } from "../../types"

const QuizSettingsForm: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({}) => {
    const [userSetting, setUserSetting] = useState<SettingType>({
        numberOfQuestions: 5,
        difficulty: "easy",
        category: 9,
        categoryName: "General Knowledge",
        name: "",
      });
    const { register, errors } = useForm<SettingType>()
    return (
      <form >
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={register}
            value={userSetting.name}
            onChange={(e) => {
                setUserSetting({
                  ...userSetting,
                  name: String(e.target.value),
                })
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="numberOfQuestions">Number Of Questions</label>
          <input
            type="number"
            id="numberOfQuestions"
            name="numberOfQuestions"
            ref={register({required: true})}
            value={userSetting.numberOfQuestions}
            onChange={(e) => {
                setUserSetting({
                  ...userSetting,
                  numberOfQuestions: Number(e.target.value),
                })
            }}
          />
          {errors.numberOfQuestions && errors.numberOfQuestions.type === "required" && (
          <div className="error">You must enter the number of questions</div>
        )}
        </div>
        <div className="field">
          <label htmlFor="score">Difficulty</label>
          <input
            type="string"
            id="difficulty"
            name="difficulty"
            ref={register({required: true})}
            value={userSetting.difficulty}
            onChange={(e) => {
                setUserSetting({
                  ...userSetting,
                  difficulty: String(e.target.value),
                })
            }}
          />
            {errors.difficulty && errors.difficulty.type === "required" && (
            <div className="error">You must select a difficulty</div>
        )}
        </div>
        <div className="field">
          <label htmlFor="score">Category</label>
          <input
            type="string"
            id="category"
            name="category"
            ref={register({required: true})}
            value={userSetting.category}
            onChange={(e) => {
                setUserSetting({
                  ...userSetting,
                  category: Number(e.target.value),
                })
            }}
          />
           {errors.category && errors.category.type === "required" && (
            <div className="error">You must select a category</div>
        )}
        </div>
      </form>
    );
    
  };

  export default QuizSettingsForm