import { useState } from 'react';

function QuestionForm({ questionType }) {
  // handle the local state for the form input
  const [inputValue, setInputValue] = useState('');

  // set the message depending on what kind of question we're dealing with
  let message;
  switch (questionType) {
    case 'feeling':
      message = 'How are you feeling today?';
      break;
    case 'understanding':
      message = 'How well are you understanding the content?';
      break;
    case 'support':
      message = 'How well are you being supported?';
      break;
    case 'comments':
      message = 'Any comments you want to leave?';
      break;
  }

  const handleClick = () => {
    console.log(`clicked`);
  };

  return (
    <div>
      <p>{message}</p>
      {/* Conditional rendering of type of input */}
      {questionType === 'comments' ? (
        <input
          type="text"
          value={inputValue}
          onChange={() => setInputValue(event.target.Value)}
        />
      ) : (
        <input
          type="number"
          value={inputValue}
          required
          max="5"
          min="1"
          onChange={() => setInputValue(event.target.Value)}
        />
      )}
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default QuestionForm;
