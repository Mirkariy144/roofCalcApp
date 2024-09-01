import { Button } from '@mui/material';
import React from 'react';

interface AddNewItemButtonProps {
  name: string;
  variant?: 'contained' | 'outlined' | 'text';
  handler?: (elementId: number) => void;
  elementId?: number;
}

export const AddNewItemButton = ({
  name,
  handler,
  variant,
  elementId,
}: AddNewItemButtonProps) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Button
        variant={variant}
        onClick={() => handler?.(elementId ? elementId : 0)}
      >
        {name}
      </Button>
    </div>
  );
};
