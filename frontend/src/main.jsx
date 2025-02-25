import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { UserProvider } from './contexts/UserContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)