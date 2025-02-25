import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Fab, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const navItems = ['Home', 'About', 'Files'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: theme.palette.text.primary }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.default, zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, mr: 2, color: theme.palette.text.primary }}
          >
            PDFManagement
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link to={`/${item.toLowerCase()}`} key={item} style={{ textDecoration: 'none' }}>
                <Button key={item} sx={{ color: theme.palette.text.primary, ml: 1 }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>

          <Link to="/upload">
            <Fab
              sx={{
                display: { xs: 'none', sm: 'block' },
                ml: 2,
                transform: 'scale(0.6)',
                backgroundColor: '#fff',
                color: theme.palette.primary.main,
              }}
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Link>
          <Box sx={{ flexGrow: 1 }} />


          {isAuthenticated ? (
            <MenuItem onClick={() => { navigate('/logout'); handleClose(); }} sx={{ color: theme.palette.text.primary }}>
              Logout
            </MenuItem>
          ) : (
            <p style={{ color: theme.palette.text.primary }}>Login</p>
          )}


        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
