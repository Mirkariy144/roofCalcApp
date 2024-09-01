import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

interface NewItemModalProps {
  handler: () => void;
  Title?: string;
  Text?: string;
  Status: boolean;
  label: string;
  API: (
    text: string,
    projectId?: number,
    queueId?: number,
    sectionId?: number
  ) => Promise<any>;
  projectId?: number;
  queueId?: number;
  sectionId?: number;
}

export const ItemModal = ({
  handler,
  Title,
  Text,
  Status,
  label,
  API,
  projectId,
  queueId,
  sectionId,
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
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const text = formJson.text;
          API(text, projectId, queueId, sectionId);
          handler();
        },
      }}
    >
      <DialogTitle>{Title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{Text}</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="text"
          label={label}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handler}>Отмена</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
