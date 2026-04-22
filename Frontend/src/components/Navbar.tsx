import { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  useTheme, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Chip 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Παίρνουμε user, tokens και logout από το Context
  const { tokens, user, logout } = useAuth();

  const navItems = [
    { label: 'ΑΛΕΞΑΝΔΡΟΣ', id: 'coach' },
    { label: 'GALLERY', id: 'the-gym' },
    { label: 'TOKENS', id: 'tokens' },
    { label: 'ΕΠΙΚΟΙΝΩΝΙΑ', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#000', borderBottom: `2px solid ${theme.palette.primary.main}`, zIndex: 1201 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          
          {/* Logo Section */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo-img.jpg" alt="Logo" style={{ height: '40px', marginRight: '12px', borderRadius: '4px' }} />
            <Typography variant="h6" sx={{ fontWeight: '800', textTransform: 'uppercase', display: { xs: 'none', md: 'block' } }}>
              COMBO <span style={{ color: theme.palette.primary.main }}>GYM</span>
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item.id} 
                onClick={() => handleScroll(item.id)} 
                sx={{ color: 'white', fontWeight: '600', '&:hover': { color: theme.palette.primary.main } }}
              >
                {item.label}
              </Button>
            ))}
            
            {/* Εμφάνιση "MY SESSIONS" μόνο αν ο χρήστης είναι συνδεδεμένος */}
            {user && (
              <Button 
                component={RouterLink} 
                to="/my-bookings" 
                startIcon={<HistoryIcon />}
                sx={{ color: theme.palette.primary.main, fontWeight: '700', ml: 1 }}
              >
                MY SESSIONS
              </Button>
            )}
          </Box>

          {/* Action Buttons (Tokens, Login/Logout, Book Now) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            
            {/* Live Token Count */}
            {user && (
               <Chip 
                label={`${tokens} TOKENS`} 
                color="primary" 
                variant="outlined" 
                sx={{ fontWeight: '900', color: 'white', borderColor: 'primary.main', display: { xs: 'none', sm: 'flex' } }} 
               />
            )}

            {!user ? (
              <Button component={RouterLink} to="/login" sx={{ color: 'white', fontWeight: '600', display: { xs: 'none', sm: 'block' } }}>
                LOGIN
              </Button>
            ) : (
              <Button onClick={logout} sx={{ color: '#666', fontWeight: 'bold', fontSize: '0.75rem', display: { xs: 'none', sm: 'block' } }}>
                LOGOUT
              </Button>
            )}
            
            {/* Το κεντρικό κουμπί Booking */}
            <Button 
              component={RouterLink} to="/book" variant="contained" 
              sx={{ 
                bgcolor: 'primary.main', 
                fontWeight: '900', 
                borderRadius: '20px', 
                px: { xs: 2, sm: 3 },
                '&:hover': { bgcolor: '#b71c1c' } 
              }}
            >
              BOOK NOW
            </Button>

            {/* Mobile Menu Icon */}
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} sx={{ display: { lg: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { bgcolor: '#121212', width: 280 } }}>
        <List sx={{ pt: 5 }}>
          
          {/* User Info στο Mobile */}
          {user?.email && (
             <Box sx={{ textAlign: 'center', mb: 3, px: 2 }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Γεια σου, {user.email.split('@')[0]}
                </Typography>
                <Typography sx={{ color: theme.palette.primary.main, fontWeight: '900' }}>
                  {tokens} TOKENS
                </Typography>
             </Box>
          )}

          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => handleScroll(item.id)}>
                <ListItemText primary={item.label} sx={{ color: 'white', textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))}
          
          {/* Mobile Links για Booking και Sessions */}
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/book" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="BOOK NOW" sx={{ color: theme.palette.primary.main, textAlign: 'center', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>

          {user && (
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/my-bookings" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="MY SESSIONS" sx={{ color: 'white', textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          )}

          {/* Login/Logout στο Mobile */}
          <ListItem disablePadding sx={{ mt: 5 }}>
            {!user ? (
              <ListItemButton component={RouterLink} to="/login" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="LOGIN" sx={{ color: 'white', textAlign: 'center', border: '1px solid white', borderRadius: '10px', mx: 4 }} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => { logout(); setMobileOpen(false); }}>
                <ListItemText primary="LOGOUT" sx={{ color: '#666', textAlign: 'center' }} />
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;