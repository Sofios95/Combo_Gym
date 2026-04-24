import { useState } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, 
  Button, Divider, Backdrop, CircularProgress, Paper 
} from '@mui/material';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const tokenPackages = [
  {
    title: 'DROP IN',
    tokens: 1,
    price: 20,
    description: 'Για μια γρήγορη δόση αδρεναλίνης. Μπες, δώσε τα πάντα στο σάκο και φύγε γεμάτος.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
  },
  {
    title: 'NEW MEMBER TRIAL',
    tokens: 2,
    price: 20,
    description: 'Η πρώτη σου επαφή με το ρινγκ. Δύο sessions για να καταλάβεις τι σημαίνει Combo Gym.',
    expires: 'ΛΗΞΗ: 7 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
  },
  {
    title: '4 SESSIONS PACK',
    tokens: 4,
    price: 60,
    description: 'Βελτίωσε την τεχνική σου και χτίσε αντοχή. Ιδανικό για να συνδυάσεις Boxing και Conditioning.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
  },
  {
    title: '8 SESSIONS PACK',
    tokens: 8,
    price: 100,
    description: 'Το πακέτο των αφοσιωμένων. Για σένα που το boxing έγινε τρόπος ζωής και δεν συμβιβάζεσαι.',
    expires: 'ΛΗΞΗ: 30 ΗΜΕΡΕΣ ΜΕΤΑ ΤΗΝ ΑΓΟΡΑ',
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
    <Box sx={{ 
      bgcolor: '#000000', 
      minHeight: '100vh', 
      pt: { xs: 10, md: 15 }, 
      pb: 10,
      width: '100%',
      overflow: 'hidden' // Κλειδώνει τα πάντα μέσα
    }}>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)' }}
        open={isProcessing}
      >
        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 4, py: 2, bgcolor: '#1a1a1a', border: '2px solid #d32f2f' }}>
          <CircularProgress color="error" size={30} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff' }}>ΕΠΕΞΕΡΓΑΣΙΑ...</Typography>
        </Paper>
      </Backdrop>

      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            fontWeight: 900, 
            mb: 1, 
            color: '#ffffff', 
            fontSize: { xs: '2.5rem', md: '4rem' },
            textTransform: 'uppercase'
          }}
        >
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ mb: 8, color: '#666', fontWeight: 800, fontSize: { xs: '0.9rem', md: '1.2rem' } }}
        >
          NO EXCUSES. JUST TRAINING.
        </Typography>

        {/* --- ΕΔΩ ΕΙΝΑΙ ΤΟ FIX: Χρήση Flexbox με wrap --- */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          justifyContent: 'center',
          width: '100%'
        }}>
          {tokenPackages.map((pkg, index) => (
            <Card key={index} sx={{ 
              bgcolor: '#0a0a0a', 
              borderRadius: '0px', 
              border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a',
              width: { 
                xs: '100%',     // 1 κάρτα στο κινητό (γεμάτο πλάτος)
                sm: '45%',      // 2 κάρτες σε tablet
                md: '22%'       // 4 κάρτες σε desktop
              },
              minWidth: { xs: 'auto', md: '250px' },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transition: '0.3s',
              '&:hover': { bgcolor: '#111', borderColor: '#d32f2f' }
            }}>
              {pkg.featured && (
                <Box sx={{ 
                  position: 'absolute', top: 0, right: 0, bgcolor: '#d32f2f', 
                  color: '#fff', px: 2, py: 0.5, fontSize: '0.7rem', fontWeight: 900, zIndex: 10
                }}>
                  MOST POPULAR
                </Box>
              )}
              
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: '#d32f2f', letterSpacing: '2px', mb: 1 }}>
                  {pkg.title}
                </Typography>
                
                <Typography variant="h2" sx={{ fontWeight: 900, color: '#ffffff', mb: 1, fontSize: '3rem' }}>
                  €{pkg.price}
                </Typography>
                
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#444', mb: 3, textTransform: 'uppercase' }}>
                  {pkg.tokens} {pkg.tokens === 1 ? 'SESSION' : 'SESSIONS'}
                </Typography>

                <Typography variant="body2" sx={{ color: '#888', mb: 4, minHeight: '60px', lineHeight: 1.5 }}>
                  {pkg.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Divider sx={{ bgcolor: '#222', mb: 3 }} />
                  <Button 
                    onClick={() => handlePurchase(pkg)}
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                      borderRadius: '0', fontWeight: '900', py: 2, 
                      bgcolor: '#d32f2f', '&:hover': { bgcolor: '#ff1744' } 
                    }}
                  >
                    GET STARTED
                  </Button>
                  
                  <Typography variant="caption" sx={{ display: 'block', mt: 3, color: '#333', textAlign: 'center', fontWeight: 700 }}>
                    {pkg.expires}
                  </Typography>
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