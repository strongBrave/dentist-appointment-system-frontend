import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { fetchAppointments } from '../api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  marginBottom: theme.spacing(3),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
  padding: theme.spacing(2, 3),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-head': {
    fontWeight: 600,
    background: '#f8fafd',
    color: theme.palette.primary.main,
  },
  '& .MuiTableCell-body': {
    fontSize: '0.95rem',
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#e8f5e9',
  color: '#388e3c',
  borderRadius: '8px',
  fontWeight: 600,
  padding: theme.spacing(0.5, 1.5),
  '& .MuiChip-icon': {
    color: '#4caf50',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  '& .MuiTypography-caption': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  },
}));

function formatDateTime(dateStr, time) {
  if (!dateStr) return '';
  // 输出如 Apr 14, 2025 at 09:00
  const date = dayjs(dateStr).format('MMM D, YYYY');
  return `${date} at ${time}`;
}

function formatToday() {
  return dayjs().format('MMMM D, YYYY');
}

export default function Doctors() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then(res => setAppointments(res.data));
  }, []);

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <StyledPaper>
        <HeaderBox>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarMonthIcon color="primary" />
            <Typography variant="h6" fontWeight={700} color="primary.dark">
              Doctor's Appointments
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarMonthIcon sx={{ color: '#90caf9' }} />
            <Typography color="text.secondary" fontWeight={500}>
              Today: {formatToday()}
            </Typography>
          </Stack>
        </HeaderBox>
        <TableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a._id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                      {a.patient_name}
                    </Stack>
                  </TableCell>
                  <TableCell>Dr. John Lee</TableCell>
                  <TableCell>
                    <ContactInfo>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <EmailIcon fontSize="small" color="action" />
                        {a.patient_email}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        {a.patient_phone}
                      </Typography>
                    </ContactInfo>
                  </TableCell>
                  <TableCell>{formatDateTime(a.date, a.time)}</TableCell>
                  <TableCell>
                    <StatusChip
                      icon={<CheckCircleIcon />}
                      label={a.status}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </StyledPaper>
      {appointments.length === 0 && (
        <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
          No appointments found
        </Typography>
      )}
    </Box>
  );
} 