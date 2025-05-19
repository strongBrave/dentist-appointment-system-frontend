import axios from 'axios';

const API_BASE = 'https://dentist-appointment-system-yjh-production.up.railway.app'; // 替换为你的后端地址

export const fetchDentists = () => axios.get(`${API_BASE}/dentists`);

export const fetchAvailability = (date, dentistId) =>
  axios.get(`${API_BASE}/availability`, { params: { date, dentistId } });

export const bookAppointment = (data) =>
  axios.post(`${API_BASE}/appointments`, data);

export const fetchAppointments = () =>
  axios.get(`${API_BASE}/appointments`); 