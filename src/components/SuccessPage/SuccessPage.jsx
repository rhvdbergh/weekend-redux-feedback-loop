import { Container, Paper, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function SuccessPage() {
  // set up the history to navigate with useHistory hook
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <Paper elevation="6">
        <h2>Thank You!</h2>
        <Button variant="contained" onClick={() => history.push('/')}>
          Leave New Feedback
        </Button>
      </Paper>
    </Container>
  );
}

export default SuccessPage;
