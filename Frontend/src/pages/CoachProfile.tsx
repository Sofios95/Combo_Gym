import { Box, Typography, Container, Paper, Stack } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box id="coach" sx={{ bgcolor: '#000', minHeight: '100vh', py: { xs: 8, md: 12 }, width: '100%' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 6 }}>
            <Typography variant="h2" sx={{ color: '#d32f2f', fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>ΑΛΕΞΑΝΔΡΟΣ</Typography>
            <Typography variant="h5" sx={{ color: '#666', fontStyle: 'italic', fontSize: '1.2rem' }}>"Η πυγμαχία είναι στρατηγική."</Typography>
        </Box>

        {/* Flexbox αντί για Grid */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Σταδιοδρομία */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 60%' } }}>
            <Paper sx={{ p: 4, bgcolor: '#0a0a0a', borderLeft: '4px solid #d32f2f', borderRadius: 0 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <HistoryIcon sx={{ color: '#d32f2f' }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>ΣΤΑΔΙΟΔΡΟΜΙΑ</Typography>
              </Stack>
              <Typography variant="h6" color="primary">2016 - COMBO GYM</Typography>
              <Typography variant="body1" sx={{ color: '#888' }}>Ίδρυση του δικού του χώρου στην Πεντέλης.</Typography>
            </Paper>
          </Box>

          {/* Διακρίσεις */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 40%' } }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 4, bgcolor: '#d32f2f', color: '#fff', borderRadius: 0 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <TrophyIcon />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
                </Stack>
                <Typography variant="body1">• Χρυσό Μετάλλιο (Πανελλήνιο 2018)</Typography>
              </Paper>
              <Paper sx={{ p: 4, bgcolor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 0 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 2 }}>ΦΙΛΟΣΟΦΙΑ</Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>Στο Combo Gym μαθαίνουμε να ξεπερνάμε τα όριά μας.</Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoachProfile;