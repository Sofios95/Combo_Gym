import { Box, Typography, Container, Paper } from '@mui/material'; 
import { Grid2 as Grid } from '@mui/material'; // Χρησιμοποιούμε το Grid2 αν έχεις νεότερη έκδοση MUI, αλλιώς Grid
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box id="coach" sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        
        {/* Header Section */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
                variant="h2" 
                color="primary" 
                sx={{ 
                    fontWeight: 900, 
                    mb: 1, 
                    textTransform: 'uppercase',
                    fontSize: { xs: '2.5rem', md: '3.75rem' } // Μείωση στο κινητό
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
                    fontSize: { xs: '1.1rem', md: '1.5rem' },
                    px: { xs: 2, md: 0 }
                }}
            >
                "Η πυγμαχία δεν είναι μόνο δύναμη, είναι στρατηγική και πειθαρχία."
            </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Αριστερή Στήλη: Σταδιοδρομία */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <HistoryIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    ΣΤΑΔΙΟΔΡΟΜΙΑ
                </Typography>
              </Box>
              
              <Box sx={{ borderLeft: '2px solid #D32F2F', pl: 3, py: 1, textAlign: 'left' }}>
                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem' }}>2010 - ΑΠΑΡΧΗ</Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '0.9rem' }}>Ξεκίνησε τα πρώτα βήματα στο ρινγκ, εστιάζοντας στην κλασική πυγμαχία.</Typography>

                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem' }}>2015 - ΠΡΩΤΑΘΛΗΤΙΣΜΟΣ</Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '0.9rem' }}>Συμμετοχή σε εθνικά πρωταθλήματα και διεθνείς διοργανώσεις.</Typography>

                <Typography variant="h6" color="primary" sx={{ fontSize: '1rem' }}>2016 - COMBO GYM</Typography>
                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>Ίδρυση του δικού του χώρου στην Πεντέλης, μεταδίδοντας την εμπειρία του σε νέους αθλητές.</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Δεξιά Στήλη: Διακρίσεις & Φιλοσοφία */}
          <Grid size={{ xs: 12, md: 5 }}>
            {/* Κάρτα Διακρίσεων */}
            <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'primary.main', color: 'white', borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <TrophyIcon sx={{ mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
              </Box>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>• Χρυσό Μετάλλιο (Πανελλήνιο 2018)</Typography>
                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>• Πιστοποιημένος Προπονητής AIBA</Typography>
                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>• 100+ Αγώνες Εμπειρία</Typography>
              </Box>
            </Paper>

            {/* Κάρτα Φιλοσοφίας */}
            <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper', borderRadius: 2 }}>
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
              <Typography variant="body2" sx={{ lineHeight: 1.8, textAlign: { xs: 'center', md: 'left' }, fontSize: '0.85rem' }}>
                Στο Combo Gym δεν μαθαίνουμε απλά να χτυπάμε. Μαθαίνουμε να στεκόμαστε όρθιοι, να σεβόμαστε τον αντίπαλο και να ξεπερνάμε τα όριά μας κάθε μέρα.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default CoachProfile;