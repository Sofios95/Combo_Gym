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
    // Επιβεβαίωση πριν την "πληρωμή"
    const confirmBox = window.confirm(`Επιβεβαίωση αγοράς: ${pkg.title} (${pkg.price}€)`);
    if (!confirmBox) return;

    try {
      setIsProcessing(true);

      // --- FAKE PAYMENT EMULATION ---
      // Προσομοίωση αναμονής τράπεζας (1.5 δευτερόλεπτο)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Κλήση στο backend - στέλνουμε tokens και title
      const res = await api.post('/tokens/purchase', { 
        amount: pkg.tokens, 
        packageTitle: pkg.title 
      });

      // Ανανέωση των tokens στο global state (AuthContext)
      await refreshTokens();
      
      alert(res.data.message || "🎯 Η αγορά ολοκληρώθηκε με επιτυχία!");
    } catch (err: any) {
      console.error("Purchase error:", err);
      alert(err.response?.data?.message || "⚠️ Η συναλλαγή απέτυχε. Δοκιμάστε ξανά.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000', pt: { xs: 8, md: 12 }, pb: 10, width: '100%', overflow: 'hidden' }}>
      <Backdrop 
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'rgba(0,0,0,0.85)',
          flexDirection: 'column',
          gap: 2
        }} 
        open={isProcessing}
      >
        <CircularProgress color="error" thickness={5} />
        <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}>
          Processing Payment...
        </Typography>
      </Backdrop>

      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 6, color: '#fff', fontSize: { xs: '2.2rem', md: '4rem' }, textTransform: 'uppercase' }}>
          COMBO <span style={{ color: '#d32f2f' }}>PLANS</span>
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexFlow: 'row wrap', 
          justifyContent: 'center',
          gap: 3,
          width: '100%'
        }}>
          {tokenPackages.map((pkg, index) => (
            <Box key={index} sx={{ 
              width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' },
              display: 'flex' 
            }}>
              <Paper sx={{ 
                p: 4, 
                bgcolor: '#0a0a0a', 
                border: pkg.featured ? '2px solid #d32f2f' : '1px solid #1a1a1a', 
                borderRadius: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-10px)',
                  borderColor: '#d32f2f',
                  boxShadow: '0 10px 30px rgba(211, 47, 47, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {pkg.title}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>€{pkg.price}</Typography>
                <Typography variant="h6" sx={{ color: '#444', mb: 2, fontWeight: 800 }}>{pkg.tokens} SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 4, flexGrow: 1, lineHeight: 1.6 }}>{pkg.description}</Typography>
                
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    onClick={() => handlePurchase(pkg)}
                    variant="contained"
                    fullWidth
                    disabled={isProcessing}
                    sx={{ 
                      bgcolor: '#d32f2f', 
                      fontWeight: 900, 
                      py: 1.8, 
                      borderRadius: 0,
                      '&:hover': { bgcolor: '#ff1744' }
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