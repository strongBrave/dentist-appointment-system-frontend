import React from 'react';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enUS from 'date-fns/locale/en-US';
import { Paper, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: 400,
  margin: '0 auto',
  minWidth: 320,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  background: '#ffffff',
}));

const CalendarHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

function CustomDay(props) {
  const { day, selected, ...other } = props;
  return (
    <PickersDay
      {...other}
      day={day}
      selected={selected}
      sx={{
        borderRadius: '12px',
        fontWeight: selected ? 700 : 400,
        bgcolor: selected ? 'primary.main' : 'inherit',
        color: selected ? '#fff' : (day.getDay() === 0 || day.getDay() === 6 ? '#90caf9' : 'inherit'),
        '&:hover': {
          bgcolor: selected ? 'primary.dark' : '#e3f2fd',
        },
        transition: 'all 0.2s',
      }}
    />
  );
}

export default function Calendar({ selectedDate, onChange }) {
  return (
    <StyledPaper elevation={3}>
      <CalendarHeader variant="h6">
        <CalendarMonthIcon color="primary" />
        Select Date
      </CalendarHeader>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <DateCalendar
          value={selectedDate}
          onChange={onChange}
          slots={{ day: CustomDay }}
          sx={{
            width: '100%',
            minWidth: 300,
            mx: 'auto',
            '& .MuiPickersCalendarHeader-root': {
              mb: 1,
              fontWeight: 600,
              fontSize: 18,
            },
            '& .MuiPickersArrowSwitcher-root button': {
              color: 'primary.main',
              fontSize: 28,
            },
            '& .MuiPickersDay-root': {
              borderRadius: 2,
              fontSize: 18,
              width: 44,
              height: 44,
            },
          }}
        />
      </LocalizationProvider>
    </StyledPaper>
  );
}