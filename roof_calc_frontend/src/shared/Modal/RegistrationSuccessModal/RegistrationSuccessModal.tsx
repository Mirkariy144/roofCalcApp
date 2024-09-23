import React, { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const RegistrationSuccessModal = ({
  status,
  handleSwitch,
  setDialogOpen,
}: {
  status: boolean;
  handleSwitch: Dispatch<SetStateAction<boolean>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleBoolian = () => {
    console.log('handleBoolian');
    setDialogOpen(false);
    handleSwitch(false);
  };
  return (
    <Dialog open={status}>
      <DialogContent>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContentText>Вы успешно зарегистрировались!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBoolian}>Перейти к авторизации</Button>
      </DialogActions>
    </Dialog>
  );
};
