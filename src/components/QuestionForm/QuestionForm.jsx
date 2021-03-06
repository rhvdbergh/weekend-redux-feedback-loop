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
import { Paper, Box } from '@mui/material';

function QuestionForm({ questionType }) {
  // handle the local state for the form input
  const [inputValue, setInputValue] = useState('');

  // get the initial value from the redux store
  // if the user had previously given a rating and navigated back to
  // this page, the previous value will be given, otherwise the default
  // defined in the redux store
  const initialValue = useSelector((store) => store.feedback[questionType]);

  // on page load, set the initial value of the current feedback in the
  // local state to the state retrieved from the redux store
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
  const messageFor = {
    feeling: 'How are you feeling today?',
    understanding: 'How well are you understanding the content?',
    support: 'How well are you being supported?',
    comments: 'Any comments you want to leave?',
  };

  // validate the submission
  const isValidSubmission = () => {
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
      return true;
    }
    return false;
  };

  // this handles clicks for both the forward and the backward button
  // users are obliged to enter information in the box before they navigate
  // this solves a problem where the user's entry was lost on clicking back
  // without having stored that entry in the redux store
  const handleClick = (direction) => {
    if (isValidSubmission() || direction === 'backward') {
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
      // this shouldn't really be possible, since the button should be disabled
      alert('Please enter a number from 1 to 5.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: '80px' }}>
      <Paper
        elevation="6"
        sx={{
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Picks the corresponding message for this questionType
      from the messageFor object  */}
        <Box sx={{ pt: '50px' }}>
          <Typography variant="h5">{messageFor[questionType]}</Typography>
        </Box>
        <Box>
          {/* Conditional rendering of type of input */}
          {/* We need a number box for everything except comments */}
          {questionType === 'comments' ? (
            <TextField
              label="Optional comments ..."
              value={inputValue}
              variant="outlined"
              sx={{ width: '50ch' }}
              multiline
              rows="4"
              onChange={(event) => setInputValue(event.target.value)}
            />
          ) : (
            <Rating
              value={Number(inputValue)}
              icon={<RadioButtonCheckedIcon />}
              emptyIcon={<RadioButtonUncheckedIcon />}
              onChange={(event) => setInputValue(event.target.value)}
            />
          )}
        </Box>
        <Box sx={{ pb: '50px' }}>
          <ButtonGroup variant="contained" color="primary">
            {/* Conditional rendering of the back button 
          which should not be enabled on the feelings view
            it should be there as a placeholder, though*/}
            {questionType !== 'feeling' ? (
              <Button onClick={() => handleClick('backward')}>Back</Button>
            ) : (
              <Button disabled>Back</Button>
            )}
            {/* Conditional rendering of the forward button - only allow if entry valid */}
            {isValidSubmission() ? (
              <Button onClick={() => handleClick('forward')}>Next</Button>
            ) : (
              <Button disabled>Next</Button>
            )}
          </ButtonGroup>
        </Box>
      </Paper>
    </Container>
  );
}

export default QuestionForm;
