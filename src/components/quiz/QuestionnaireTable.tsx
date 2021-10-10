import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TableContainer from "@mui/material/TableContainer";

export default function QuestionnaireTable(props: any) {
  const history = useHistory();

  const handleQuizNavigation = (id: string) => {
    history.push(`/quiz/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quiz Names</TableCell>
            <TableCell align="right">Number of times played</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography className="description">{row.name}</Typography>
              </TableCell>
              <TableCell align="right">{row.views}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  onClick={() => handleQuizNavigation(row.id)}
                >
                  <PlayArrowIcon /> Start Quiz
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
