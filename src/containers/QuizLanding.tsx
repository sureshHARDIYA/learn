import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


import GET_SINGLE_QUESTIONNAIRE from "../graphql/getSingleQuiz";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  const Item2= styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between'
  }));

const QuizLanding = () => {
    const { id } = useParams<CategoryParams>()
    const history = useHistory()
    const { loading, error, data } = useQuery(GET_SINGLE_QUESTIONNAIRE, {
        variables: { id }
    });

    const handleTestClick = () => {
        history.push(`${history.location.pathname}/test`)
    }

    const quiz = data && data.questionnaireFind

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
        <Paper elevation={3} sx={{padding: '3rem', marginBottom: '2rem', wordBreak: 'break-all'}}> 
        <h1>
         {quiz.name}
        </h1>
        <Typography variant="body1" className="description" sx={{marginBottom: '3rem'}}>
            {quiz.description}
        </Typography>
    </Paper>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
              <h4>Level: {quiz.level}</h4>
              <h4>Author: {quiz.createdBy.firstName}</h4>
              <h4>Cateogry: {quiz.category.name}</h4>
              <h4>Created at: {quiz.createdAt}</h4>
              <h4>Last updated at: {quiz.updatedAt}</h4>
              <h4>Number of times played: 55</h4>
              <h4>Total number of questions: {quiz.questions.length}</h4>
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item2>
          <span>You can practice questions. Answers will be shown immediately.</span>
            <Button variant="outlined" size="large">
                 PRACTICE
            </Button>
          </Item2>
          <p />
          <Item2>
            <span>You can take test. Answers will be shown when you finish test.</span>
            <Button variant="outlined" size="large" onClick={handleTestClick}>
            TAKE TEST
            </Button>
          </Item2>
        </Grid>
      </Grid>
    </Box>
    </>
    )
}

export default QuizLanding

type CategoryParams = {
    id: string;
};
