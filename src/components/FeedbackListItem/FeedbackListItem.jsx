import { TableCell, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import axios from 'axios';

function FeedBackListItem({ feedback, fetchFeedback }) {
  const updateFlag = () => {
    // toggle the flag using the PUT /admin/:id route
    axios
      .put(`/admin/${feedback.id}`)
      .then((response) => {
        // refresh the dom with the new information
        fetchFeedback();
      })
      .catch((err) => {
        console.log(`There was an error updating data on the server:`, err);
      });
  };

  const deleteFeedback = () => {
    // delete this feedback item on the server
    axios
      .delete(`/admin/${feedback.id}`)
      .then((response) => {
        // refresh the dom with the new information
        fetchFeedback();
      })
      .catch((err) => {
        console.log(`There was an error deleting data on the server:`, err);
      });
  };
  return (
    <TableRow>
      <TableCell>{feedback.feeling}</TableCell>
      <TableCell>{feedback.understanding}</TableCell>
      <TableCell>{feedback.support}</TableCell>
      <TableCell>{feedback.comments}</TableCell>
      <TableCell>
        <IconButton onClick={updateFlag}>
          {feedback.flagged ? (
            <FlagIcon color="secondary" />
          ) : (
            <FlagOutlinedIcon />
          )}
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton color="warning" onClick={deleteFeedback}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default FeedBackListItem;
