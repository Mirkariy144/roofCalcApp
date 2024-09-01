import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { roofLayers } from './roofLayers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SelectRoofLayers = ({ setSelectedRoofLayers }: any) => {
  const _ = require('lodash');

  const [roofLayer, setRoofLayer] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof roofLayer>) => {
    const {
      target: { value },
    } = event;
    setRoofLayer(typeof value === 'string' ? value.split(',') : value);
    const selectedRoofLayers = _.cloneDeep(
      roofLayers.filter((item: { name: string; layerId: number }) =>
        value.includes(item.name)
      )
    );
    setSelectedRoofLayers(selectedRoofLayers);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 500, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={roofLayer}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Выберите новый слой кровли</em>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {roofLayers.map((item: { name: string; layerId: number }) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
