import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { CategoriesType, Difficulty, SettingType, SettingPropsType } from "../../types"
import { fetchQuizCategories } from "../../utils/quizUtil"

const QuizSettingsForm: React.FC<SettingPropsType> = ({
  newUserSetting,
  setSendRequest
}) => {
  const [categories, setCategories] = useState<CategoriesType[]>([])
  const { register, errors } = useForm<SettingType>()

    const [newSetting, setUserSetting] = useState<SettingType>({
        numberOfQuestions: 5,
        difficulty: "easy",
        category: 9,
        categoryName: "General Knowledge",
        name: "",
      });

    useEffect(() => {
      const getCategoriesData = async () => {
        const fetchedCategories = await fetchQuizCategories();
        setCategories(fetchedCategories);
      };
  
      getCategoriesData();
    }, []);
  
    if (!categories.length) {
      return (
          <div className="loading">
              ...loading
          </div>
      );
    }
  
    let categoryName = categories.filter((category) => {
        return category.id === newSetting.category;
    });
  
    const appliedSettings: SettingType = {
      numberOfQuestions: newSetting.numberOfQuestions,
      difficulty: newSetting.difficulty,
      category: newSetting.category,
      categoryName: categoryName[0].name,
      name: newSetting.name
    }
  
    const handleFormSubmit = (e: React.FormEvent<EventTarget>) => {
      e.preventDefault()
      newUserSetting(appliedSettings)
      setSendRequest(true)
    }

    return (
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={register}
            value={newSetting.name}
            onChange={(e) => {
                setUserSetting({
                  ...newSetting,
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
            value={newSetting.numberOfQuestions}
            onChange={(e) => {
                setUserSetting({
                  ...newSetting,
                  numberOfQuestions: Number(e.target.value),
                })
            }}
          />
          {errors.numberOfQuestions && errors.numberOfQuestions.type === "required" && (
          <div className="error">You must enter the number of questions</div>
        )}
        </div>
        <div className="difficulty">
          <select name="difficulty" ref={register} 
            onChange={(e) => {
              setUserSetting({
                ...newSetting,
                difficulty: String(e.target.value),
            })}}>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
          </select>
        </div>
        <div className="category">
          <select name="category" ref={register} 
            onChange={(e) => {
              setUserSetting({
                ...newSetting,
                category: Number(e.target.value),
                categoryName: String(e.target.value)
            })}}>
                {categories.map((category) =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
                )}
          </select>
        </div>
        <button type="submit">
          Start the quiz!!
        </button>
      </form>
    );
  }

export default QuizSettingsForm