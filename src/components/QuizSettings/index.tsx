import React, { useState } from "react"
import { useQuery } from "react-query"
import { CategoriesType, Difficulty, SettingType, SettingPropsType } from "../../types"
import { useQuizCategories, CategoryResponse } from "../../hooks/useQuizCategories"
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import particlesConfig from "../../particlesConfig.json"
import Particles from "react-tsparticles"

const useStyles = makeStyles({
  root: {
    background: "rgba(255, 255, 255, 0.3)",
    padding: "2em",
    position: "absolute",
    width: "40%",
    top: "10%",
    left: "30%",
    marginLeft: "auto",
    justifyItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 14,
  },
  textFields: {
    width: "100%",
    marginTop: "20px",
  },
  tsParticles: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: -1
  }
});

// TODO: add form validation
export const QuizSettingsForm = ({
  newUserSetting,
  setSendRequest,
}: SettingPropsType) => {
  const [newSetting, setUserSetting] = useState<SettingType>({
    numberOfQuestions: 5,
    difficulty: Difficulty.EASY,
    category: 9,
    categoryName: "General Knowledge",
    name: "",
  });
  
  const classes = useStyles()
  const { data } = useQuery<CategoryResponse, Error, CategoriesType[]>(
    ["categories"], 
    useQuizCategories
  );

  if (!data?.length) {
    return (
        <div className="loading">
            ...loading
        </div>
    );
  }
  
  let categoryName = data!.filter((category) => {
      return category.id === newSetting.category
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
      <>
      <Particles options={particlesConfig} id="tsparticles"/>
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
                  difficulty: e.target.value as Difficulty,
                })
              }}
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
                })
              }}
            >
               {data.map((category) =>
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
  </>
  );
}
