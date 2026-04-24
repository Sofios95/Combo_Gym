import { useState } from 'react';
import { 
  Box, Container, Typography, 
  Button, Backdrop, CircularProgress, Paper 
} from '@mui/material';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const tokenPackages = [
  { title: 'DROP IN', tokens: 1, price: 20, description: 'Για μια γρήγορη δόση αδρεναλίνης. Μπες, δώσε τα πάντα στο σάκο και φύγε γεμάτος.', expires: '30 ΗΜΕΡΕΣ' },
  { title: 'NEW MEMBER TRIAL', tokens: 2, price: 20, description: 'Η πρώτη σου επαφή με το ρινγκ. Δύο sessions για να καταλάβεις τι σημαίνει Combo Gym.', expires: '7 ΗΜΕΡΕΣ' },
  { title: '4 SESSIONS PACK', tokens: 4, price: 60, description: 'Βελτίωσε την τεχνική σου και χτίσε αντοχή. Ιδανικό για boxing και conditioning.', expires: '30 ΗΜΕΡΕΣ' },
  { title: '8 SESSIONS PACK', tokens: 8, price: 100, description: 'Το πακέτο των αφοσιωμένων. Για σένα που το boxing έγινε τρόπος ζωής.', expires: '30 ΗΜΕΡΕΣ', featured: true },
];

const Tokens = () => {
  const { refreshTokens } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async (pkg: any) => {
    try {
      setIsProcessing(true);
      const res = await api.post('/tokens/purchase', { amount: pkg.tokens, packageTitle: pkg.title });
      await refreshTokens();
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Σφάλμα");
    } finally { setIsProcessing(false); }
  };

  return (
    <Box sx={{ 
      bgcolor: '#000', 
      minHeight: '100vh', 
      pt: { xs: 10, md: 15 }, 
      pb: 10, 
      width: '100%', 
      overflowX: 'hidden' 
    }}>
      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={isProcessing}>
        <CircularProgress color="error" />
      </Backdrop>

      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            fontWeight: 900, 
            mb: 6, 
            color: '#fff', 
            fontSize: { xs: '2rem', md: '4rem' },
            textTransform: 'uppercase'
          }}
        >
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>

        {/* ΤΟ ΚΡΙΣΙΜΟ BOX ΠΟΥ ΔΙΟΡΘΩΝΕΙ ΤΟ LAYOUT */}
        <Box sx={{
          display: 'flex !important',
          flexDirection: { xs: 'column !important', md: 'row !important' },
          flexWrap: 'wrap !important',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
        }}>
          {tokenPackages.map((pkg, index) => (
            <Box 
              key={index} 
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(25% - 24px)' },
                maxWidth: { xs: '100%', md: '320px' },
                width: '100%',
                display: 'flex'
              }}
            >
              <Paper sx={{
                bgcolor: '#0a0a0a',
                color: '#fff',
                border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
                borderRadius: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#d32f2f',
                  transform: 'translateY(-5px)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900, mb: 1, letterSpacing: 1 }}>
                  {pkg.title}
                </Typography>
                
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '2.5rem', md: '3rem' } }}>
                  €{pkg.price}
                </Typography>
                
                <Typography variant="h6" sx={{ color: '#444', mb: 2, fontWeight: 800 }}>
                  {pkg.tokens} SESSIONS
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#888', mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                  {pkg.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Button
                    onClick={() => handlePurchase(pkg)}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      bgcolor: '#d32f2f', 
                      color: '#fff',
                      fontWeight: 900, 
                      py: 1.5, 
                      borderRadius: 0,
                      '&:hover': { bgcolor: '#b71c1c' }
                    }}
                  >
                    GET STARTED
                  </Button>
                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#333', textAlign: 'center', fontWeight: 700 }}>
                    ΛΗΞΗ: {pkg.expires}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Tokens;