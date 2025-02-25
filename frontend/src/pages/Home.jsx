import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, Button } from '@mui/material';

export default function Home() {
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
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the File Management System
            </Typography>
            <List>
                <ListItem>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/upload"
                        fullWidth
                        style={{ marginBottom: '1rem' }}
                    >
                        Upload File
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/files"
                        fullWidth
                    >
                        View Files
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
}
