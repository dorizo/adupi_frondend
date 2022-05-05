import { TextField } from '@mui/material';
import React from 'react';

export default function TextInput({ label, ...props }) {
  return <TextField fullWidth label={label} sx={{ marginTop: 1, marginBottom: 1 }} variant="standard" {...props} />;
}
