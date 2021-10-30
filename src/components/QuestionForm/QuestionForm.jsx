import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Paper } from '@mui/material';

function QuestionForm({ questionType }) {
  // handle the local state for the form input
  const [inputValue, setInputValue] = useState('');

  const initialValue = useSelector((store) => store.feedback[questionType]);

  useEffect(() => {
    setInputValue(initialValue);
  }, []);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // set up the useHistory hook
  const history = useHistory();

  // object to help navigation forward
  const navigateForwardFrom = {
    feeling: '/understanding',
    understanding: '/support',
    support: '/comments',
    comments: '/review',
  };

  // object to help navigation backward
  // at feeling, there should be no back button,
  // so nowhere to navigate to
  const navigateBackwardFrom = {
    understanding: '/',
    support: '/understanding',
    comments: '/support',
  };

  // set the message depending on what kind of question we're dealing with
  let messageFor = {
    feeling: 'How are you feeling today?',
    understanding: 'How well are you understanding the content?',
    support: 'How well are you being supported?',
    comments: 'Any comments you want to leave?',
  };

  // this handles clicks for both the forward and the backward button
  // users are obliged to enter information in the box before they navigate
  // this solves a problem where the user's entry was lost on clicking back
  // without having stored that entry in the redux store
  const handleClick = (direction) => {
    // if this is a comments component, we don't worry about validation
    // but for every other component, we have to have a number 1-5
    // the logic here in pseudocode:
    // if (not on the comments view AND the number includes) OR if on the comments view
    // be careful with the 'string'.includes('') -> true (since it does include '')
    // so we have to explicitly check if the string is empty
    if (
      (questionType !== 'comments' &&
        '12345'.includes(inputValue) &&
        inputValue !== '') ||
      questionType === 'comments'
    ) {
      // send the redux action through a dispatch
      // include the questionType and the content of this message as feedback
      dispatch({
        type: 'SET_FEEDBACK',
        payload: { questionType, feedback: inputValue },
      });
      // move the user to the next page
      // this will move the user forward or backward
      // depending on direction and where we are in the view (i.e., the questionType)
      direction === 'forward'
        ? history.push(navigateForwardFrom[questionType])
        : history.push(navigateBackwardFrom[questionType]);
    } else {
      // if we land here, the user has the wrong input
      alert('Please enter a number from 1 to 5.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation="6">
        {/* Picks the corresponding message for this questionType
      from the messageFor object  */}
        <Typography>{messageFor[questionType]}</Typography>
        {/* Conditional rendering of type of input */}
        {/* We need a number box for everything except comments */}
        {questionType === 'comments' ? (
          <TextField
            label="Optional comments ..."
            value={inputValue}
            variant="outlined"
            onChange={(event) => setInputValue(event.target.value)}
          />
        ) : (
          <Rating
            value={Number(inputValue)}
            color="primary"
            icon={<RadioButtonCheckedIcon />}
            emptyIcon={<RadioButtonUncheckedIcon />}
            onChange={(event) => setInputValue(event.target.value)}
          />
        )}
        <ButtonGroup variant="contained" color="primary">
          {/* Conditional rendering of the back button 
          which should not display on the feelings view*/}
          {questionType !== 'feeling' && (
            <Button onClick={() => handleClick('backward')}>Back</Button>
          )}
          <Button onClick={() => handleClick('forward')}>Next</Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
}

export default QuestionForm;
