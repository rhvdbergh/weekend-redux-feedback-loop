import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Paper,
  Container,
  Button,
  ButtonGroup,
  Rating,
  Box,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
      <Paper
        elevation="6"
        sx={{
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant="h3">Review Your Feedback</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ ml: '120px' }} variant="h6">
            Feeling:{' '}
          </Typography>
          <Rating
            value={Number(feedback.feeling)}
            icon={<RadioButtonCheckedIcon />}
            emptyIcon={<RadioButtonUncheckedIcon />}
            readOnly
            sx={{ mr: '150px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ ml: '120px' }} variant="h6">
            Understanding:{' '}
          </Typography>
          <Rating
            value={Number(feedback.understanding)}
            icon={<RadioButtonCheckedIcon />}
            emptyIcon={<RadioButtonUncheckedIcon />}
            readOnly
            sx={{ mr: '150px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ ml: '120px' }} variant="h6">
            Support:{' '}
          </Typography>
          <Rating
            value={Number(feedback.support)}
            icon={<RadioButtonCheckedIcon />}
            emptyIcon={<RadioButtonUncheckedIcon />}
            readOnly
            sx={{ mr: '150px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ ml: '20px', mr: '10px' }} variant="h6">
            Comments:
          </Typography>
          <Box sx={{ maxHeight: '100px', overflow: 'scroll' }}>
            <Typography sx={{ mr: '20px' }} variant="subtitle1">
              {feedback.comments}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ButtonGroup variant="contained">
            {/* Will navigate back to the comments page, where users can navigate back further */}
            <Button onClick={() => history.push('/comments')}>Back</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </ButtonGroup>
        </Box>
      </Paper>
    </Container>
  );
}

export default ReviewPage;
