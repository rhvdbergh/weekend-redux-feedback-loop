import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
    feeling: 'understanding',
    understanding: 'support',
    support: 'comments',
    comments: 'review',
  };

  // object to help navigation backward
  // at feeling, there should be no back button,
  // so nowhere to navigate to
  const navigateBackwardFrom = {
    understanding: '/',
    support: 'understanding',
    comments: 'support',
  };

  // set the message depending on what kind of question we're dealing with
  let messageFor = {
    feeling: 'How are you feeling today?',
    understanding: 'How well are you understanding the content?',
    support: 'How well are you being supported?',
    comments: 'Any comments you want to leave?',
  };

  const handleClick = () => {
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
      console.log(`you've made it through, inputValue is `, inputValue);
      // send the redux action through a dispatch
      // include the questionType and the content of this message as feedback
      dispatch({
        type: 'SET_FEEDBACK',
        payload: { questionType, feedback: inputValue },
      });
      // reset the inputValue
      // setInputValue('');
      // move the user to the next page
      // this will move the user to the next page, depending on what this question is
      history.push(navigateForwardFrom[questionType]);
    } else {
      // if we land here, the user has the wrong input
      alert('Please enter a number from 1 to 5.');
    }
  };

  return (
    <div>
      {/* Picks the corresponding message for this questionType
      from the messageFor object  */}
      <p>{messageFor[questionType]}</p>
      {/* Conditional rendering of type of input */}
      {/* We need a number box for everything except comments */}
      {questionType === 'comments' ? (
        <input
          type="text"
          value={inputValue}
          placeholder="Enter optional comments ..."
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : (
        <input
          type="number"
          value={inputValue}
          required
          max="5"
          min="1"
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}
      {/* Conditional rendering of the back button 
          which should not display on the feelings view*/}
      {questionType !== 'feeling' && (
        <button
          onClick={() => history.push(navigateBackwardFrom[questionType])}
        >
          Back
        </button>
      )}
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default QuestionForm;
