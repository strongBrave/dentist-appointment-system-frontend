import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { bookAppointment } from '../api';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  background: '#ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}));

const FormHeader = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  background: 'linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)',
  '&:hover': {
    background: 'linear-gradient(90deg, #64b5f6 0%, #1976d2 100%)',
  },
}));

export default function AppointmentForm({ date, time, dentistId, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log(date);
      await bookAppointment({
        dentistId,
        date,
        time,
        patient: form,
      });
      onSuccess();
    } catch (err) {
      setError('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <StyledPaper elevation={3}>
      <Box component="form" onSubmit={handleSubmit}>
        <FormHeader variant="h6">
          <PersonIcon />
          Appointment Information
        </FormHeader>
        <StyledTextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputProps={{
            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <StyledTextField
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          type="email"
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <StyledTextField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputProps={{
            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Confirm Appointment'}
        </SubmitButton>
      </Box>
    </StyledPaper>
  );
} 