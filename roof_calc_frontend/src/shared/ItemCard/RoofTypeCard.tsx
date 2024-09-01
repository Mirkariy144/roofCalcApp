import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { IconButtons } from '../button/IconButtons';
import { AddNewItemButton } from '../button/AddNewItemButton';
import { axiosGetJunctions } from '../API/Api';
import { Padding, WidthFull } from '@mui/icons-material';

const junctionBorderStyle: any = {
  border: '1px solid #1976d280',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontSize: '14px',
  padding: '10px 0px 0px 10px',
};

export const RoofTypeCard = ({
  name,
  squareMeters,
  roofLayers,
  elementId,
  editAction,
  deleteAction,
  newJunctionAction,
  openJunctionModal,
  editJunctionAction,
  deleteJunctionAction,
  openEditJunctionModal,
  openDeleteJunctionModal,
}: {
  name: string;
  squareMeters: number;
  roofLayers: { name: string; layerId: number }[];
  elementId: number;
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
}) => {
  const [roofJunctions, setRoofJunctions] = useState<any[]>([]);

  useEffect(() => {
    const getJunctions = async (elementId: number) => {
      try {
        const junctions = await axiosGetJunctions(elementId);
        setRoofJunctions(junctions);
      } catch (error) {
        console.error(error);
      }
    };
    getJunctions(elementId);
  }, [openJunctionModal, openEditJunctionModal, openDeleteJunctionModal]);

  const junctionsTypography = roofJunctions.map((item: any) => {
    return (
      <Typography
        sx={junctionBorderStyle}
        color="text.secondary"
        gutterBottom
        key={item.junctionId}
      >
        <span>{`Примыкание ${item.name} ${item.length}м.п.`}</span>
        {item.junctionLayers.map((item: any) => {
          let materials = Object.values(item.composition);
          return materials.map((item: any) => (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              key={item.layerId}
            >
              <span>{item}</span>
            </Typography>
          ));
        })}
        <IconButtons
          editAction={editJunctionAction}
          elementId={item.junctionId}
          name={item.name}
          squareMeters={item.length}
          roofJunction={item.junctionLayers}
          deleteAction={deleteJunctionAction}
        />
      </Typography>
    );
  });

  const roofLayersTypography = roofLayers.map((item: any) => {
    let materials = Object.values(item.composition);
    return materials.map((item: any) => (
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
        key={item}
      >
        {item}
      </Typography>
    ));
  });

  const card = (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {squareMeters} м2
        </Typography>
        <div>{roofLayersTypography}</div>
        <div>{junctionsTypography}</div>
      </CardContent>
      <CardActions>
        <AddNewItemButton
          name="Примыкание"
          handler={newJunctionAction}
          variant="outlined"
          elementId={elementId}
        />
        <IconButtons
          editAction={editAction}
          elementId={elementId}
          deleteAction={deleteAction}
          name={name}
          squareMeters={squareMeters}
        />
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ width: 250 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};
