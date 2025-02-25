import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api';
import Toast from '../components/Toast';

export default function FileList() {
    const [files, setFiles] = useState([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const fetchFiles = async () => {
        try {
            const res = await api.get('files/');
            setFiles(res.data);
        } catch (error) {
            console.log("Error fetching files:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`files/${id}/`);
            setFiles(files.filter(file => file.id !== id));
            console.log("File deleted successfully:", res.data);
            setToastSeverity('success');
            setToastMessage('File deleted successfully');
            setToastOpen(true);
        } catch (error) {
            console.log("Error deleting file:", error);
            setToastSeverity('error');
            setToastMessage('Failed to delete file');
            setToastOpen(true);
        }
    };

    const handleCopyLink = (fileUrl) => {
        navigator.clipboard.writeText(fileUrl)
            .then(() => {
                console.log("Link copied to clipboard");
                setToastSeverity('success');
                setToastMessage('Link copied to clipboard');
                setToastOpen(true);
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
                setToastSeverity('error');
                setToastMessage('Failed to copy link');
                setToastOpen(true);
            });
    };

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

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
                File List
            </Typography>
            <List>
                {files.map((file) => {
                    const ocrFileUrl = `${import.meta.env.VITE_API_URL}${file.file}.txt`;
                    return (
                    <ListItem key={file.id} style={{ backgroundColor: '#1c1c1c', margin: '0.5rem 0', borderRadius: '4px' }}>
                        <ListItemText>
                            <Link to={`${import.meta.env.VITE_API_URL}${file.file}`} style={{ color: '#64b5f6' }}>
                                {file.file.split('/')[3]}
                            </Link>
                        </ListItemText>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => window.open(ocrFileUrl, '_blank')}
                                sx={{ mr: 1 }}
                            >
                                View OCR
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleCopyLink(`${import.meta.env.VITE_API_URL}${file.file}`)}
                                sx={{ mr: 1 }}
                            >
                                Copy
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(file.id)}
                                sx={{ 
                                    backgroundColor: 'red', 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'darkred'
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                )})}
            </List>
            <Toast 
                open={toastOpen} 
                onClose={handleToastClose} 
                message={toastMessage} 
                severity={toastSeverity} 
            />
        </Container>
    );
}
