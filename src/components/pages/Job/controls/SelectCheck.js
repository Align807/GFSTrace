import React from 'react'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Kelly Snyder',
];

export default function SelectCheck(props) {
  const { name, label, value,restart} = props;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <FormControl fullWidth
      variant="standard">
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        multiple
        name={name}
        value={personName}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        inputProps={{ readOnly:restart }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
