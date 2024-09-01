import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { Fragment } from 'react';

export const EditRoofModal = () => {
  return (
    <Fragment>
      <Dialog open={false}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Fragment>
  );
};
