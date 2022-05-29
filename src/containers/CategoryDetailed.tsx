import { Paper } from "@mui/material";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useGetCategory } from "../graphql/getCategoryx";
import QuestionnaireTable from "../components/quiz/QuestionnaireTable";

const CategoryDetailed = () => {
  const { categoryId } = useParams<CategoryParams>();
  const { data, error, isLoading, isSuccess } = useGetCategory(categoryId);

  const category = isSuccess && data;

  if (isLoading) return <Skeleton variant="rectangular" height={500} />;

  if (error) return <p>Error :(</p>;

  return (
    <Paper elevation={3} sx={{ padding: "3rem" }}>
      <StyledCategoryTitled variant="h1">{category.name}</StyledCategoryTitled>
      <div className="description" style={{ marginBottom: "3rem" }}>
        <ReactMarkdown>{category.description}</ReactMarkdown>
      </div>
      <QuestionnaireTable rows={category.questionnaires} />
    </Paper>
  );
};

export default CategoryDetailed;

type CategoryParams = {
  categoryId: string;
};

const StyledCategoryTitled = styled(Typography)`
  word-break: break-word;
  font-size: 2.5rem;
  line-height: 1.2222222222222223;
  letter-spacing: 0;
  font-weight: 800;
  margin: 16px 0;
  color: #0a1929;
`;
