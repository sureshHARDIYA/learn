import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import "../App.css";
import Login from "./Login";
import Contact from "./Contact";
import QuizTest from "./QuizTest";
import Category from "./Categories";
import Menu from "../components/Menu";
import QuizLanding from "./QuizLanding";
import CategoryDetailed from "./CategoryDetailed";

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Container>
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
        <Route path="/quiz/:id">
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
    </Container>
  );
}

export default App;
