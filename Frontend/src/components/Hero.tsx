import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box sx={{
      // Responsive ύψος: 80% στο κινητό, 95% στο desktop
      minHeight: { xs: '80vh', md: '95vh' }, 
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      // Το background image παραμένει, με πιο σκούρο overlay για να "πετάγεται" το κείμενο
      background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/alex-img3.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgcolor: '#000',
      borderBottom: '4px solid #d32f2f'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              mx: { xs: 'auto', md: 0 } 
            }}>
              <Typography variant="overline" sx={{ color: '#d32f2f', fontWeight: 900, letterSpacing: 4 }}>
                EST. MARCH 2016
              </Typography>
              
              <Typography variant="h1" sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: { xs: '3rem', md: '5.5rem' },
                lineHeight: 0.9,
                fontWeight: 900,
                textTransform: 'uppercase'
              }}>
                COMBO <span style={{ color: '#d32f2f' }}>GYM</span>
              </Typography>
              
              <Typography variant="h5" sx={{ 
                color: '#eee', 
                mb: 3, 
                fontWeight: 800,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                textTransform: 'uppercase'
              }}>
                Προπόνηση σε όλα τα επίπεδα & κάθε στόχο.
              </Typography>

              <Typography variant="body1" sx={{ 
                color: '#888', 
                mb: 5, 
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                maxWidth: '650px',
                lineHeight: 1.6
              }}>
                Με 16 χρόνια εμπειρίας στην πυγμαχία, ο Αλέξανδρος δημιουργεί προγράμματα προσαρμοσμένα στις ανάγκες σου. 
                Από τη θέση μάχης μέχρι την αγωνιστική προετοιμασία, το πλάνο συμμορφώνεται με την ηλικία και την κατάστασή σου.
              </Typography>

              <Button 
                component={RouterLink} 
                to="/booking" 
                variant="contained" 
                size="large"
                sx={{ 
                  py: 2, 
                  px: 6, 
                  fontSize: '1.2rem', 
                  borderRadius: 0, // Brutal square design
                  fontWeight: '900',
                  bgcolor: '#d32f2f',
                  textTransform: 'uppercase',
                  '&:hover': { bgcolor: '#ff1744' }
                }}
              >
                ΚΛΕΙΣΕ ΘΕΣΗ
              </Button>
            </Box>
          </Grid>

          {/* Δεξιά πλευρά: Γρήγορα Info Cards (Μόνο σε Desktop) */}
          <Grid item md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(20,20,20,0.8)', borderLeft: '4px solid #d32f2f', borderRadius: 0 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 900 }}>LEVELS</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Απλό • Προχωρημένο • Αγωνιστικό</Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(20,20,20,0.8)', borderLeft: '4px solid #d32f2f', borderRadius: 0 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 900 }}>SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Group • Ατομικά • Έως 4 άτομα</Typography>
              </Paper>
              <Paper sx={{ p: 3, bgcolor: 'rgba(20,20,20,0.8)', borderLeft: '4px solid #d32f2f', borderRadius: 0 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 900 }}>CONDITIONING</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Μυϊκή ενδυνάμωση & αντοχή</Typography>
              </Paper>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;