import { Set } from "immutable";
import Box from "@mui/material/Box";
import isEqual from "lodash/isEqual";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useReducer, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";

import Reveal from "../components/Reveal";
import { useGetSingleQuiz } from "../graphql/getSingleQuiz";
import ShowAnswerDailog, {
  getSelectedAnswers,
} from "../components/Dialog/ShowAnswerDialog";

const practiceReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ANSWER_SELECTED_SINGLE":
      return {
        ...state,
        answersSelected: state.answersSelected.clear().add(action.payload),
        checkAnswerButtonDisabled: false,
      };

    case "ANSWER_SELECTED_MULTIPLE":
      return {
        ...state,
        answersSelected: state.answersSelected.add(action.payload),
        checkAnswerButtonDisabled: false,
      };

    case "GOTO_NEXT_QUESTION":
      return {
        ...state,
        answersSelected: state.answersSelected.clear(),
        checkAnswerButtonDisabled: true,
      };

    case "CHECK_ANSWER_CLICKED":
      /** Store in localstorage and make sure it is answered... */
      return {
        ...state,
        checkAnswerButtonDisabled: true,
        isAnwerSubmitted: true,
        showAnswer: true,
      };
  }
};

const initialState = {
  answersSelected: Set(),
  showAnswer: false,
  selectionDisabled: false,
  checkAnswerButtonDisabled: true,
  isAnswerSubmitted: false,
};

const QuizPractice = () => {
  const { id } = useParams<CategoryParams>();
  const [current, setCurrent] = useState(1);
  const [playerStates, dispatch] = useReducer(practiceReducer, initialState);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

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

  const handleNext = (event: any) => {
    dispatch({ type: "GOTO_NEXT_QUESTION", payload: undefined });
    if (current !== questions.length) {
      setCurrent(current + 1);
    }

    if (current === questions.length) {
      console.log("OKAY, SUMMARY COMING...");
    }
  };

  const currentQuestion = quiz && quiz.questions[current - 1];

  const handleCheckAnswer = () => {
    const correctAnswer = currentQuestion.answers.filter(
      (row: Record<string, unknown>) => row.isCorrect
    );

    setOpen(true);

    if (playerStates.answersSelected.size) {
      const selectedAnswers = playerStates.answersSelected.toJS();

      /** IF QUESTION TYPE === SINGE */
      if (currentQuestion.questionType === "SINGLE") {
        const title = selectedAnswers.includes(correctAnswer[0].id)
          ? "Correct"
          : "Wrong";
        setTitle(`${title} Answer selected`);
      }

      /** MULTIPLE ANSWERS */
      if (currentQuestion.questionType === "MULTIPLE") {
        const selected = getSelectedAnswers(
          currentQuestion.answers,
          playerStates.answersSelected.toJS()
        );

        const correctTitles = correctAnswer.flatMap(
          (row: Record<string, unknown>) => row.title
        );

        const isAnswerCorrectly = isEqual(selected, correctTitles);

        const title = isAnswerCorrectly ? "Correct" : "Wrong";
        setTitle(`${title} Answer selected`);
      }
    }

    dispatch({ type: "CHECK_ANSWER_CLICKED", payload: undefined });
  };

  const handlePrev = (event: any) => {
    if (current !== 0) {
      setCurrent(current - 1);
    }
    dispatch({ type: "GOTO_NEXT_QUESTION", payload: undefined });
  };

  const handleGotToNext = () => {
    dispatch({ type: "GOTO_NEXT_QUESTION", payload: undefined });
    if (current !== questions.length) {
      setCurrent(current + 1);
    }
  };

  const handleSelect = (id: string, type: string) => {
    if (type === "SINGLE") {
      dispatch({ type: "ANSWER_SELECTED_SINGLE", payload: id });
    }
    if (type === "MULTIPLE") {
      dispatch({ type: "ANSWER_SELECTED_MULTIPLE", payload: id });
    }
  };

  if (isLoading) return <Skeleton variant="rectangular" height={500} />;

  if (error) return <p>Error :(</p>;

  return (
    <Reveal effect="fadeInDown">
      <Paper
        elevation={3}
        sx={{ padding: "3rem", marginBottom: "2rem", wordBreak: "break-all" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h6>
            <StyledHeading>CATEGORY:</StyledHeading> {quiz.name}
          </h6>
          <h6>
            <StyledHeading>Type:</StyledHeading>
            {currentQuestion.questionType}
          </h6>
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
                      handleSelect(item.id, currentQuestion.questionType)
                    }
                    className={
                      playerStates.answersSelected.has(item.id)
                        ? "btn-pressed"
                        : "btn-clear"
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="text"
                    size="large"
                    disabled={current - 1 === 0}
                    onClick={handlePrev}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleNext}
                    // disabled={playerStates.checkAnswerButtonDisabled}
                  >
                    Next
                  </Button>
                </Box>
                <Pagination
                  count={questions.length}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                  disabled
                  page={current}
                />
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCheckAnswer}
                  disabled={playerStates.checkAnswerButtonDisabled}
                >
                  Check Answer
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <ShowAnswerDailog
        title={title}
        message={currentQuestion.explainAnswer}
        open={open}
        setOpen={setOpen}
        selectedAnswers={playerStates.answersSelected}
        correctAnswers={currentQuestion.answers}
        handleGotToNext={handleGotToNext}
      />
    </Reveal>
  );
};

export default QuizPractice;

type CategoryParams = {
  id: string;
};

const Item = styled.button`
  cursor: pointer;
  width: 100%;
  background: white;
  padding: 1rem;
  transition: all 0.3s ease-out;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  border: 0px;
  text-align: left;
  font-size: 1.2rem;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: black;
  }

  &:focus {
    background: green;
  }
`;

export const StyledHeading = styled.span`
  text-decoration: underline;
  margin-right: 10px;
`;
