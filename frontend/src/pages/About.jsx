import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function About() {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
            <Typography variant="body1" paragraph>
                This is a file management application that allows users to upload, view, and share files.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Features:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Upload, view, and share files." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Complete authentication system implemented for secure access." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Built with React for the frontend and Django for the backend." />
                </ListItem>
            </List>
        </Box>
    );
}
