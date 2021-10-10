import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";

import GET_CATEGORY from "../graphql/getCategories";
import CategoryViewCard from "../components/category/CategoryViewCard";

function Categoryies() {
  const { loading, error, data } = useQuery(GET_CATEGORY);

  const rows = data && data.categoryList.rows;

  if (loading) return <p>Loading...</p>;
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
