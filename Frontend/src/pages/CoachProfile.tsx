import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box 
      id="coach" 
      sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh', 
        py: { xs: 6, md: 10 },
        width: '100%',
        overflow: 'hidden' // Αποφυγή οριζόντιου scroll
      }}
    >
      <Container maxWidth="md">
        
        {/* Header Section */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 4 } }}>
            <Typography 
                variant="h2" 
                color="primary" 
                sx={{ 
                    fontWeight: 900, 
                    mb: 1, 
                    textTransform: 'uppercase',
                    fontSize: { xs: '2.5rem', md: '3.75rem' } 
                }}
            >
                ΑΛΕΞΑΝΔΡΟΣ
            </Typography>
            <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ 
                    mb: { xs: 4, md: 6 }, 
                    fontStyle: 'italic',
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    px: { xs: 2, md: 0 },
                    lineHeight: 1.4
                }}
            >
                "Η πυγμαχία δεν είναι μόνο δύναμη, είναι στρατηγική και πειθαρχία."
            </Typography>
        </Box>

        {/* Grid Container - Χρήση size για MUI v6 */}
        <Grid container spacing={4}>
          {/* Αριστερή Στήλη: Σταδιοδρομία */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <HistoryIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    ΣΤΑΔΙΟΔΡΟΜΙΑ
                </Typography>
              </Box>
              
              <Box sx={{ borderLeft: '2px solid #D32F2F', pl: { xs: 2, md: 3 }, py: 1, textAlign: 'left' }}>
                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem', fontWeight: 800 }}>2010 - ΑΠΑΡΧΗ</Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '0.9rem', color: '#ccc' }}>
                  Ξεκίνησε τα πρώτα βήματα στο ρινγκ, εστιάζοντας στην κλασική πυγμαχία.
                </Typography>

                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem', fontWeight: 800 }}>2015 - ΠΡΩΤΑΘΛΗΤΙΣΜΟΣ</Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '0.9rem', color: '#ccc' }}>
                  Συμμετοχή σε εθνικά πρωταθλήματα και διεθνείς διοργανώσεις.
                </Typography>

                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem', fontWeight: 800 }}>2016 - COMBO GYM</Typography>
                <Typography variant="body1" sx={{ fontSize: '0.9rem', color: '#ccc' }}>
                  Ίδρυση του δικού του χώρου στην Πεντέλης, μεταδίδοντας την εμπειρία του σε νέους αθλητές.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Δεξιά Στήλη: Διακρίσεις & Φιλοσοφία */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
                {/* Κάρτα Διακρίσεων */}
                <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <TrophyIcon sx={{ mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
                  </Box>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="body1" sx={{ fontSize: '0.95rem', mb: 0.5, fontWeight: 500 }}>• Χρυσό Μετάλλιο (Πανελλήνιο 2018)</Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.95rem', mb: 0.5, fontWeight: 500 }}>• Πιστοποιημένος Προπονητής AIBA</Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>• 100+ Αγώνες Εμπειρία</Typography>
                  </Box>
                </Paper>

                {/* Κάρτα Φιλοσοφίας */}
                <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: 800, 
                        mb: 2, 
                        color: 'primary.main', 
                        textAlign: { xs: 'center', md: 'left' },
                        fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                  >
                    ΦΙΛΟΣΟΦΙΑ
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.8, textAlign: { xs: 'center', md: 'left' }, fontSize: '0.9rem', color: '#ccc' }}>
                    Στο Combo Gym δεν μαθαίνουμε απλά να χτυπάμε. Μαθαίνουμε να στεκόμαστε όρθιοι, να σεβόμαστε τον αντίπαλο και να ξεπερνάμε τα όριά μας κάθε μέρα.
                  </Typography>
                </Paper>
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

// Προσθήκη Stack για ευκολότερη διαχείριση των δεξιών καρτών
import { Stack } from '@mui/material';

export default CoachProfile;