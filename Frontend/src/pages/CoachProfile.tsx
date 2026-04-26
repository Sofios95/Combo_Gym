import { Box, Typography, Container, Paper, Stack, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import HistoryIcon from '@mui/icons-material/History';
import VerifiedIcon from '@mui/icons-material/Verified';
import SportsIcon from '@mui/icons-material/Sports';

const CoachProfile = () => {
  const panhellenicTitles = [
    { pos: "3η", title: "Πρωτάθλημα Νότιας Ελλάδας 2015" },
    { pos: "1η", title: "Πανελλήνιο Πρωτάθλημα Γ' κατηγορία Ανδρών 2016" },
    { pos: "1η", title: "Πανελλήνιο Πρωτάθλημα Β' κατηγορία Ανδρών 2016" },
    { pos: "2η", title: "Πανελλήνιο Πρωτάθλημα Α' κατηγορίας Ανδρών 2016" },
    { pos: "3η", title: "Πανελλήνιο Πρωτάθλημα ΕΛΙΤ Ανδρών 2017" },
    { pos: "2η", title: "Πανελλήνιο Πρωτάθλημα ΕΛΙΤ Ανδρών 2019" },
    { pos: "3η", title: "Πανελλήνιο Πρωτάθλημα ΕΛΙΤ Ανδρών 2022" },
    { pos: "3η", title: "Πανελλήνιο Πρωτάθλημα ΕΛΙΤ Ανδρών 2024" },
  ];

  return (
    <Box id="coach" sx={{ bgcolor: '#000', py: { xs: 6, md: 10 }, width: '100%' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, textTransform: 'uppercase', mb: 1 }}>
            HEAD <span style={{ color: '#d32f2f' }}>COACH</span>
          </Typography>
          <Typography variant="h3" sx={{ color: '#d32f2f', fontWeight: 900, mb: 2 }}>ΑΛΕΞΑΝΔΡΟΣ</Typography>
          <Typography variant="body1" sx={{ color: '#666', textTransform: 'uppercase', fontWeight: 800, letterSpacing: 2 }}>
            16 Χρόνια Εμπειρία στην Πυγμαχία | Δίπλωμα Προπονητή Γ' Κατηγορίας
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          
          {/* Αριστερή Στήλη: Σταδιοδρομία & Εθνική */}
          <Box sx={{ flex: 1.2 }}>
            <Paper sx={{ p: 4, bgcolor: '#0a0a0a', borderLeft: '6px solid #d32f2f', borderRadius: 0, height: '100%' }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <HistoryIcon sx={{ color: '#d32f2f', fontSize: 35 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff' }}>ΕΜΠΕΙΡΙΑ</Typography>
              </Stack>
              
              <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 800, mb: 1 }}>COMBO GYM (ΙΔΡΥΣΗ 3/2016)</Typography>
              <Typography variant="body1" sx={{ color: '#ccc', mb: 4, fontSize: '1.1rem' }}>
                10 χρόνια επιτυχημένης λειτουργίας του δικού του χώρου. Πριν το Combo Gym, πολυετής προϋπηρεσία σε κορυφαία γυμναστήρια της Αθήνας.
              </Typography>

              <Divider sx={{ bgcolor: '#1a1a1a', my: 3 }} />

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VerifiedIcon sx={{ color: '#d32f2f' }} />
                  <Typography sx={{ color: '#fff', fontWeight: 700 }}>Μέλος ομάδας Ολυμπιακού</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VerifiedIcon sx={{ color: '#d32f2f' }} />
                  <Typography sx={{ color: '#fff', fontWeight: 700 }}>Πρώην μέλος Εθνικής Ομάδας</Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 5, p: 3, bgcolor: '#111', border: '1px dashed #d32f2f' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>ΔΙΑΚΡΙΣΗ ΜΕ ΤΗΝ ΕΘΝΙΚΗ</Typography>
                <Typography sx={{ color: '#d32f2f', fontWeight: 800 }}>2η θέση 5th Grand Prix Slovenske konjice 2019</Typography>
              </Box>
            </Paper>
          </Box>

          {/* Δεξιά Στήλη: Πανελλήνιες Διακρίσεις */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 4, bgcolor: '#d32f2f', color: '#fff', borderRadius: 0 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TrophyIcon sx={{ fontSize: 35 }} />
                <Typography variant="h4" sx={{ fontWeight: 900 }}>ΔΙΑΚΡΙΣΕΙΣ</Typography>
              </Stack>
              <List dense>
                {panhellenicTitles.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <ListItemIcon sx={{ minWidth: 45, color: '#fff', fontWeight: 900 }}>{item.pos}</ListItemIcon>
                    <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default CoachProfile;