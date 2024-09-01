import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SelectRoofLayers } from './SelectRoofLayers';

interface NewRoofModalProps {
  Status: boolean;
  handler: () => void;
  API: (
    name: string,
    projectId?: number,
    queueId?: number,
    sectionId?: number,
    roofLayers?: any,
    squareMeters?: number,
    upperPoint?: number,
    lowerPoint?: number,
    roofId?: number
  ) => any;
  title: string;
  text: string;
  roofInfo?: { name?: string; squareMeters?: number; elementId: number };
}

export const RoofModal = ({
  Status,
  handler,
  API,
  title,
  text,
  roofInfo,
}: NewRoofModalProps) => {
  const { projectId, queueId, sectionId } = useParams();
  const projectIdNum = Number(projectId);
  const queueIdNum = Number(queueId);
  const sectionIdNum = Number(sectionId);

  let upperPoint: number = 27;
  let lowerPoint: number = 3;

  const [roofLayers, setSelectedRoofLayers] = useState<any>([]);
  return (
    <Dialog
      open={Status}
      onClose={handler}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const text = formJson.text;
          const squareMeters = formJson.value;
          API(
            text,
            projectIdNum,
            queueIdNum,
            sectionIdNum,
            roofLayers,
            squareMeters,
            upperPoint,
            lowerPoint,
            roofInfo?.elementId
          );
          handler();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="text"
          label={roofInfo?.name || 'Название кровли'}
          type="text"
          variant="standard"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          name="value"
          label={roofInfo?.squareMeters || 'Квадратура'}
          type="number"
          variant="standard"
          fullWidth
        />
        <SelectRoofLayers setSelectedRoofLayers={setSelectedRoofLayers} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handler}>Отмена</Button>
        <Button type="submit">Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};
