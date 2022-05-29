import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import "../App.css";
import Login from "./Login";
import Contact from "./Contact";
import QuizTest from "./QuizTest";
import Category from "./Categories";
import Menu from "../components/Menu";
import QuizLanding from "./QuizLanding";
import QuizPractice from "./QuizPractice";
import CategoryDetailed from "./CategoryDetailed";

function App() {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <Container>
      <AppBar position="static" sx={{ marginBottom: "2rem" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white", cursor: "pointer" }}
            onClick={handleRedirect}
          >
            Free Quizes
          </Typography>
          <Button color="inherit">
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/categories/:categoryId">
          <CategoryDetailed />
        </Route>
        <Route path="/categories">
          <Category />
        </Route>
        <Route path="/quiz/:id/test">
          <QuizTest />
        </Route>
        <Route path="/quiz/:id/practice">
          <QuizPractice />
        </Route>
        <Route path="/quiz/:id" exact>
          <QuizLanding />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/">
          <Category />
        </Route>
      </Switch>
      <Menu />
    </Container>
  );
}

export default App;
