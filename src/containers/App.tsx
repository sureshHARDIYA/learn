import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Container from '@mui/material/Container';

import '../App.css';
import Category from './Categories';
import CategoryDetailed from './CategoryDetailed'
import QuizLanding from './QuizLanding';
import Menu from '../components/Menu'


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
          <Route path="/quiz/:id">
            <QuizLanding />
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
