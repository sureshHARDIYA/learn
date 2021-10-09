import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css';
import App from './containers/App';
import { ROOT_API } from './config/api';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: ROOT_API,
  cache: new InMemoryCache()
});

const lightTheme = createTheme({ palette: { mode: 'light' } });

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <Router>
            <App />
          </Router>
        </ThemeProvider>
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
