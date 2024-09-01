import { Box, Grid } from '@mui/material';
import React from 'react';
import { RoofTypeCard } from '../ItemCard/RoofTypeCard';
import { roofItemsTypes } from '../../RoofListContainer/RoofListContainer';

interface GridItemsProps {
  items: roofItemsTypes[];
  editAction: (elementId: number, name?: string, squareMeters?: number) => void;
  deleteAction: (elementId: number) => void;
  newJunctionAction: (elementId: number) => void;
  openJunctionModal: boolean;
  editJunctionAction: (
    junctionId: number,
    junctionName?: string,
    junctionLength?: number,
    junctionLayer?: any
  ) => void;
  deleteJunctionAction: (junctionId: number) => void;
  openEditJunctionModal: boolean;
  openDeleteJunctionModal: boolean;
}

export const GridRoofTypes = ({
  items,
  editAction,
  deleteAction,
  newJunctionAction,
  openJunctionModal,
  editJunctionAction,
  deleteJunctionAction,
  openEditJunctionModal,
  openDeleteJunctionModal,
}: GridItemsProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {items.map((item: roofItemsTypes) => (
          <Grid
            item
            sx={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
            key={item.roofId}
          >
            <RoofTypeCard
              elementId={item.roofId}
              name={item.name}
              squareMeters={item.squareMeters}
              roofLayers={item.roofLayers}
              editAction={editAction}
              deleteAction={deleteAction}
              newJunctionAction={newJunctionAction}
              openJunctionModal={openJunctionModal}
              editJunctionAction={editJunctionAction}
              deleteJunctionAction={deleteJunctionAction}
              openEditJunctionModal={openEditJunctionModal}
              openDeleteJunctionModal={openDeleteJunctionModal}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
