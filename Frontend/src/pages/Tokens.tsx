import { useState } from 'react';
import { 
  Box, Container, Typography, 
  Button, Backdrop, CircularProgress, Paper 
} from '@mui/material';
import Swal from 'sweetalert2'; // Εισαγωγή του SweetAlert2
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

  // Custom Alert Function (το ορίζουμε εδώ μέσα για ευκολία)
  const showBoxAlert = (title: string, text: string, icon: 'success' | 'error') => {
    Swal.fire({
      title: `<span style="color: #fff; font-weight: 900; text-transform: uppercase;">${title}</span>`,
      html: `<span style="color: #888;">${text}</span>`,
      icon: icon,
      background: '#0a0a0a',
      confirmButtonText: 'OK / BACK TO WORK',
      iconColor: '#d32f2f',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
      },
      buttonsStyling: false,
    });
  };

  const handlePurchase = async (pkg: any) => {
    // Custom Confirm Alert αντί για window.confirm
    const result = await Swal.fire({
      title: `<span style="color: #fff; font-weight: 900;">CONFIRM PURCHASE</span>`,
      html: `<span style="color: #888;">Θέλεις το <b>${pkg.title}</b> για <b>${pkg.price}€</b>;</span>`,
      icon: 'question',
      iconColor: '#d32f2f',
      showCancelButton: true,
      confirmButtonText: 'PURCHASE',
      cancelButtonText: 'CANCEL',
      background: '#0a0a0a',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
        cancelButton: 'box-cancel-button',
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      setIsProcessing(true);
      
      // Fake delay για αίσθηση τράπεζας
      await new Promise(resolve => setTimeout(resolve, 1500));

      const res = await api.post('/tokens/purchase', { 
        amount: pkg.tokens, 
        packageTitle: pkg.title 
      });

      await refreshTokens();
      
      // Επιτυχία!
      showBoxAlert("SUCCESS", res.data.message || "Τα tokens προστέθηκαν!", "success");

    } catch (err: any) {
      // Σφάλμα!
      showBoxAlert("FAILURE", err.response?.data?.message || "Η συναλλαγή απέτυχε.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000', pt: { xs: 8, md: 12 }, pb: 10, width: '100%', overflow: 'hidden' }}>
      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'rgba(0,0,0,0.9)' }} 
        open={isProcessing}
      >
        <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="error" size={60} thickness={5} />
            <Typography sx={{ mt: 2, fontWeight: 900, letterSpacing: 2 }}>AUTHORIZING...</Typography>
        </Box>
      </Backdrop>

      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, mb: 6, color: '#fff', fontSize: { xs: '2.2rem', md: '4rem' } }}>
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
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)', borderColor: '#d32f2f' }
              }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                  {pkg.title}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>€{pkg.price}</Typography>
                <Typography variant="h6" sx={{ color: '#444', mb: 2, fontWeight: 800 }}>{pkg.tokens} SESSIONS</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 4, flexGrow: 1 }}>{pkg.description}</Typography>
                
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    onClick={() => handlePurchase(pkg)}
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#d32f2f', fontWeight: 900, py: 1.5, borderRadius: 0, '&:hover': { bgcolor: '#ff1744' } }}
                  >
                    GET STARTED
                  </Button>
                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#333', textAlign: 'center' }}>
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