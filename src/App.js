import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography, Tabs, Tab } from '@mui/material';
import DentistSelector from './components/DentistSelector';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import AppointmentForm from './components/AppointmentForm';
import SuccessDialog from './components/SuccessDialog';
import { fetchDentists, fetchAvailability, fetchAppointments } from './api';
import Doctors from './components/Doctors';
import './App.css';
import dayjs from 'dayjs';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function App() {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [pageTab, setPageTab] = useState(0);

  // Fetch dentist list
  useEffect(() => {
    fetchDentists().then(res => setDentists(res.data));
  }, []);

  // Fetch all appointments
  useEffect(() => {
    fetchAppointments().then(res => setAppointments(res.data));
  }, [success]);

  // Fetch available time slots
  useEffect(() => {
    if (selectedDate) {
      const dateStr = dayjs(selectedDate).format('YYYY-MM-DD');
      console.log(dateStr);
      fetchAvailability(dateStr, selectedDentist || undefined)
        .then(res => {
          let slots = res.data.availableSlots || [];
          // Filter out booked time slots
          const booked = appointments
            .filter(a => a.date === dateStr && (!selectedDentist || a.dentistId === selectedDentist))
            .map(a => a.time);
          slots = slots.filter(time => !booked.includes(time));
          setAvailableSlots(slots);
        });
    } else {
      setAvailableSlots([]);
    }
    setSelectedTime('');
    setShowForm(false);
  }, [selectedDate, selectedDentist, appointments]);

  const handleTimeSelect = time => {
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setShowForm(false);
    setSelectedTime('');
  };

  return (
    <Container className="app-container" maxWidth={false}>
      <Typography 
        variant="h4" 
        color="primary" 
        className="app-title"
      >
        DentalCare Appointments
      </Typography>
      <Tabs 
        value={pageTab} 
        onChange={(_, v) => setPageTab(v)}
        className="app-tabs"
        centered
      >
        <Tab label="Book Appointment" />
        <Tab label="Our Doctors" />
      </Tabs>
      {pageTab === 0 && (
        <Paper className="main-paper" elevation={3}>
          <Box className="left-section">
            <DentistSelector
              dentists={dentists}
              value={selectedDentist}
              onChange={setSelectedDentist}
            />
            <div className="calendar-area">
              <Calendar
                selectedDate={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
            <div className="timeslots-area">
              <TimeSlots
                slots={availableSlots}
                onSelect={handleTimeSelect}
              />
            </div>
          </Box>
          <Box className="right-section">
            <Paper className="info-paper">
              <div className="process-title">
                <CheckCircleOutlineIcon className="process-step-icon" />
                Appointment Process
              </div>
              <ul className="process-list">
                <li>1. Select Date</li>
                <li>2. Choose Dentist</li>
                <li>3. Select Time Slot</li>
                <li>4. Fill Information</li>
                <li>5. Confirm Appointment</li>
              </ul>
            </Paper>
            <div style={{
              background: '#fffbe6',
              border: '1px solid #ffe58f',
              color: '#ad8b00',
              borderRadius: 8,
              padding: '12px 16px',
              marginBottom: 16,
              fontSize: '0.98rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span role="img" aria-label="info">⚠️</span>
              If the layout looks strange, please adjust your browser's zoom (Ctrl + 滚轮 or Ctrl + +/-).
            </div>
            {showForm && selectedDate && selectedTime && (
              <AppointmentForm
                date={dayjs(selectedDate).format('YYYY-MM-DD')}
                time={selectedTime}
                dentistId={selectedDentist}
                onSuccess={handleSuccess}
              />
            )}
          </Box>
        </Paper>
      )}
      {pageTab === 1 && <Doctors />}
      <SuccessDialog open={success} onClose={() => setSuccess(false)} />
    </Container>
  );
} 