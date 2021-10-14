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
import { Button, Alert } from "@mui/material";

import Reveal from "../components/Reveal";
import { useGetSingleQuiz } from "../graphql/getSingleQuiz";

type MyState = {
  isPressed?: any;
  selected?: string;
};

const QuizPractice = () => {
  const { id } = useParams<CategoryParams>();
  const [current, setCurrent] = useState(1);
  const [isPressed, setIsPressed] = useState<any>(() => Set());
  const [cq, setCq] = useState<string>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const { data, error, isLoading, isSuccess } = useGetSingleQuiz(id);

  const quiz = isSuccess && data;
  const questions = quiz && quiz.questions;

  //   const handlePageChange = (event: any) => {
  //     const getCurrent = event.target.textContent;
  //     if (getCurrent) {
  //       setCurrent(parseInt(event.target.textContent, 10));
  //     }

  //     if (!getCurrent && current !== questions.length) {
  //       setCurrent(current + 1);
  //     }

  //     setIsPressed(() => isPressed.clear());
  //   };

  const handleNext = (event: any) => {
    if (current !== questions.length) {
      setCurrent(current + 1);
    }

    if (current === questions.length) {
      console.log("OKAY, SUMMARY COMING...");
    }

    if (cq) {
      let response: Record<string, unknown> = {};
      response[cq] = isPressed.toJS();
    }
    setIsPressed(() => isPressed.clear());
    setShowAnswer(false);
    setShowCorrectAnswer(false);
  };

  const handlePrev = (event: any) => {
    if (current !== 0) {
      setCurrent(current - 1);
    }
    setIsPressed(() => isPressed.clear());
    setShowAnswer(false);
    setShowCorrectAnswer(false);
  };

  const handleSelect = (
    id: MyState,
    type: string,
    questionId: string,
    isCorrect: string
  ) => {
    if (type === "SINGLE") {
      const newSet = isPressed.clear();
      setIsPressed(newSet.add(id));
      setShowAnswer(true);
      if (isCorrect) {
        setShowCorrectAnswer(true);
      }
    }
    if (type === "MULTIPLE" && isSet(isPressed)) {
      setIsPressed(
        isPressed.has(id) ? isPressed.remove(id) : isPressed.add(id)
      );
    }
    setCq(questionId);

    console.log(isCorrect);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentQuestion = quiz && quiz.questions[current - 1];

  return (
    <Reveal effect="fadeInDown">
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
      <div>
        {showAnswer && showCorrectAnswer && (
          <Alert severity="success" sx={{ marginBottom: "1rem" }}>
            {currentQuestion.explainAnswer}
          </Alert>
        )}
        {showAnswer && !showCorrectAnswer && (
          <Alert severity="warning" sx={{ marginBottom: "1rem" }}>
            {currentQuestion.explainAnswer}, <strong>Practice More...</strong>
          </Alert>
        )}
      </div>
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
                        currentQuestion.id,
                        item.isCorrect
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
                  disabled
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
    </Reveal>
  );
};

export default QuizPractice;

type CategoryParams = {
  id: string;
};

// interface StringMap {
//   [key: string]: string;
// }

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
