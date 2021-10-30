import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FeedBackListItem from '../FeedbackListItem/FeedbackListItem';

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
    <Container>
      <TableContainer sx={{ mt: '75px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '12%' }}>Feeling</TableCell>
              <TableCell sx={{ width: '12%' }}>Comprehension</TableCell>
              <TableCell sx={{ width: '12%' }}>Support</TableCell>
              <TableCell sx={{ width: '54%' }}>Comments</TableCell>
              <TableCell sx={{ width: '5%' }}>Flagged</TableCell>
              <TableCell sx={{ width: '5%' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackList.map((feedback, id) => (
              <FeedBackListItem
                key={id}
                feedback={feedback}
                fetchFeedback={fetchFeedback}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminPage;
