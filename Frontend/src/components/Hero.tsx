import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const levels = [
  {
    title: 'ΑΠΛΟ ΕΠΙΠΕΔΟ',
    description: 'Θέση μάχης, τεχνικές, αυτοάμυνα',
  },
  {
    title: 'ΠΡΟΧΩΡΗΜΕΝΟ',
    description: 'Τεχνικές επαφής, στόχοι, προετοιμασία για sparring',
  },
  {
    title: 'ΑΓΩΝΙΣΤΙΚΟ',
    description: 'Κατάσταση και συνθήκες αγώνα',
  },
  {
    title: 'GROUP ΜΑΘΗΜΑΤΑ',
    description: 'Μυϊκή ενδυνάμωση, φυσική κατάσταση, αερόβια & αναερόβια γυμναστική',
  },
];

const Hero = () => {
  return (
    <Box sx={{
      minHeight: { xs: '80vh', md: '95vh' }, 
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/alex-img3.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgcolor: '#000',
      borderBottom: '4px solid #d32f2f'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Αριστερά: Κύριο κείμενο */}
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mx: { xs: 'auto', md: 0 } }}>
              <Typography variant="overline" sx={{ color: '#d32f2f', fontWeight: 900, letterSpacing: 4 }}>
                EST. MARCH 2016
              </Typography>
              <Typography variant="h1" sx={{ color: 'white', mb: 2, fontSize: { xs: '3rem', md: '5.5rem' }, lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase' }}>
                COMBO <span style={{ color: '#d32f2f' }}>GYM</span>
              </Typography>
              <Typography variant="h5" sx={{ color: '#eee', mb: 3, fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.6rem' }, textTransform: 'uppercase' }}>
                Προπονηση σε ολα τα επιπεδα & καθε στοχο.
              </Typography>
              <Typography variant="body1" sx={{ color: '#888', mb: 2, fontSize: { xs: '0.95rem', md: '1.05rem' }, maxWidth: '600px', lineHeight: 1.7 }}>
                Με <strong style={{ color: '#ccc' }}>16 χρόνια εμπειρίας</strong> στην πυγμαχία και προϋπηρεσία σε κορυφαία γυμναστήρια, ο Αλέξανδρος ίδρυσε τον δικό του χώρο τον Μάρτιο του 2016.
              </Typography>
              <Typography variant="body1" sx={{ color: '#888', mb: 4, fontSize: { xs: '0.95rem', md: '1.05rem' }, maxWidth: '600px', lineHeight: 1.7 }}>
                Κάθε πρόγραμμα <strong style={{ color: '#ccc' }}>συμμορφώνεται με τις ανάγκες του κάθε αθλητή</strong> — ανεξαρτήτως επιπέδου, ηλικίας, φυσικής κατάστασης ή τυχόν τραυματισμών.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  component={RouterLink} 
                  to="/book"
                  variant="contained" 
                  size="large"
                  sx={{ py: 2, px: 6, fontSize: '1.1rem', borderRadius: 0, fontWeight: 900, bgcolor: '#d32f2f', textTransform: 'uppercase', '&:hover': { bgcolor: '#ff1744' } }}
                >
                  ΚΛΕΙΣΕ ΘΕΣΗ
                </Button>
                <Button 
                  component={RouterLink}
                  to="/tokens"
                  variant="outlined"
                  size="large"
                  sx={{ py: 2, px: 4, fontSize: '1.1rem', borderRadius: 0, fontWeight: 900, color: 'white', borderColor: '#444', textTransform: 'uppercase', '&:hover': { borderColor: '#d32f2f', color: '#d32f2f', bgcolor: 'transparent' } }}
                >
                  ΤΙΜΕΣ
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Δεξιά: Info cards με τα επίπεδα */}
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {levels.map((level, index) => (
                <Paper key={index} sx={{ 
                  p: 2.5, 
                  bgcolor: 'rgba(10,10,10,0.85)', 
                  borderLeft: '4px solid #d32f2f', 
                  borderRadius: 0,
                  transition: '0.2s',
                  '&:hover': { bgcolor: 'rgba(25,25,25,0.95)', borderLeftWidth: '6px' }
                }}>
                  <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900, letterSpacing: 2, display: 'block', mb: 0.5 }}>
                    {level.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777', lineHeight: 1.5 }}>
                    {level.description}
                  </Typography>
                </Paper>
              ))}

              {/* Sessions info */}
              <Paper sx={{ p: 2.5, bgcolor: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.3)', borderRadius: 0, mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 900, letterSpacing: 2, display: 'block', mb: 0.5 }}>
                  ΤΥΠΟΙ ΜΑΘΗΜΑΤΩΝ
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  Ατομικά &nbsp;•&nbsp; Ομαδικά &nbsp;•&nbsp; Έως 4 άτομα
                </Typography>
              </Paper>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;