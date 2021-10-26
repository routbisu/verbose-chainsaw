import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { FormFieldProps } from 'lib/types/lenderName';
import { deSnake } from 'lib/utils';
import React from 'react';

const LenderFormControl = ({
  name,
  type = 'text',
  required = false,
  options,
  ...rest
}: FormFieldProps) => {
  switch (type) {
    case 'text':
      return (
        <TextField
          label={deSnake(name)}
          required={required}
          fullWidth
          {...rest}
        />
      );

    case 'select':
      return (
        <FormControl fullWidth>
          <InputLabel id={name}>Age</InputLabel>
          <Select
            name={name}
            label={name}
            labelId={name}
            required={required}
            {...rest}
          >
            {options?.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox name={name} {...rest} />}
          label={name}
        />
      );

    default:
      return null;
  }
};

export default LenderFormControl;
