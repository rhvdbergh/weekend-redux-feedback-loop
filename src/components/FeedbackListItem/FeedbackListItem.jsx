import {
  TableCell,
  TableRow,
  IconButton,
  Modal,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import axios from 'axios';
import { useState } from 'react';

// the delete confirmation modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function FeedBackListItem({ feedback, fetchFeedback }) {
  // local state for the delete confirmation modal
  const [openModal, setOpenModal] = useState(false);

  // toggle the flag using the PUT /admin/:id route
  const updateFlag = () => {
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

  // confirm delete using a modal
  // the modal contains cancel and confirm delete buttons
  const confirmDelete = () => {
    setOpenModal(true);
  };

  // delete this feedback item on the server
  const deleteFeedback = () => {
    axios
      .delete(`/admin/${feedback.id}`)
      .then((response) => {
        // make sure the modal is set to false
        setOpenModal(false);
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
        <IconButton color="warning" onClick={confirmDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Box>
            <Typography variant="h5">
              Are you sure you want to delete this feedback?
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button onClick={deleteFeedback}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </TableRow>
  );
}

export default FeedBackListItem;
