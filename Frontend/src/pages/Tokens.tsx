import { useState } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, 
  Button, Divider, Backdrop, CircularProgress, Paper, Stack 
} from '@mui/material';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const tokenPackages = [
  { title: 'DROP IN', tokens: 1, price: 20, description: 'Για μια γρήγορη δόση αδρεναλίνης. Μπες, δώσε τα πάντα στο σάκο και φύγε γεμάτος.', expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ' },
  { title: 'NEW MEMBER TRIAL', tokens: 2, price: 20, description: 'Η πρώτη σου επαφή με το ρινγκ. Δύο sessions για να καταλάβεις τι σημαίνει Combo Gym.', expires: 'ΛΗΞΗ: 7 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ' },
  { title: '4 SESSIONS PACK', tokens: 4, price: 60, description: 'Βελτίωσε την τεχνική σου και χτίσε αντοχή. Ιδανικό για να συνδυάσεις Boxing και Conditioning.', expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ' },
  { title: '8 SESSIONS PACK', tokens: 8, price: 100, description: 'Το πακέτο των αφοσιωμένων. Για σένα που το boxing έγινε τρόπος ζωής και δεν συμβιβάζεσαι.', expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ', featured: true },
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
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', pt: { xs: 10, md: 15 }, pb: 10, width: '100%', overflowX: 'hidden' }}>
      <Backdrop sx={{ color: '#fff', zIndex: 1000, backdropFilter: 'blur(10px)' }} open={isProcessing}>
        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 4, py: 2, bgcolor: '#1a1a1a', border: '2px solid #d32f2f' }}>
          <CircularProgress color="error" size={30} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff' }}>ΕΠΕΞΕΡΓΑΣΙΑ...</Typography>
        </Paper>
      </Backdrop>

      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 1, color: '#fff', fontSize: { xs: '2.5rem', md: '4.5rem' }, textTransform: 'uppercase' }}>
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>
        
        {/* ΕΔΩ ΕΙΝΑΙ Η ΑΛΛΑΓΗ: FlexBox αντί για Grid */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3, 
          mt: 6,
          width: '100%',
          alignItems: 'stretch'
        }}>
          {tokenPackages.map((pkg, index) => (
            <Card key={index} sx={{ 
              bgcolor: '#0a0a0a', 
              border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
              flex: { xs: '1 1 auto', md: '1 1 25%' },
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 0
            }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: '#d32f2f', mb: 1 }}>{pkg.title}</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>€{pkg.price}</Typography>
                <Typography variant="h6" sx={{ color: '#444', mb: 2 }}>{pkg.tokens} SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 4, flexGrow: 1 }}>{pkg.description}</Typography>
                <Button onClick={() => handlePurchase(pkg)} variant="contained" fullWidth sx={{ bgcolor: '#d32f2f', fontWeight: 900, py: 1.5 }}>GET STARTED</Button>
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#333', textAlign: 'center' }}>{pkg.expires}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Tokens;