import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Toast = ({ open, onClose, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={onClose}
                severity={severity}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Toast;
