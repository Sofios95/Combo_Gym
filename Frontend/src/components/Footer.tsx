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
        py: 4, 
        borderTop: `2px solid ${theme.palette.primary.main}`, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
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
          <Stack direction="row" spacing={1}>
            <IconButton 
              href="https://www.facebook.com/profile.php?id=100063726062395" 
              target="_blank" 
              sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton 
              href="https://www.instagram.com/combo.gym/" 
              target="_blank" 
              sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>

          {/* 3. Credits Section (DevSof) */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Made by{' '}
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