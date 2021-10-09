import { useQuery } from "@apollo/client";
import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router";

import GET_SINGLE_CATEGORY from "../graphql/getCategoryx"
import QuestionnaireTable from "../components/quiz/QuestionnaireTable";

const CategoryDetailed = () => {
    const { categoryId } = useParams<CategoryParams>()
    const { loading, error, data } = useQuery(GET_SINGLE_CATEGORY, {
        variables: { id: categoryId }
    });

    const category = data && data.categoryFind

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Paper elevation={3} sx={{padding: '3rem'}}> 
            <h1>
             {category.name}
            </h1>
            <Typography variant="body1" className="description" sx={{marginBottom: '3rem'}}>
                {category.description}
            </Typography>
            
            <QuestionnaireTable rows = {category.questionnaires} />
        </Paper>
    )
}

export default CategoryDetailed

type CategoryParams = {
    categoryId: string;
};