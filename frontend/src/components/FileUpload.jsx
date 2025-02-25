import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import api from '../api';
import Toast from './Toast';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log("Uploading file...");
            const response = await api.post('files/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("File uploaded successfully");
            console.log(response.data);
            setToastSeverity('success');
            setToastMessage('File uploaded successfully');
            setToastOpen(true);
            setFileName('');
        } catch (error) {
            console.error(error);
            setToastSeverity('error');
            setToastMessage('Failed to upload file');
            setToastOpen(true);
        }
    };

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    return (
        <Container
            maxWidth="sm"
            style={{ 
                marginTop: '2rem', 
                textAlign: 'center', 
                backgroundColor: '#121212',
                padding: '2rem',
                borderRadius: '8px',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ffffff' }}>
                Upload a File
            </Typography>
            <Box
                component="form"
                onSubmit={handleFileUpload}
                noValidate
                sx={{ mt: 1 }}
            >
                <input
                    accept="*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component="span" 
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {fileName ? fileName : 'Choose File'}
                    </Button>
                </label>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                >
                    Upload
                </Button>
            </Box>
            <Toast 
                open={toastOpen} 
                onClose={handleToastClose} 
                message={toastMessage} 
                severity={toastSeverity} 
            />
        </Container>
    );
};

export default FileUpload;
