import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { SelectJunction } from './SelectJunction';
import { axiosAddJunction } from '../../API/Api';
import { DeleteForeverOutlined } from '@mui/icons-material';

const _ = require('lodash');

interface JunctionModalProps {
  status: boolean;
  handler: (elementId?: number) => void;
  elementId: number;
}

export const JunctionModal = ({
  status,
  handler,
  elementId,
}: JunctionModalProps) => {
  const [line, setLine] = useState<any[]>([]);

  const [junctionLayers, setJunctionLayers] = useState<any>([]);

  console.log(junctionLayers);

  const addInfo = (elementId: number, eventTarget: any) => {
    setJunctionLayers((prevData: any) => {
      if (eventTarget.name === 'height') {
        prevData.filter((item: any) => item.uniqueId === elementId)[0].height =
          eventTarget.value;
        return prevData;
      } else if (eventTarget.name === 'length') {
        prevData.filter((item: any) => item.uniqueId === elementId)[0].length =
          eventTarget.value;
        return prevData;
      }
    });
  };

  const addNewLine = () => {
    setLine((prevLine) => [...prevLine, { id: _.uniqueId() }]);
  };

  const clearLine = () => {
    setLine([]);
  };

  const clearJunctionLayers = () => {
    setJunctionLayers([]);
  };

  const deleteRow = (id: number) => {
    setLine((prevLine) => prevLine.filter((item: any) => item.id !== id));
    setJunctionLayers((prevData: any) => {
      return prevData.filter((item: any) => item.uniqueId !== id);
    });
  };

  return (
    <Dialog
      open={status}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const name = formJson.name;
          const junctionLength = formJson.junctionLength;
          const data = junctionLayers.map((item: any) => {
            delete item.uniqueId;
            return item;
          });
          axiosAddJunction(name, junctionLength, data, elementId);
          handler();
          clearLine();
          clearJunctionLayers();
        },
      }}
    >
      <DialogTitle>{'Примыкания'}</DialogTitle>
      <DialogContent id="lines">
        <DialogContentText>
          {'Сформируйте примыкания. Размеры указываются в метрах'}
        </DialogContentText>
        <TextField
          required
          margin="dense"
          label="Наименование примыкания"
          type="text"
          fullWidth
          variant="standard"
          name="name"
        />
        <TextField
          required
          margin="dense"
          label="Длина примыкания"
          type="number"
          fullWidth
          variant="standard"
          name="junctionLength"
        />
        {line?.map((item) => {
          console.log(item);
          return (
            <React.Fragment key={item.id}>
              <SelectJunction
                setJunctionLayers={setJunctionLayers}
                junctionLayers={junctionLayers}
                uniqueId={item.id}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                label="Высота примыкания"
                type="text"
                fullWidth
                variant="standard"
                name="height"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  addInfo(item.id, event.target)
                }
              />
              <IconButton
                aria-label="Удалить строку"
                onClick={() => deleteRow(item.id)}
              >
                <DeleteForeverOutlined sx={{ color: 'red' }} />
              </IconButton>
            </React.Fragment>
          );
        })}
      </DialogContent>
      <DialogActions>
        <IconButton aria-label="Добавить примыкание" onClick={addNewLine}>
          <AddIcon color="primary" />
        </IconButton>
        <Button onClick={() => handler()}>Отмена</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
