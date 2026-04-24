import { useState } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, 
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
      alert(err.response?.data?.message || "Σφάλμα συστήματος");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', pt: { xs: 10, md: 15 }, pb: 10, width: '100%', overflow: 'hidden' }}>
      <Backdrop sx={{ color: '#fff', zIndex: 1000, backdropFilter: 'blur(10px)' }} open={isProcessing}>
        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 4, py: 2, bgcolor: '#1a1a1a', border: '2px solid #d32f2f', borderRadius: 0 }}>
          <CircularProgress color="error" size={30} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff' }}>ΕΠΕΞΕΡΓΑΣΙΑ...</Typography>
        </Paper>
      </Backdrop>

      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 1, color: '#fff', fontSize: { xs: '2rem', md: '4rem' }, textTransform: 'uppercase' }}>
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>
        
        {/* ΕΔΩ ΕΙΝΑΙ ΤΟ ΚΛΕΙΔΙ: Flexbox Column στο κινητό */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3, 
          mt: 6,
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}>
          {tokenPackages.map((pkg, index) => (
            <Card key={index} sx={{ 
              bgcolor: '#0a0a0a', 
              border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
              flex: { xs: '1 1 auto', md: '1 1 25%' },
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 0,
              width: '100%' // Εξασφαλίζει ότι στο κινητό θα πιάνει όλο το πλάτος του container
            }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: '#d32f2f', mb: 1, letterSpacing: 1 }}>{pkg.title}</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 1, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>€{pkg.price}</Typography>
                <Typography variant="h6" sx={{ color: '#444', mb: 2, fontWeight: 800 }}>{pkg.tokens} SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 4, flexGrow: 1, lineHeight: 1.6 }}>{pkg.description}</Typography>
                
                <Box sx={{ mt: 'auto' }}>
                    <Button 
                        onClick={() => handlePurchase(pkg)} 
                        variant="contained" 
                        fullWidth 
                        sx={{ bgcolor: '#d32f2f', fontWeight: 900, py: 1.5, borderRadius: 0, '&:hover': { bgcolor: '#b71c1c' } }}
                    >
                        GET STARTED
                    </Button>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#333', fontWeight: 700 }}>ΛΗΞΗ: {pkg.expires}</Typography>
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