import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styled from 'styled-components';

import GET_SINGLE_QUESTIONNAIRE from "../graphql/getSingleQuiz";
import { useState } from "react";

  const Item2= styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '97%',
  }));

  const Item = styled(Item2)`
  &:hover {
    background: rgba(0,0,0,0.08);
    color: black;
  }
  `

const QuizTest = () => {
    const { id } = useParams<CategoryParams>()
    const [current, setCurrent] = useState(1)
    const [selected, setSelected] = useState<AnswerType>([]);

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

    }

    const handleSelected = (questionId: string, answerId: string) => {
        
        const currentAnswer = {
            [questionId]: answerId
        }
        if(selected?.indexOf(currentAnswer) !== -1) {
            console.log("Already selected")
        } else {
            const newSelected = selected.push(currentAnswer)
            console.log(setSelected, newSelected)
        }
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
    </Paper>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
            {currentQuestion && currentQuestion.answers.map((item: any) => 
            <Item key={item.id} onClick={() => handleSelected(currentQuestion.id, item.id)}>
                {item.title}
          </Item> )   
        }
          <Pagination count={questions.length} variant="outlined" shape="rounded" onChange={handlePageChange} page={current} 
          
          />
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

interface StringMap { [key: string]: string; }

type AnswerType = Array<StringMap>;
