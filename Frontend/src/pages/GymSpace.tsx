import { Box, Container, Typography } from '@mui/material';
import Gallery from '../components/Gallery'; // Παίρνουμε το Gallery που ήδη έχεις

const GymSpace = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: 'primary.main' }}>
          Ο ΧΩΡΟΣ ΜΑΣ
        </Typography>
        
        {/* Εδώ εμφανίζουμε το Gallery που έφτιαξες πριν */}
        <Gallery />
        
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: '#aaa' }}>
          Πλήρως εξοπλισμένος χώρος πυγμαχίας στην καρδιά της Δάφνης.
        </Typography>
      </Container>
    </Box>
  );
};

export default GymSpace;