import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewPage() {
  // retrieve the feedback from the redux store
  const feedback = useSelector((store) => store.feedback);

  // set up the history in order to navigate using the useHistory hook
  const history = useHistory();

  console.log(`feedback`, feedback);

  const handleSubmit = () => {
    axios
      .post(`/submit`, feedback)
      .then((response) => {
        console.log(response);
        history.push('/success');
      })
      .catch((err) => {
        console.log(`There was an error posting to the server:`, err);
      });
  };

  return (
    <div>
      <h2>Review Your Feedback</h2>
      <p>Feelings: {feedback.feelings}</p>
      <p>Understanding: {feedback.understanding}</p>
      <p>Support: {feedback.support}</p>
      <p>Comments: {feedback.comments}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ReviewPage;
