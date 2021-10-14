import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Set, isSet } from "immutable";

import { useGetSingleQuiz } from "../graphql/getSingleQuiz";

const Item = styled.div`
  cursor: pointer;
  width: 97%;
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

type MyState = {
  isPressed?: any;
  selected?: string;
};

const QuizTest = () => {
  const { id } = useParams<CategoryParams>();
  const [current, setCurrent] = useState(1);
  const [isPressed, setIsPressed] = useState<any>(Set());

  const { data, error, isLoading, isSuccess } = useGetSingleQuiz(id);

  const quiz = isSuccess && data;
  const questions = quiz && quiz.questions;

  const handlePageChange = (event: any) => {
    const getCurrent = event.target.textContent;
    if (getCurrent) {
      setCurrent(parseInt(event.target.textContent, 10));
    }

    if (!getCurrent && current !== questions.length) {
      setCurrent(current + 1);
    }
  };

  const handleSelect = (id: MyState, type: string) => {
    if (type === "SINGLE") {
      const newSet = isPressed.clear();
      setIsPressed(newSet.add(id));
    }
    if (type === "MULTIPLE" && isSet(isPressed)) {
      setIsPressed(
        isPressed.has(id) ? isPressed.remove(id) : isPressed.add(id)
      );
    }
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
        <Typography variant="body1" className="description">
          {currentQuestion.title}
        </Typography>
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
                      handleSelect(item.id, currentQuestion.questionType)
                    }
                    className={
                      isPressed.has(item.id) ? "btn-pressed" : "btn-clear"
                    }
                  >
                    {item.title}
                  </Item>
                ))}
              <Pagination
                count={questions.length}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                page={current}
              />
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

// interface StringMap {
//   [key: string]: string;
// }
