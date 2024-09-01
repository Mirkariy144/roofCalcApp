import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButtons } from '../button/IconButtons';

export const ItemCard = ({
  name,
  elementId,
  editAction,
  deleteAction,
}: {
  name: string;
  elementId: number;
  editAction: (elementId: number) => void;
  deleteAction: (elementId: number) => void;
}) => {
  const card = (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButtons
          editAction={editAction}
          elementId={elementId}
          deleteAction={deleteAction}
        />
        <Button
          size="small"
          variant="outlined"
          component={RouterLink}
          to={`${elementId}`}
        >
          Open Project
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ width: 250 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};
