import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';

const CoachProfile = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        
        {/* Header Section */}
        <Typography variant="h2" color="primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
          ΑΛΕΞΑΝΔΡΟΣ
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6, fontStyle: 'italic' }}>
          "Η πυγμαχία δεν είναι μόνο δύναμη, είναι στρατηγική και πειθαρχία."
        </Typography>

        <Grid container spacing={4}>
          {/* Αριστερή Στήλη: Σταδιοδρομία (Timeline) */}
          {/* Χρησιμοποιούμε τα κλασικά props xs, md που είναι safe για κάθε έκδοση */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <HistoryIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>ΣΤΑΔΙΟΔΡΟΜΙΑ</Typography>
              </Box>
              
              <Box sx={{ borderLeft: '2px solid #D32F2F', pl: 3, py: 1 }}>
                <Typography variant="h6" color="primary">2010 - ΑΠΑΡΧΗ</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>Ξεκίνησε τα πρώτα βήματα στο ρινγκ, εστιάζοντας στην κλασική πυγμαχία.</Typography>

                <Typography variant="h6" color="primary">2015 - ΠΡΩΤΑΘΛΗΤΙΣΜΟΣ</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>Συμμετοχή σε εθνικά πρωταθλήματα και διεθνείς διοργανώσεις.</Typography>

                <Typography variant="h6" color="primary">2016 - COMBO GYM</Typography>
                <Typography variant="body1">Ίδρυση του δικού του χώρου στην Πεντέλης, μεταδίδοντας την εμπειρία του σε νέους αθλητές.</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Δεξιά Στήλη: Διακρίσεις & Φιλοσοφία */}
          <Grid item xs={12} md={5}>
            {/* Κάρτα Διακρίσεων */}
            <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrophyIcon sx={{ mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
              </Box>
              <Typography variant="body1">• Χρυσό Μετάλλιο (Πανελλήνιο 2018)</Typography>
              <Typography variant="body1">• Πιστοποιημένος Προπονητής AIBA</Typography>
              <Typography variant="body1">• 100+ Αγώνες Εμπειρία</Typography>
            </Paper>

            {/* Κάρτα Φιλοσοφίας */}
            <Paper sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>ΦΙΛΟΣΟΦΙΑ</Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
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