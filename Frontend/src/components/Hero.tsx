import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box sx={{
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      // Εδώ μπορείς να βάλεις μια φωτό από το γυμναστήριο
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/alex-img3.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgcolor: '#000'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '600px' }}>
          <Typography variant="h1" sx={{ 
            color: 'white', 
            mb: 2, 
            fontSize: { xs: '3rem', md: '5rem' },
            lineHeight: 1.1 
          }}>
            TRAIN LIKE A <span style={{ color: '#d32f2f' }}>PRO</span>
          </Typography>
          <Typography variant="h5" sx={{ color: '#ccc', mb: 5, fontWeight: 400 }}>
            Προπονήσου με τον Αλέξανδρο στο Combo Gym. Κλείσε τη θέση σου τώρα και ξεκίνα τη μάχη.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/book" 
            variant="contained" 
            size="large"
            sx={{ 
              py: 2, px: 5, 
              fontSize: '1.2rem', 
              borderRadius: '30px',
              fontWeight: '900' 
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