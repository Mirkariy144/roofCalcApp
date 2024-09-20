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
import React, { useEffect, useState } from 'react';
import { SelectJunction } from './SelectJunction';
import { axiosAddJunction, axiosEditJunction } from '../../API/Api';
import { DeleteForeverOutlined } from '@mui/icons-material';

const _ = require('lodash');

interface JunctionModalProps {
  status: boolean;
  handleClose: (func1?: () => void, func2?: () => void) => void;
  elementId: number;
  editingJunction: any;
}

export const EditJunctionModal = ({
  status,
  handleClose,
  elementId,
  editingJunction,
}: JunctionModalProps) => {
  const [line, setLine] = useState<any[]>([]);

  const [junctionLayers, setJunctionLayers] = useState<any>([]);

  useEffect(() => {
    if (editingJunction) {
      editingJunction.junctionLayer?.map(
        (item: any) => (item.uniqueId = _.uniqueId())
      );
      setJunctionLayers(editingJunction.junctionLayer);
      const newLine = () => {
        for (let i = 0; i < editingJunction.junctionLayer?.length; i++) {
          setLine((prevLine) => [
            ...prevLine,
            { id: editingJunction.junctionLayer[i].uniqueId },
          ]);
        }
      };
      newLine();
    }
  }, [editingJunction, status]);

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
          axiosEditJunction(name, junctionLength, data, elementId).then(
            function () {
              handleClose();
              clearLine();
              clearJunctionLayers();
            }
          )

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
          label={editingJunction?.junctionName}
          type="text"
          fullWidth
          variant="standard"
          name="name"
        />
        <TextField
          required
          margin="dense"
          label={editingJunction?.junctionLength}
          type="number"
          fullWidth
          variant="standard"
          name="junctionLength"
        />
        {line?.map((item, index) => {
          console.log(item);
          return (
            <React.Fragment key={item.id}>
              <SelectJunction
                setJunctionLayers={setJunctionLayers}
                junctionLayers={junctionLayers}
                uniqueId={item.id}
                editingValue={editingJunction?.junctionLayer[index]?.name}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                label={editingJunction?.junctionLayer[index]?.height}
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
        <Button onClick={() => handleClose(clearLine, clearJunctionLayers)}>
          Отмена
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
