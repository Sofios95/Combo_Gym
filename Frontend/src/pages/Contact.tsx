import { Box, Container, Typography, Stack, Button, Link, useTheme } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact = () => {
  const theme = useTheme();

  return (
    <Container id="contact" maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
      {/* Τίτλος Section - Responsive font size */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 900, 
          mb: { xs: 4, md: 6 }, 
          textTransform: 'uppercase', 
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' } 
        }}
      >
        ΕΠΙΚΟΙΝΩΝΗΣΕ <span style={{ color: theme.palette.primary.main }}>ΜΑΖΙ ΜΑΣ</span>
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }}>
        
        {/* 1. Στοιχεία Επικοινωνίας */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            COMBO GYM - ΑΛΕΞΑΝΔΡΟΣ
          </Typography>
          
          <Stack spacing={4}>
            {/* Διεύθυνση */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>ΔΙΕΥΘΥΝΣΗ</Typography>
                <Typography variant="body1" sx={{ color: '#aaa' }}>Πεντέλης 4, Δάφνη 172 35</Typography>
              </Box>
            </Box>

            {/* Τηλέφωνο */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
              <PhoneIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>ΤΗΛΕΦΩΝΟ</Typography>
                <Typography variant="body1" sx={{ color: '#aaa' }}>6945 901 886</Typography>
              </Box>
            </Box>

            {/* Instagram */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
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

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ 
              mt: 5, 
              py: 2, 
              fontWeight: 'bold', 
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              bgcolor: 'primary.main',
              borderRadius: '30px',
              '&:hover': { bgcolor: 'error.dark' }
            }}
            href="https://www.instagram.com/combo.gym/"
            target="_blank"
          >
            ΣΤΕΙΛΕ ΜΑΣ ΜΗΝΥΜΑ
          </Button>
        </Box>

        {/* 2. Google Map - Διορθωμένο ύψος και πλάτος για κινητά */}
        <Box sx={{ 
          flex: 1.5, 
          height: { xs: '300px', md: '450px' }, 
          width: '100%', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          border: '2px solid #333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)' 
        }}>
          <iframe
            title="Combo Gym Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3146.06!2d23.73!3d37.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU3JzAwLjAiTiAyM8KwNDMnNTAuMCJF!5e0!3m2!1sel!2sgr!4v1234567890" // Βάλε εδώ το σωστό embed link σου
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