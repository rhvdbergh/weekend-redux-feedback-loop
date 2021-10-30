import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

// nothing in this page needs to use redux,
// since the state isn't shared with any other component
function AdminPage() {
  // local state using useState hook
  const [feedbackList, setFeedbackList] = useState([]);

  // set a useEffect to update the feedbackList on page load
  useEffect(() => fetchFeedback(), []); // the empty array will make this update only once, after page load

  // fetches latest feedback results from the server
  const fetchFeedback = () => {
    // get the data from the server
    axios
      .get(`/admin`)
      .then(({ data }) => {
        // we're only interested in the data property
        setFeedbackList(data);
      })
      .catch((err) => {
        console.log(
          `There was an error retrieving the data from the server:`,
          err
        );
      });
  };

  return (
    <Box>
      <Typography>Hello, admin.</Typography>
    </Box>
  );
}

export default AdminPage;
