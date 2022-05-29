import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Set, isSet } from "immutable";
import ReactMarkdown from "react-markdown";
import { Button } from "@mui/material";
// import { useStateMachine } from "little-state-machine";

import { useGetSingleQuiz } from "../graphql/getSingleQuiz";

type MyState = {
  isPressed?: any;
  selected?: string;
};

// function updateAction(state: any, payload: any) {
//   console.log("state:", state);
//   console.log("payload:", payload);
//   return {
//     ...state,
//     response: state.response.push(payload),
//   };
// }

const QuizTest = () => {
  const { id } = useParams<CategoryParams>();
  const [current, setCurrent] = useState(1);
  const [isPressed, setIsPressed] = useState<any>(() => Set());

  const { data, error, isLoading, isSuccess } = useGetSingleQuiz(id);

  const quiz = isSuccess && data;
  const questions = quiz && quiz.questions;

  // const handlePageChange = (event: any) => {
  //   const getCurrent = event.target.textContent;
  //   if (getCurrent) {
  //     setCurrent(parseInt(event.target.textContent, 10));
  //   }

  //   if (!getCurrent && current !== questions.length) {
  //     setCurrent(current + 1);
  //   }

  //   setIsPressed(() => isPressed.clear());
  // };

  const handleNext = (event: any) => {
    if (current !== questions.length) {
      setCurrent(current + 1);
    }

    if (current === questions.length) {
      console.log("OKAY, SUMMARY COMING...");
    }

    setIsPressed(() => isPressed.clear());
  };

  const handlePrev = (event: any) => {
    if (current !== 0) {
      setCurrent(current - 1);
    }
    setIsPressed(() => isPressed.clear());
  };

  const handleSelect = (id: MyState, type: string, questionId: string) => {
    if (type === "SINGLE") {
      const newSet = isPressed.clear();
      setIsPressed(newSet.add(id));
    }
    if (type === "MULTIPLE" && isSet(isPressed)) {
      setIsPressed(
        isPressed.has(id) ? isPressed.remove(id) : isPressed.add(id)
      );
    }
    // setCq(questionId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentQuestion = quiz && quiz.questions[current - 1];

  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: "3rem", marginBottom: "2rem", wordBreak: "break-all" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h6>{quiz.name}</h6>
          <h6>{currentQuestion.questionType}</h6>
        </Box>
        <div className="description">
          <ReactMarkdown>{currentQuestion.title}</ReactMarkdown>
        </div>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack spacing={2} justifyContent="center" alignItems="center">
              {currentQuestion &&
                currentQuestion?.answers.map((item: any) => (
                  <Item
                    key={item.id}
                    onClick={() =>
                      handleSelect(
                        item.id,
                        currentQuestion.questionType,
                        currentQuestion.id
                      )
                    }
                    className={
                      isPressed.has(item.id) ? "btn-pressed" : "btn-clear"
                    }
                  >
                    {item.title}
                  </Item>
                ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  disabled={current - 1 === 0}
                  onClick={handlePrev}
                >
                  Previous
                </Button>
                <Pagination
                  count={questions.length}
                  variant="outlined"
                  shape="rounded"
                  // onChange={handlePageChange}
                  page={current}
                />
                <Button variant="outlined" size="large" onClick={handleNext}>
                  {current === questions.length ? "Submit" : "Next"}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default QuizTest;

type CategoryParams = {
  id: string;
};

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  background: white;
  padding: 1rem;
  transition: all 0.3s ease-out;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: black;
    transform: translate(5px);
  }

  &:focus {
    background: green;
  }
`;
