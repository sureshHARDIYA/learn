import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MAX_LENGTH = 150;

export default function CategoryViewCard(props: any): JSX.Element {
  const history = useHistory();

  function handleClick(id: string): void {
    history.push(`/categories/${id}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleClick(props.id)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={props.title}
          subheader={props.createdAt}
        />
        <CardMedia
          component="img"
          height="194"
          image={props.featuredImage[0].publicUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description.substr(0, MAX_LENGTH)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
