import { Box, Container, Typography, Stack, Button } from '@mui/material';
import theme from '../theme';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'; 
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; 
import HistoryIcon from '@mui/icons-material/History'; 

const About = () => {
  return (
    <Container id="about" maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={{ xs: 6, md: 10 }} 
        alignItems="center"
      >
        {/* Αριστερή Στήλη: Φωτογραφία με Red Frame */}
        <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20, 
              width: '100%', 
              height: '100%', 
              border: `3px solid ${theme.palette.primary.main}`, 
              borderRadius: '12px',
              zIndex: 0 
            }} 
          />
          <Box
            component="img"
            src="/alex-img3.jpg"
            alt="Αλέξανδρος - Combo Gym"
            sx={{
              width: '100%',
              borderRadius: '12px',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              filter: 'grayscale(10%) contrast(1.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          />
        </Box>

        {/* Δεξιά Στήλη: Κείμενο & Stats */}
        <Box sx={{ flex: 1.2, zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 3 }}>
            LEGACY & TRAINING
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, mt: 1, textTransform: 'uppercase', lineHeight: 1 }}>
            ΠΡΟΠΟΝΗΣΗ ΜΕ <br />
            <span style={{ color: theme.palette.primary.main }}>ΤΟΝ ΑΛΕΞΑΝΔΡΟ</span>
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#ccc', mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
            Με πολυετή σταδιοδρομία στο χώρο της πυγμαχίας και αμέτρητες ώρες στο ρινγκ, ο Αλέξανδρος ίδρυσε το <b>Combo Gym</b> στην Πεντέλης 4 με ένα σκοπό: να μεταδώσει την αυθεντική φιλοσοφία του αθλήματος. 
            <br /><br />
            Δεν προσφέρουμε απλή γυμναστική, αλλά εξειδικευμένα επίπεδα προπόνησης που καλύπτουν από τον αρχάριο μέχρι τον επαγγελματία αθλητή.
          </Typography>

          {/* Stats Section με Stack - Εδώ δεν θα ξαναβγάλει Error ποτέ */}
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="space-between" 
            sx={{ mb: 5, textAlign: 'center' }}
          >
            <Box sx={{ flex: 1 }}>
              <MilitaryTechIcon sx={{ color: 'primary.main', fontSize: '2.5rem', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'white' }}>15+</Typography>
              <Typography variant="caption" sx={{ color: '#aaa', display: 'block', fontWeight: 'bold' }}>
                ΕΤΗ ΕΜΠΕΙΡΙΑΣ
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <HistoryIcon sx={{ color: 'primary.main', fontSize: '2.5rem', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'white' }}>2015</Typography>
              <Typography variant="caption" sx={{ color: '#aaa', display: 'block', fontWeight: 'bold' }}>
                ΕΤΟΣ ΙΔΡΥΣΗΣ
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: '2.5rem', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'white' }}>100%</Typography>
              <Typography variant="caption" sx={{ color: '#aaa', display: 'block', fontWeight: 'bold' }}>
                REAL BOXING
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button 
                variant="contained" 
                size="large" 
                href="#contact"
                sx={{ px: 5, py: 1.5, fontWeight: 900, fontSize: '1rem' }}
            >
              ΚΛΕΙΣΕ ΘΕΣΗ
            </Button>
            <Button 
                variant="outlined" 
                size="large" 
                href="#gallery"
                sx={{ px: 5, py: 1.5, fontWeight: 900, fontSize: '1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              ΔΕΣ ΤΟΝ ΧΩΡΟ
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default About;