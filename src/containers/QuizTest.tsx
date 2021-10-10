import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import GET_SINGLE_QUESTIONNAIRE from "../graphql/getSingleQuiz";
import { useState } from "react";

  const Item2= styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '97%'
  }));

const QuizTest = () => {
    const { id } = useParams<CategoryParams>()
    const [current, setCurrent] = useState(1)
    const { loading, error, data } = useQuery(GET_SINGLE_QUESTIONNAIRE, {
        variables: { id }
    });

    const quiz = data && data.questionnaireFind
    const questions = quiz && quiz.questions

    const handlePageChange = (event: any) => {
        const getCurrent = event.target.textContent;
        if(getCurrent) {
            setCurrent(parseInt(event.target.textContent, 10))
        } 

        if(!getCurrent && current !== questions.length) {
            setCurrent(current + 1)
        }

        console.log('clicked', event)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    const currentQuestion = quiz && quiz.questions[current - 1];
    return (
        <>
        <Paper elevation={3} sx={{padding: '3rem', marginBottom: '2rem', wordBreak: 'break-all'}}> 
        <h6>
         {quiz.name}
        </h6>
        <Typography variant="body1" className="description" sx={{marginBottom: '3rem'}}>
            {currentQuestion.title}
        </Typography>
        {console.log(quiz)}
    </Paper>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
            {currentQuestion && currentQuestion.answers.map((item: any) => 
            <Item2 key={item.id}>
                {item.title}
          </Item2> )   
        }
          <Pagination count={questions.length} variant="outlined" shape="rounded" onChange={handlePageChange} page={current} 
          
          />
          {console.log(current)}
          </Stack>
        </Grid>
      </Grid>
    </Box>
    </>
    )
}

export default QuizTest

type CategoryParams = {
    id: string;
};
