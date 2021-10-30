import { Container, Paper, Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

function SuccessPage() {
  // set up the history to navigate with useHistory hook
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation="6"
        sx={{
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <h2>Thank You!</h2>
        <Box>
          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => history.push('/')}
          >
            Leave New Feedback
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SuccessPage;
