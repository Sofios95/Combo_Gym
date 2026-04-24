import { Box, Typography, Container, Paper, Stack } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box id="coach" sx={{ bgcolor: '#000', minHeight: '100vh', py: { xs: 8, md: 12 }, width: '100%', overflowX: 'hidden' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 6 }}>
            <Typography variant="h2" color="primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                ΑΛΕΞΑΝΔΡΟΣ
            </Typography>
            <Typography variant="h5" sx={{ color: '#666', fontStyle: 'italic', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                "Η πυγμαχία δεν είναι μόνο δύναμη, είναι στρατηγική και πειθαρχία."
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Σταδιοδρομία */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 60%' } }}>
            <Paper sx={{ p: 4, bgcolor: '#0a0a0a', borderLeft: '4px solid #d32f2f', height: '100%', borderRadius: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <HistoryIcon color="primary" />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>ΣΤΑΔΙΟΔΡΟΜΙΑ</Typography>
              </Stack>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>2010 - ΑΠΑΡΧΗ</Typography>
                  <Typography variant="body1" sx={{ color: '#888' }}>Ξεκίνησε τα πρώτα βήματα στο ρινγκ...</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>2016 - COMBO GYM</Typography>
                  <Typography variant="body1" sx={{ color: '#888' }}>Ίδρυση του δικού του χώρου στην Πεντέλης...</Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Διακρίσεις & Φιλοσοφία */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 40%' } }}>
            <Stack spacing={3}>
                <Paper sx={{ p: 4, bgcolor: '#d32f2f', color: '#fff', borderRadius: 0 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <TrophyIcon />
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
                  </Stack>
                  <Typography variant="body1">• Χρυσό Μετάλλιο (Πανελλήνιο 2018)</Typography>
                  <Typography variant="body1">• 100+ Αγώνες Εμπειρία</Typography>
                </Paper>

                <Paper sx={{ p: 4, bgcolor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 0 }}>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 2 }}>ΦΙΛΟΣΟΦΙΑ</Typography>
                  <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.8 }}>
                    Στο Combo Gym δεν μαθαίνουμε απλά να χτυπάμε. Μαθαίνουμε να στεκόμαστε όρθιοι...
                  </Typography>
                </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoachProfile;