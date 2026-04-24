import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box sx={{
      // Στο κινητό (xs) 70% του ύψους, στο desktop (md) 90%
      height: { xs: '70vh', md: '90vh' }, 
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/alex-img3.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgcolor: '#000'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          maxWidth: '600px',
          // Κεντράρουμε το κείμενο στο κινητό, αριστερή στοίχιση στο desktop
          textAlign: { xs: 'center', md: 'left' },
          mx: { xs: 'auto', md: 0 } 
        }}>
          <Typography variant="h1" sx={{ 
            color: 'white', 
            mb: 2, 
            // Μικραίνουμε λίγο το font στο κινητό (2.5rem)
            fontSize: { xs: '2.5rem', md: '5rem' },
            lineHeight: 1.1,
            fontWeight: 800
          }}>
            TRAIN LIKE A <span style={{ color: '#d32f2f' }}>PRO</span>
          </Typography>
          
          <Typography variant="h5" sx={{ 
            color: '#ccc', 
            mb: 4, 
            fontWeight: 400,
            // Μικραίνουμε το μέγεθος του κειμένου στο κινητό
            fontSize: { xs: '1.1rem', md: '1.5rem' }
          }}>
            Προπονήσου με τον Αλέξανδρο στο Combo Gym. Κλείσε τη θέση σου τώρα και ξεκίνα τη μάχη.
          </Typography>

          <Button 
            component={RouterLink} 
            to="/book" 
            variant="contained" 
            size="large"
            sx={{ 
              // Λίγο πιο μαζεμένο κουμπί στο κινητό
              py: { xs: 1.5, md: 2 }, 
              px: { xs: 4, md: 5 }, 
              fontSize: { xs: '1rem', md: '1.2rem' }, 
              borderRadius: '30px',
              fontWeight: '900',
              textTransform: 'uppercase'
            }}
          >
            ΚΛΕΙΣΕ ΘΕΣΗ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;