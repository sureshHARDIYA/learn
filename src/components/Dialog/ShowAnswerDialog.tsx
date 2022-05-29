import { forwardRef } from "react";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { StyledHeading } from "../../containers/QuizPractice";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow in={true} ref={ref} {...props} />;
});

export const getSelectedAnswers = (
  correctCandiates: any,
  selectedAnswers: any
) => {
  const selected: any[] = [];

  selectedAnswers.forEach((item: string) => {
    const getTitle = correctCandiates.find(
      (row: Record<string, unknown>) => row.id === item
    );
    if (getTitle) {
      selected.push(getTitle.title);
    }
  });

  return selected;
};

export default function ShowAnswerDailog(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const getoNextAndClose = () => {
    props.setOpen(false);
    props.handleGotToNext();
  };

  const correctCandiates = props.correctAnswers.filter(
    (row: Record<string, unknown>) => row.isCorrect
  );
  const correctAnswer = correctCandiates.flatMap(
    (row: Record<string, unknown>) => row.title
  );

  const selected = getSelectedAnswers(
    props.correctAnswers,
    props.selectedAnswers
  );

  const alertType =
    selected.join(",") === correctAnswer.join(",") ? "success" : "warning";

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition as any}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">
            <StyledHeading>Explanation:</StyledHeading> {props.message}
          </Alert>
          <Alert severity={alertType}>
            <StyledHeading>Selected Answer:</StyledHeading>
            {selected.join(",")}
          </Alert>
          <Alert severity="success">
            <StyledHeading>Correct Answer:</StyledHeading>{" "}
            {correctAnswer.join(",")}
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={getoNextAndClose}>Goto Next Question</Button>
      </DialogActions>
    </Dialog>
  );
}
