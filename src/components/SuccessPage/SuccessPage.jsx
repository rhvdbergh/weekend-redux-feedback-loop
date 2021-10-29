import { useHistory } from 'react-router-dom';

function SuccessPage() {
  // set up the history to navigate with useHistory hook
  const history = useHistory();

  return (
    <div>
      <h2>Thank You!</h2>
      <button onClick={() => history.push('/')}>Leave New Feedback</button>
    </div>
  );
}

export default SuccessPage;
