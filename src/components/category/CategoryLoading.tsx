import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const CategoryLoading = () => {
  const rows = [1, 2, 3, 4, 5, 6];
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
      >
        {rows &&
          rows.map((item: number, index: number) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={400} />
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CategoryLoading;
