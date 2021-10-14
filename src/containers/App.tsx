import { Alert } from "@mui/material";
import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { StateMachineProvider, createStore } from "little-state-machine";

import "../App.css";
import Login from "./Login";
import Contact from "./Contact";
import QuizTest from "./QuizTest";
import Category from "./Categories";
import Menu from "../components/Menu";
import QuizLanding from "./QuizLanding";
import QuizPractice from "./QuizPractice";
import CategoryDetailed from "./CategoryDetailed";

function Home() {
  return <h2>Home</h2>;
}

createStore({ response: [] });

function App() {
  return (
    <Container>
      <Alert severity="warning" sx={{ marginBottom: "1rem" }}>
        This site is actively under development..
      </Alert>
      <StateMachineProvider>
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
            <Home />
          </Route>
        </Switch>
        <Menu />
      </StateMachineProvider>
    </Container>
  );
}

export default App;
