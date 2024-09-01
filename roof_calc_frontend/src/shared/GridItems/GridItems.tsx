import { Box, Grid } from '@mui/material';
import React from 'react';
import { ItemCard } from '../ItemCard/ItemCard';

interface GridItemsProps {
  items: {
    name: string;
    projectId: number;
    queueId?: number;
    sectionId?: number;
  }[];
  editAction: (elementId: number) => void;
  deleteAction: (elementId: number) => void;
}

const itemsStyle = {
  cardGrid: { display: 'flex', justifyContent: 'center' },
  itemInfo: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

interface ItemCardTypes {
  name: string;
  projectId: number;
  queueId?: number;
  sectionId?: number;
}

export const GridItems = ({
  items,
  editAction,
  deleteAction,
}: GridItemsProps) => {
  const cardElementId = (item: ItemCardTypes) => {
    return item.sectionId
      ? item.sectionId
      : item.queueId
      ? item.queueId
      : item.projectId;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={itemsStyle.cardGrid}
      >
        {items?.map((item) => (
          <Grid item sx={itemsStyle.itemInfo} key={cardElementId(item)}>
            <ItemCard
              name={item.name}
              elementId={cardElementId(item)}
              editAction={editAction}
              deleteAction={deleteAction}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
