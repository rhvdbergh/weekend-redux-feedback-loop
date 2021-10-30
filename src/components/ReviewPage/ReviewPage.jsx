import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewPage() {
  // retrieve the feedback from the redux store
  const feedback = useSelector((store) => store.feedback);

  // set up the redux dispatch hook
  const dispatch = useDispatch();

  // set up the history in order to navigate using the useHistory hook
  const history = useHistory();

  console.log(`feedback`, feedback);

  const handleSubmit = () => {
    axios
      .post(`/submit`, feedback)
      .then((response) => {
        console.log(response);
        history.push('/success');
        // reset the redux store on success
        dispatch({ type: 'RESET_FEEDBACK' });
      })
      .catch((err) => {
        console.log(`There was an error posting to the server:`, err);
      });
  };

  return (
    <div>
      <h2>Review Your Feedback</h2>
      <p>Feeling: {feedback.feeling}</p>
      <p>Understanding: {feedback.understanding}</p>
      <p>Support: {feedback.support}</p>
      <p>Comments: {feedback.comments}</p>
      <button onClick={() => history.push('/comments')}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ReviewPage;
