import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function DentistSelector({ dentists, value, onChange }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Select Dentist</InputLabel>
      <Select
        value={value}
        label="Select Dentist"
        onChange={e => onChange(e.target.value)}
      >
        <MenuItem value="">All Dentists</MenuItem>
        {dentists.map(d => (
          <MenuItem key={d.id} value={d.id}>
            {d.name} ({d.specialty})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}