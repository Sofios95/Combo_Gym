import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Backdrop, CircularProgress } from '@mui/material';
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
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', pt: { xs: 10, md: 15 }, pb: 10, width: '100%' }}>
      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={isProcessing}>
        <CircularProgress color="error" />
      </Backdrop>

      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 1, color: '#fff', fontSize: { xs: '2.5rem', md: '4rem' } }}>
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>
        
        {/* Χρήση Flexbox με wrap και column στο κινητό */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          flexWrap: 'wrap',
          gap: 3, 
          mt: 6,
          justifyContent: 'center'
        }}>
          {tokenPackages.map((pkg, index) => (
            <Card key={index} sx={{ 
              bgcolor: '#0a0a0a', 
              border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
              width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' },
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900 }}>{pkg.title}</Typography>
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, my: 1 }}>€{pkg.price}</Typography>
                <Typography variant="h6" sx={{ color: '#444', mb: 2 }}>{pkg.tokens} SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 4 }}>{pkg.description}</Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button onClick={() => handlePurchase(pkg)} variant="contained" fullWidth sx={{ bgcolor: '#d32f2f', fontWeight: 900, py: 1.5 }}>ΑΓΟΡΑ</Button>
                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#333', textAlign: 'center' }}>ΛΗΞΗ: {pkg.expires}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Tokens;