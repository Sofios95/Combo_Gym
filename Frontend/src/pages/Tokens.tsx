import { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, 
  Button, Divider, Backdrop, CircularProgress, Paper 
} from '@mui/material';
import { FlashOn, SportsScore, FitnessCenter, MilitaryTech } from '@mui/icons-material';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const tokenPackages = [
  {
    title: 'DROP IN',
    tokens: 1,
    price: 20,
    description: 'Για μια γρήγορη δόση αδρεναλίνης. Μπες, δώσε τα πάντα στο σάκο και φύγε γεμάτος.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
    icon: <FlashOn sx={{ fontSize: 40, color: '#d32f2f' }} />,
  },
  {
    title: 'NEW MEMBER TRIAL',
    tokens: 2,
    price: 20,
    description: 'Η πρώτη σου επαφή με το ρινγκ. Δύο sessions για να καταλάβεις τι σημαίνει Combo Gym.',
    expires: 'ΛΗΞΗ: 7 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
    icon: <SportsScore sx={{ fontSize: 40, color: '#d32f2f' }} />,
  },
  {
    title: '4 SESSIONS PACK',
    tokens: 4,
    price: 60,
    description: 'Βελτίωσε την τεχνική σου και χτίσε αντοχή. Ιδανικό για να συνδυάσεις Boxing και Conditioning.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
    icon: <FitnessCenter sx={{ fontSize: 40, color: '#d32f2f' }} />,
  },
  {
    title: '8 SESSIONS PACK',
    tokens: 8,
    price: 100,
    description: 'Το πακέτο των αφοσιωμένων. Για σένα που το boxing έγινε τρόπος ζωής και δεν συμβιβάζεσαι.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
    icon: <MilitaryTech sx={{ fontSize: 40, color: '#d32f2f' }} />,
    featured: true,
  },
];

const Tokens = () => {
  const { refreshTokens } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async (pkg: any) => {
    try {
      setIsProcessing(true);
      const res = await api.post('/tokens/purchase', { 
        amount: pkg.tokens,
        packageTitle: pkg.title 
      });
      await refreshTokens(); 
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Σφάλμα συστήματος");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', pt: 12, pb: 10 }}>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)' }}
        open={isProcessing}
      >
        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 4, py: 2, bgcolor: '#1a1a1a', borderRadius: '4px', border: '2px solid #d32f2f' }}>
          <CircularProgress color="error" size={30} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>
            ΕΠΕΞΕΡΓΑΣΙΑ ΠΛΗΡΩΜΗΣ...
          </Typography>
        </Paper>
      </Backdrop>

      <Container maxWidth="xl">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', color: '#ffffff', fontSize: { xs: '2.8rem', md: '4.5rem' }, letterSpacing: '-2px' }}>
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 10, color: '#666', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '2px' }}>
          NO EXCUSES. JUST TRAINING.
        </Typography>

        <Grid container spacing={2} alignItems="stretch">
          {tokenPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
              <Card sx={{ 
                bgcolor: '#0a0a0a', 
                borderRadius: '0px', // Full industrial look
                border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
                textAlign: 'left',
                transition: '0.2s',
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { bgcolor: '#111', borderColor: '#d32f2f' }
              }}>
                {pkg.featured && (
                  <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#d32f2f', color: '#fff', px: 2, py: 0.5, fontSize: '0.7rem', fontWeight: 900 }}>
                    MOST POPULAR
                  </Box>
                )}
                
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: '#d32f2f', letterSpacing: '2px', mb: 1 }}>
                    {pkg.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#ffffff' }}>
                      €{pkg.price}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#444', mb: 3, textTransform: 'uppercase' }}>
                    {pkg.tokens} {pkg.tokens === 1 ? 'SESSION' : 'SESSIONS'}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#888', mb: 4, minHeight: '60px', lineHeight: 1.5, fontWeight: 500 }}>
                    {pkg.description}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ bgcolor: '#222', mb: 3 }} />
                    <Button 
                      onClick={() => handlePurchase(pkg)}
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        borderRadius: '0', 
                        fontWeight: '900', 
                        py: 2, 
                        bgcolor: '#d32f2f', 
                        color: '#fff',
                        '&:hover': { bgcolor: '#ff1744' } 
                      }}
                    >
                      GET STARTED
                    </Button>
                    
                    <Typography variant="caption" sx={{ display: 'block', mt: 3, fontWeight: 900, color: '#333', fontSize: '0.65rem', textAlign: 'center' }}>
                      {pkg.expires}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tokens;