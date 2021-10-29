import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function QuestionForm({ questionType }) {
  // handle the local state for the form input
  const [inputValue, setInputValue] = useState('');

  // set up the useHistory hook
  const history = useHistory();

  // object to help navigation
  const navigateFrom = {
    feeling: 'understanding',
    understanding: 'support',
    support: 'comments',
    comments: 'review',
  };

  // set the message depending on what kind of question we're dealing with
  let messageFor = {
    feeling: 'How are you feeling today?',
    understanding: 'How well are you understanding the content?',
    support: 'How well are you being supported?',
    comments: 'Any comments you want to leave?',
  };

  const handleClick = () => {
    // TODO: set up dispatch
    // move the user to the next page
    // this will move the user to the next page, depending on what this question is
    history.push(navigateFrom[questionType]);
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
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default QuestionForm;
