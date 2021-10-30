import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// dummy data for initial reducer state
const initialFeedbackState = {
  feeling: '',
  understanding: '',
  support: '',
  comments: '',
};

// set up the reducer
const feedback = (state = initialFeedbackState, action) => {
  // respond to actions
  if (action.type === 'SET_FEEDBACK') {
    return { ...state, [action.payload.questionType]: action.payload.feedback };
  } else if (action.type === 'RESET_FEEDBACK') {
    // reset by setting the state back to the initial state
    return initialFeedbackState;
  }
  // the default is to return state as is
  return state;
};

// set up the store
const store = createStore(
  combineReducers({
    feedback,
  }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
