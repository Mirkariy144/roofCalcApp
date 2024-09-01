import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface NewItemModalProps {
  handler: () => void;
  Title?: string;
  Text?: string;
  Status: boolean;
  deleteItem: () => void;
}

export const DeleteModal = ({
  handler,
  Title,
  Text,
  Status,
  deleteItem,
}: NewItemModalProps) => {
  return (
    <Dialog
      open={Status}
      onClose={handler}
      sx={{
        '& .MuiDialog-paperWidthSm': {
          width: '400px',
        },
      }}
    >
      <DialogTitle>{Title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{Text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handler}>Отмена</Button>
        <Button onClick={deleteItem}>Да</Button>
      </DialogActions>
    </Dialog>
  );
};
