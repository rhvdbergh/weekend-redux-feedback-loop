import React from 'react';
import axios from 'axios';
import './App.css';
import { Route, HashRouter as Router } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import ReviewPage from '../ReviewPage/ReviewPage';
import SuccessPage from '../SuccessPage/SuccessPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>Don't forget it!</h4>
        </header>
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
      </div>
    </Router>
  );
}

export default App;
