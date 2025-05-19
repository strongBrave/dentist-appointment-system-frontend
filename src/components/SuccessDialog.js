import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: theme.spacing(2),
    minWidth: 320,
  },
}));

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.success.main,
  fontWeight: 600,
  fontSize: '1.5rem',
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const CloseButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  fontWeight: 600,
}));

export default function SuccessDialog({ open, onClose }) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
        <SuccessIcon />
        <DialogTitleStyled>
          Appointment Confirmed!
        </DialogTitleStyled>
        <DialogContentStyled>
          Your appointment has been successfully booked. Thank you for choosing our service!
        </DialogContentStyled>
        <DialogActions>
          <CloseButton onClick={onClose} variant="contained" color="primary" autoFocus>
            Close
          </CloseButton>
        </DialogActions>
      </Box>
    </StyledDialog>
  );
} 