import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useGetCategories } from "../graphql/getCategories";
import CategoryViewCard from "../components/category/CategoryViewCard";

function Categoryies() {
  const { data, error, isLoading, isSuccess } = useGetCategories();

  const rows = isSuccess && data.rows;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
      >
        {rows &&
          rows.map((item: any, index: string) => (
            <Grid item xs={4} sm={4} md={4} key={item.id}>
              <CategoryViewCard title={item.name} {...item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Categoryies;
