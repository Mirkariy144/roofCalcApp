import { DeleteForeverOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React from 'react';

interface IconButtonsProps {
  editAction: (
    elementId: number,
    name?: string,
    squareMeters?: number,
    roofJunction?: any
  ) => void;
  elementId: number;
  name?: string;
  squareMeters?: number;
  deleteAction: (elementId: number) => void;
  roofJunction?: any;
}

export const IconButtons = ({
  editAction,
  elementId,
  deleteAction,
  name,
  squareMeters,
  roofJunction,
}: IconButtonsProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="Удалить" onClick={() => deleteAction(elementId)}>
        <DeleteForeverOutlined sx={{ color: 'red' }} />
      </IconButton>
      <IconButton
        aria-label="Отредактировать"
        onClick={() => editAction(elementId, name, squareMeters, roofJunction)}
      >
        <EditOutlined color="primary" />
      </IconButton>
    </Stack>
  );
};
