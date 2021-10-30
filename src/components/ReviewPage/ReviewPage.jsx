import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

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
        // take the user to the success page
        history.push('/success');
        // reset the redux store on success
        dispatch({ type: 'RESET_FEEDBACK' });
      })
      .catch((err) => {
        console.log(`There was an error posting to the server:`, err);
      });
  };

  return (
    <Container className="centered" maxWidth="sm">
      <Paper elevation="6">
        <h2>Review Your Feedback</h2>
        <p>Feeling: {feedback.feeling}</p>
        <p>Understanding: {feedback.understanding}</p>
        <p>Support: {feedback.support}</p>
        <p>Comments: {feedback.comments}</p>
        <ButtonGroup variant="contained">
          {/* Will navigate back to the comments page, where users can navigate back further */}
          <Button onClick={() => history.push('/comments')}>Back</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
}

export default ReviewPage;
