import { Modal, Button, Box, Typography } from '@mui/material';

// the confirmation modal style
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

function FeedbackModal({ openModal, onModalReject, onModalAccept }) {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={modalStyle}>
        <Box>
          <Typography variant="h5">
            Are you sure you want to delete this feedback?
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onModalReject}>Cancel</Button>
          <Button onClick={onModalAccept}>Delete</Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default FeedbackModal;
