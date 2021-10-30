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

// this component is a modal for feedback throughout the app
// this keeps styles consistent
// it takes four props:
// message is the message the modal displays
// openModal is a boolean stating whether the modal is open or not
// onModalReject is a function that the parent component executes on reject
// on ModalAccept is any action that the parent component executes on accept
function FeedbackModal({
  openModal,
  onModalReject,
  onModalAccept,
  message,
  rejectButton,
  acceptButton,
}) {
  return (
    <Modal open={openModal} onClose={onModalReject}>
      <Box sx={modalStyle}>
        <Box>
          <Typography variant="h5">{message}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {rejectButton && (
            <Button onClick={onModalReject}>{rejectButton}</Button>
          )}
          <Button onClick={onModalAccept}>{acceptButton}</Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default FeedbackModal;
