import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

import { useGetCategory } from "../graphql/getCategoryx";
import QuestionnaireTable from "../components/quiz/QuestionnaireTable";

const CategoryDetailed = () => {
  const { categoryId } = useParams<CategoryParams>();
  const { data, error, isLoading, isSuccess } = useGetCategory(categoryId);

  const category = isSuccess && data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper elevation={3} sx={{ padding: "3rem" }}>
      <h1>{category.name}</h1>
      <Typography
        variant="body1"
        className="description"
        sx={{ marginBottom: "3rem" }}
      >
        {category.description}
      </Typography>

      <QuestionnaireTable rows={category.questionnaires} />
    </Paper>
  );
};

export default CategoryDetailed;

type CategoryParams = {
  categoryId: string;
};
