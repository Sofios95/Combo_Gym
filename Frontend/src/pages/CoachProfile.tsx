import { Box, Typography, Container, Paper, Stack } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box id="coach" sx={{ bgcolor: '#000', py: { xs: 6, md: 10 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ color: '#d32f2f', fontWeight: 900, fontSize: { xs: '2.2rem', md: '3.75rem' }, textTransform: 'uppercase' }}>
            ΑΛΕΞΑΝΔΡΟΣ
          </Typography>
          <Typography variant="h5" sx={{ color: '#666', fontStyle: 'italic', fontSize: '1.1rem' }}>
            "Η πυγμαχία είναι στρατηγική."
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3,
          width: '100%' 
        }}>
          {/* Σταδιοδρομία */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 60%' }, width: '100%' }}>
            <Paper sx={{ p: 4, bgcolor: '#0a0a0a', borderLeft: '4px solid #d32f2f', borderRadius: 0 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} justifyContent={{xs: 'center', md: 'flex-start'}}>
                <HistoryIcon sx={{ color: '#d32f2f' }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', fontSize: '1.6rem' }}>ΣΤΑΔΙΟΔΡΟΜΙΑ</Typography>
              </Stack>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>2016 - COMBO GYM</Typography>
              <Typography variant="body1" sx={{ color: '#888' }}>Ίδρυση του δικού του χώρου στην Πεντέλης.</Typography>
            </Paper>
          </Box>

          {/* Διακρίσεις & Φιλοσοφία */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 40%' }, width: '100%' }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 4, bgcolor: '#d32f2f', color: '#fff', borderRadius: 0 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} justifyContent={{xs: 'center', md: 'flex-start'}}>
                  <TrophyIcon />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
                </Stack>
                <Typography variant="body1">• Χρυσό Μετάλλιο (2018)</Typography>
              </Paper>
              <Paper sx={{ p: 4, bgcolor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 0 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 1 }}>ΦΙΛΟΣΟΦΙΑ</Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>Μαθαίνουμε να ξεπερνάμε τα όριά μας.</Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoachProfile;