import { ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import classnames from "classnames";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import GET_SINGLE_QUESTIONNAIRE from "../graphql/getSingleQuiz";

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

function RenderOptionButton(item: any): ReactElement {
  const [isPressed, setIsPressed] = useState(false);
  const handleSelected = () => {
    setIsPressed(!isPressed);
  };

  return (
    <Item
      key={item.key}
      onClick={handleSelected}
      className={classnames({
        "btn-pressed": isPressed,
      })}
    >
      {item.title}
    </Item>
  );
}

const QuizTest = () => {
  const { id } = useParams<CategoryParams>();
  const [current, setCurrent] = useState(1);

  const { loading, error, data } = useQuery(GET_SINGLE_QUESTIONNAIRE, {
    variables: { id },
  });

  const quiz = data && data.questionnaireFind;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentQuestion = quiz && quiz.questions[current - 1];
  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: "3rem", marginBottom: "2rem", wordBreak: "break-all" }}
      >
        <h6>{quiz.name}</h6>
        <Typography
          variant="body1"
          className="description"
          sx={{ marginBottom: "3rem" }}
        >
          {currentQuestion.title}
        </Typography>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack spacing={2} justifyContent="center" alignItems="center">
              {currentQuestion?.answers.map((item: any) => (
                <RenderOptionButton {...item} />
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
