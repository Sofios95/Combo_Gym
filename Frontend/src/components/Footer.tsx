import { Box, Container, Typography, Stack, IconButton, Link, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#000', 
        color: 'white', 
        py: { xs: 6, md: 4 }, // Περισσότερο padding στο κινητό για να μην "κολλάει"
        borderTop: `2px solid ${theme.palette.primary.main}`, 
        mt: 'auto',
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 3 }} // Περισσότερο κενό ανάμεσα στα στοιχεία στο κινητό
          justifyContent="space-between" 
          alignItems="center"
        >
          {/* 1. Brand & Copyright */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: { xs: 'center', md: 'flex-start' }, 
              mb: 1 
            }}>
              <img 
                src="/logo-img.jpg" 
                alt="Combo Gym Logo" 
                style={{ 
                  height: '35px', 
                  marginRight: '12px', 
                  borderRadius: '4px',
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', lineHeight: 1 }}>
                COMBO GYM
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
              © {new Date().getFullYear()} All Rights Reserved.
            </Typography>
          </Box>

          {/* 2. Social Media Links */}
          <Box>
              <Typography variant="subtitle2" sx={{ color: '#666', mb: 1, textAlign: 'center', display: { xs: 'block', md: 'none' } }}>
                  FOLLOW US
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton 
                  href="https://www.facebook.com/profile.php?id=100063726062395" 
                  target="_blank" 
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  href="https://www.instagram.com/combo.gym/" 
                  target="_blank" 
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
          </Box>

          {/* 3. Credits Section */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Designed & Developed by{' '}
              <Link 
                href="https://github.com/Sofios95" 
                target="_blank" 
                underline="hover" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  '&:hover': { color: 'white' }
                }}
              >
                DevSof
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;