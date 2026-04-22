import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D32F2F', // Το κόκκινο του Combo Gym
      dark: '#B71C1C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1E1E1E',
    },
    background: {
      default: '#000000', // Απόλυτο μαύρο για το background
      paper: '#121212',   // Πολύ σκούρο γκρι για τις κάρτες
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    // Χρησιμοποιούμε Oswald για το "boxing" vibe (πρέπει να την κάνεις import στο index.html)
    fontFamily: '"Oswald", "Roboto", "Arial", sans-serif',
    h1: { fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' },
    h2: { fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' },
    h3: { fontWeight: 800, textTransform: 'uppercase' },
    h4: { fontWeight: 800, textTransform: 'uppercase' },
    h6: { fontWeight: 700, textTransform: 'uppercase' },
    button: { fontWeight: 900, letterSpacing: '1px' },
  },
  shape: {
    borderRadius: 8, // Όχι πολύ στρογγυλεμένα, να είναι "κοφτερό" το design
  },
  components: {
    // Κάνουμε τα κουμπιά να φαίνονται πιο "Pro"
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Πιο τετράγωνα κουμπιά για πιο "επιθετικό" στυλ
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          backgroundColor: '#D32F2F',
          '&:hover': {
            backgroundColor: '#B71C1C',
          },
        },
      },
    },
    // Κάνουμε τις κάρτες να ξεχωρίζουν
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          backgroundImage: 'none', // Αφαιρούμε το default gradient του MUI
          border: '1px solid #333',
        },
      },
    },
  },
});

export default theme;