import { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  useTheme, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Chip, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
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
        {/* Αυξημένο minHeight για πιο "βαρύ" navbar */}
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 }, minHeight: { xs: '64px', sm: '72px' } }}>
          
          {/* Logo */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box
              component="img"
              src="/logo-img.jpg"
              alt="Logo"
              sx={{ height: { xs: '36px', sm: '44px' }, mr: 1, borderRadius: '4px' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', display: { xs: 'none', md: 'block' }, letterSpacing: '1px' }}>
              COMBO <span style={{ color: theme.palette.primary.main }}>GYM</span>
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button key={item.id} onClick={() => handleScroll(item.id)} sx={{ color: 'white', fontWeight: 600, '&:hover': { color: theme.palette.primary.main } }}>
                {item.label}
              </Button>
            ))}
            {user && (
              <Button component={RouterLink} to="/my-bookings" startIcon={<HistoryIcon />} sx={{ color: theme.palette.primary.main, fontWeight: 700, ml: 1 }}>
                MY SESSIONS
              </Button>
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            {user && (
              <Chip label={`${tokens} TK`} color="primary" variant="outlined" sx={{ fontWeight: 900, color: 'white', borderColor: 'primary.main', display: { xs: 'none', sm: 'flex' }, height: '32px' }} />
            )}
            {!user ? (
              <Button component={RouterLink} to="/login" sx={{ color: 'white', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>LOGIN</Button>
            ) : (
              <Button onClick={logout} sx={{ color: '#666', fontWeight: 'bold', fontSize: '0.75rem', display: { xs: 'none', sm: 'block' } }}>LOGOUT</Button>
            )}
            <Button component={RouterLink} to="/book" variant="contained"
              sx={{ bgcolor: 'primary.main', fontWeight: 900, borderRadius: '20px', px: { xs: 2, sm: 3 }, py: { xs: 0.8, sm: 1 }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, '&:hover': { bgcolor: '#b71c1c' }, whiteSpace: 'nowrap', minWidth: 'auto' }}
            >
              BOOK NOW
            </Button>
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} sx={{ display: { lg: 'none' }, ml: 0.5, p: { xs: 0.5, sm: 1 } }}>
              <MenuIcon sx={{ fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { bgcolor: '#0a0a0a', width: 300, borderLeft: '2px solid #d32f2f' } }}>
        
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid #1a1a1a' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'white' }}>
            COMBO <span style={{ color: '#d32f2f' }}>GYM</span>
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#666', '&:hover': { color: 'white' } }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* User Info */}
        {user?.email && (
          <Box sx={{ px: 3, py: 2.5, bgcolor: '#111', borderBottom: '1px solid #1a1a1a' }}>
            <Typography sx={{ color: '#888', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Συνδεδεμένος ως
            </Typography>
            <Typography sx={{ color: 'white', fontWeight: 700, mt: 0.5 }}>
              {user.email.split('@')[0]}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d32f2f' }} />
              <Typography sx={{ color: '#d32f2f', fontWeight: 900, fontSize: '0.9rem' }}>
                {tokens} TOKENS
              </Typography>
            </Box>
          </Box>
        )}

        {/* Nav Links */}
        <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => handleScroll(item.id)}
                sx={{ borderRadius: 1, py: 1.5, '&:hover': { bgcolor: '#1a1a1a', '& .MuiListItemText-primary': { color: '#d32f2f' } } }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontWeight: 700, letterSpacing: 1, fontSize: '0.9rem' }} 
                  sx={{ color: 'white', textAlign: 'center' }} 
                />
              </ListItemButton>
            </ListItem>
          ))}

          {user && (
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton component={RouterLink} to="/my-bookings" onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 1, py: 1.5, '&:hover': { bgcolor: '#1a1a1a' } }}
              >
                <ListItemText 
                  primary="MY SESSIONS" 
                  primaryTypographyProps={{ fontWeight: 700, letterSpacing: 1, fontSize: '0.9rem' }} 
                  sx={{ color: '#d32f2f', textAlign: 'center' }} 
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Divider sx={{ borderColor: '#1a1a1a' }} />

        {/* Bottom Actions */}
        <Box sx={{ px: 2, py: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button component={RouterLink} to="/book" variant="contained" fullWidth onClick={() => setMobileOpen(false)}
            sx={{ bgcolor: '#d32f2f', fontWeight: 900, borderRadius: 0, py: 1.5, '&:hover': { bgcolor: '#ff1744' } }}
          >
            BOOK NOW
          </Button>
          {!user ? (
            <Button component={RouterLink} to="/login" variant="outlined" fullWidth onClick={() => setMobileOpen(false)}
              sx={{ color: 'white', borderColor: '#333', borderRadius: 0, py: 1.5, fontWeight: 700, '&:hover': { borderColor: 'white', bgcolor: 'transparent' } }}
            >
              LOGIN
            </Button>
          ) : (
            <Button onClick={() => { logout(); setMobileOpen(false); }} fullWidth
              sx={{ color: '#555', borderRadius: 0, py: 1.5, fontWeight: 700, '&:hover': { color: 'white', bgcolor: '#1a1a1a' } }}
            >
              LOGOUT
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;