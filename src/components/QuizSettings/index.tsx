import React, { useEffect, useState } from "react"
import { CategoriesType, Difficulty, SettingType, SettingPropsType } from "../../types"
import { fetchQuizCategories } from "../../utils/quizUtil"
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    justifyItems: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    display: "flex",
  },
  title: {
    fontSize: 14,
  },
  textFields: {
    width: "100%",
    marginTop: "20px",
  }
});

// TODO: refactor to not use React.FC
// TODO: add error handling
const QuizSettingsForm: React.FC<SettingPropsType> = ({
  newUserSetting,
  setSendRequest
}) => {
  const [categories, setCategories] = useState<CategoriesType[]>([])
  const [newSetting, setUserSetting] = useState<SettingType>({
      numberOfQuestions: 5,
      difficulty: "easy",
      category: 9,
      categoryName: "General Knowledge",
      name: "",
    });

    const classes = useStyles();

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
      <div>
        <div className={classes.root}>
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <TextField
              className={classes.textFields}
              type="text"
              id="standard-basic"
              label="What's your name?"
              value={newSetting.name}
              variant="outlined"
              onChange={(e) => {
                  setUserSetting({
                    ...newSetting,
                    name: String(e.target.value),
                  })
              }}
            />
          </div>
          <div className="field">
            <TextField
              className={classes.textFields}
              type="number"
              id="standard-basic"
              label="Number of Questions"
              name="numberOfQuestions"
              value={newSetting.numberOfQuestions}
              variant="outlined"
              onChange={(e) => {
                  setUserSetting({
                    ...newSetting,
                    numberOfQuestions: Number(e.target.value),
                  })
              }}
            />
          </div>
          <FormControl className={classes.textFields}>
            <InputLabel htmlFor="grouped-native-select">
              Select Difficulty
            </InputLabel>
            <Select
              id="grouped-native-select"
              native
              onChange={(e) => {
                setUserSetting({
                  ...newSetting,
                  difficulty: String(e.target.value),
              })}}
            >
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </Select>
          </FormControl>
          <FormControl className={classes.textFields}>
            <InputLabel htmlFor="grouped-native-select">
              Select Category
            </InputLabel>
            <Select
              id="grouped-native-select"
              native
              onChange={(e) => {
                setUserSetting({
                  ...newSetting,
                  category: Number(e.target.value),
                  categoryName: String(e.target.value)
                })}}
            >
               {categories.map((category) =>
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )}
            </Select>
          </FormControl>
          <Box pt={4} pb={1}>
            <Button type="submit" variant="contained" color="primary">
              Take the quiz!
            </Button>
          </Box>
      </form>
    </div>
  </div>
  );
}

export default QuizSettingsForm