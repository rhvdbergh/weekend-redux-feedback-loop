import React from 'react';
import './App.css';
import { Route, HashRouter as Router } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import ReviewPage from '../ReviewPage/ReviewPage';
import SuccessPage from '../SuccessPage/SuccessPage';
import Header from '../Header/Header';
import { Box } from '@mui/system';
import AdminPage from '../AdminPage/AdminPage';

function App() {
  return (
    <Router>
      <Box className="App">
        <Route path="/" exact>
          <Header title="Feedback!" subtitle="Don't forget it!" />
          <QuestionForm questionType="feeling" />
        </Route>
        <Route path="/understanding" exact>
          <Header title="Feedback!" subtitle="Don't forget it!" />
          <QuestionForm questionType="understanding" />
        </Route>
        <Route path="/support" exact>
          <Header title="Feedback!" subtitle="Don't forget it!" />
          <QuestionForm questionType="support" />
        </Route>
        <Route path="/comments" exact>
          <Header title="Feedback!" subtitle="Don't forget it!" />
          <QuestionForm questionType="comments" />
        </Route>
        <Route path="/review" exact>
          <Header title="Feedback!"></Header>
          <ReviewPage />
        </Route>
        <Route path="/success" exact>
          <SuccessPage />
        </Route>
        <Route path="/admin" exact>
          <Header title="Feedback Results" />
          <AdminPage />
        </Route>
      </Box>
    </Router>
  );
}

export default App;
