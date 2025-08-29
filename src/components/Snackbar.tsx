import * as React from 'react';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
export interface AutohideSnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

export default function AutohideSnackbar({ message, open, onClose }: AutohideSnackbarProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    >
    <Alert
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
    >{message}</Alert>
    </Snackbar>
  );
}
