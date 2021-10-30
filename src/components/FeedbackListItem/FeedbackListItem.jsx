import { TableCell, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

function FeedBackListItem({ feedback }) {
  return (
    <TableRow>
      <TableCell>{feedback.feeling}</TableCell>
      <TableCell>{feedback.understanding}</TableCell>
      <TableCell>{feedback.support}</TableCell>
      <TableCell>{feedback.comments}</TableCell>
      <TableCell>
        <IconButton>
          {feedback.flagged ? (
            <FlagIcon color="secondary" />
          ) : (
            <FlagOutlinedIcon />
          )}
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton color="warning">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default FeedBackListItem;
