import AdSense from "react-adsense";
import { Paper, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

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
      <div className="description" style={{ marginBottom: "3rem" }}>
        <ReactMarkdown>{category.description}</ReactMarkdown>
      </div>
      <QuestionnaireTable rows={category.questionnaires} />
      <Box>
        <AdSense.Google
          client="ca-pub-0061264678585687"
          slot="9429388490"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </Box>
    </Paper>
  );
};

export default CategoryDetailed;

type CategoryParams = {
  categoryId: string;
};
