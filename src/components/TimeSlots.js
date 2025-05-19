import React, { useState } from 'react';
import { Button, Typography, Stack } from '@mui/material';

export default function TimeSlots({ slots, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (time) => {
    setSelected(time);
    onSelect(time);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Typography variant="h6">Available Time Slots</Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" mt={2} useFlexGap sx={{ gap: 2, flexWrap: 'wrap' }}>
        {slots.length === 0 ? (
          <Typography color="text.secondary">No available time slots</Typography>
        ) : (
          slots.map(time => (
            <Button
              key={time}
              variant={selected === time ? 'contained' : 'outlined'}
              color={selected === time ? 'primary' : 'inherit'}
              onClick={() => handleClick(time)}
              sx={{
                mb: 1,
                minWidth: 100,
                borderRadius: 3,
                boxShadow: selected === time ? 3 : 0,
                fontWeight: selected === time ? 700 : 400,
                borderColor: selected === time ? 'primary.main' : '#e0e0e0',
                background: selected === time ? 'linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)' : '#fff',
                color: selected === time ? '#fff' : 'primary.main',
                transition: 'all 0.2s',
                '&:hover': {
                  background: selected === time ? 'linear-gradient(90deg, #64b5f6 0%, #1976d2 100%)' : '#f5f7fa',
                  color: '#1976d2',
                  boxShadow: 2,
                },
              }}
            >
              {time}
            </Button>
          ))
        )}
      </Stack>
    </div>
  );
} 