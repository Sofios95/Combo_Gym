import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D32F2F',
      dark: '#B71C1C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1E1E1E',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Oswald", "Roboto", "Arial", sans-serif',
    h1: { fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' },
    h2: { fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' },
    h3: { fontWeight: 800, textTransform: 'uppercase' },
    h4: { fontWeight: 800, textTransform: 'uppercase' },
    h6: { fontWeight: 700, textTransform: 'uppercase' },
    button: { fontWeight: 900, letterSpacing: '1px' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          // αφαιρέθηκε το global transform: scale(1.05) on hover
        },
        containedPrimary: {
          backgroundColor: '#D32F2F',
          '&:hover': {
            backgroundColor: '#B71C1C',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          backgroundImage: 'none',
          border: '1px solid #333',
        },
      },
    },
  },
});

export default theme;