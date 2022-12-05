import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export default function SelectInput({ option = [], label, placeholder = '', sx, pilih = true, ...props }) {
  return (
    <>
      <InputLabel sx={{ marginTop: 2 }} id={`${label.split(' ').join('_')}_id`}>
        {label}
      </InputLabel>
      <Select
        fullWidth
        labelId={`${label.split(' ').join('_')}_label`}
        placeholder={placeholder}
        variant="standard"
        sx={sx ? [{ marginBottom: 1 }, ...sx] : { marginBottom: 1 }}
        id={`${label.split(' ').join('_')}_id_standard`}
        label={label}
        {...props}
      >
        {pilih && (
          <MenuItem value="">
            <em>--PILIH--</em>
          </MenuItem>
        )}
        {option && option.map((op , i) => <MenuItem key={i} value={op.value}>{op.label}</MenuItem>)}
      </Select>
    </>
  );
}
