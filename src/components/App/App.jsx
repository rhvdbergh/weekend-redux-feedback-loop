import React from 'react';
import axios from 'axios';
import './App.css';
import { Route, HashRouter as Router } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import ReviewPage from '../ReviewPage/ReviewPage';
import SuccessPage from '../SuccessPage/SuccessPage';
import Header from '../Header/Header';
import { Box } from '@mui/system';

function App() {
  return (
    <Router>
      <Box className="App">
        <Header />
        <Route path="/" exact>
          <QuestionForm questionType="feeling" />
        </Route>
        <Route path="/understanding" exact>
          <QuestionForm questionType="understanding" />
        </Route>
        <Route path="/support" exact>
          <QuestionForm questionType="support" />
        </Route>
        <Route path="/comments" exact>
          <QuestionForm questionType="comments" />
        </Route>
        <Route path="/review" exact>
          <ReviewPage />
        </Route>
        <Route path="/success" exact>
          <SuccessPage />
        </Route>
      </Box>
    </Router>
  );
}

export default App;
