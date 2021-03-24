import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box, Typography, Grid, Button } from "@material-ui/core"

type ResultProps = {
  name: string
  totalScore: number
  numberOfQuestions: number
  category: string
  difficulty: string
  callback: () => void
}
  
type resultStateType = [
  { name: string; value: string },
  { name: string; value: number },
  { name: string; value: string },
  { name: string; value: string },
  { name: string; value: number }
]

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
  },
  result: {
    width: "100%",
    boxShadow:
      "0 15px 15px -1px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    background: "white",
    borderRadius: "0.5rem",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
  inputFields: {
    width: "100%",
    marginTop: "20px",
  },
  resultHeader: {
    background: theme.palette.info.light,
    color: "white",
    borderRadius: "0.5rem",
  },
}))

export const Result = ({
  name,
  callback,
  category,
  difficulty,
  numberOfQuestions,
  totalScore,
}: ResultProps ) => {
  const classes = useStyle()
  const result: resultStateType = [
    { name: "name", value: name },
    { name: "total questions", value: numberOfQuestions },
    { name: "difficulty level", value: difficulty },
    { name: "category", value: category },
    { name: "score", value: totalScore },
  ]

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.result}>
          <Box p={3}>
            <Box py={1} className={classes.resultHeader}>
              <Typography variant="h5" align="center">
              {totalScore > numberOfQuestions - 1 
                ? <p>You're a quiz whiz ${name}</p> 
                : <p>Better luck next time ${name}</p> }
              </Typography>
            </Box>
            <Box pb={1} px={1} pt={3}>
              {result.map((result: any, i: number) => (
                <div key={i}>
                  <Box py={1}>
                    <Grid container>
                      <Grid
                        item
                        container
                        xs={6}
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Typography
                          style={{
                            fontWeight: 550,
                            textTransform: "capitalize",
                          }}
                          variant="subtitle1"
                          align="center"
                        >
                          {result.name}:
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={6}
                        justify="center"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          align="center"
                          style={{
                            fontWeight: 550,
                            textTransform: "capitalize",
                          }}
                        >
                          {result.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <hr
                    style={{
                      borderColor: "#259cf7",
                      borderWidth: "1px",
                      borderBottom: "none",
                    }}
                  />
                </div>
              ))}
              <Box pt={4}>
                <Button variant="contained" color="primary" onClick={callback}>
                  Start a new quiz
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}
