import { Box, Container, Typography, Stack, Button, Link, useTheme } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact = () => {
  const theme = useTheme();

  return (
    <Container id="contact" maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      {/* Τίτλος Section */}
      <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textTransform: 'uppercase', textAlign: 'center' }}>
        ΕΠΙΚΟΙΝΩΝΗΣΕ <span style={{ color: theme.palette.primary.main }}>ΜΑΖΙ ΜΑΣ</span>
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
        
        {/* 1. Στοιχεία Επικοινωνίας (Αριστερή Στήλη) */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            COMBO GYM - ΑΛΕΞΑΝΔΡΟΣ
          </Typography>
          
          <Stack spacing={4}>
            {/* Διεύθυνση */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>ΔΙΕΥΘΥΝΣΗ</Typography>
                <Typography variant="body1" sx={{ color: '#aaa' }}>Πεντέλης 4, Δάφνη 172 35</Typography>
              </Box>
            </Box>

            {/* Τηλέφωνο */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PhoneIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>ΤΗΛΕΦΩΝΟ</Typography>
                <Typography variant="body1" sx={{ color: '#aaa' }}>6945 901 886</Typography>
              </Box>
            </Box>

            {/* Instagram */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InstagramIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>INSTAGRAM</Typography>
                <Link 
                  href="https://www.instagram.com/combo.gym/" 
                  target="_blank" 
                  sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  @combo.gym
                </Link>
              </Box>
            </Box>
          </Stack>

          {/* Κουμπί για Instagram DM */}
          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ 
              mt: 6, 
              py: 2, 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'error.dark' }
            }}
            href="https://www.instagram.com/combo.gym/"
            target="_blank"
          >
            ΣΤΕΙΛΕ ΜΑΣ ΜΗΝΥΜΑ
          </Button>
        </Box>

        {/* 2. Google Map (Δεξιά Στήλη) */}
        <Box sx={{ 
          flex: 1.5, 
          height: '400px', 
          width: '100%', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          border: '2px solid #333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)' 
        }}>
          <iframe
            title="Combo Gym Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.123456789!2d23.7345678!3d37.9512345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd3f1234567b%3A0x123456789abcdef!2sPentelis%204%2C%20Dafni%20172%2035!5e0!3m2!1sen!2sgr!4v1711234567890!5m2!1sen!2sgr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

      </Stack>
    </Container>
  );
};

export default Contact;