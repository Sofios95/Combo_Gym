import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, Stack, CircularProgress } from '@mui/material';
import { CancelScheduleSend, EventBusy } from '@mui/icons-material'; 
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

interface Booking {
  slot_id: number;
  day: string;
  time: string;
}

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshTokens } = useAuth();

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      // Χτυπάμε το backend για να δούμε τι έχουμε κλείσει
      const res = await api.get('/bookings/my-bookings');
      setMyBookings(res.data);
    } catch (err) {
      console.error("Error fetching my bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancel = async (slotId: number) => {
    if (!window.confirm("🤔 Είσαι σίγουρος; Η ακύρωση θα σου επιστρέψει 1 token.")) return;

    try {
      // Κλήση στο DELETE endpoint που φτιάξαμε
      await api.delete(`/bookings/cancel/${slotId}`);
      
      // Αφαιρούμε το slot από το UI αμέσως
      setMyBookings(prev => prev.filter(b => b.slot_id !== slotId));
      
      // Ενημερώνουμε τα tokens στο Header/Navbar
      await refreshTokens();
      
      alert("✅ Η θέση ελευθερώθηκε και το token επιστράφηκε!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Αποτυχία ακύρωσης";
      alert(msg);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#0a0a0a' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="sm">
        {/* Title με το Icon που λέγαμε */}
        <Typography variant="h3" sx={{ 
          fontWeight: 900, 
          color: 'white', 
          mb: 1, 
          textAlign: 'center', 
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}>
          MY <span style={{ color: '#d32f2f' }}>SESSIONS</span> <EventBusy sx={{ fontSize: '2.5rem', color: '#d32f2f' }} />
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#666', mb: 6, textAlign: 'center' }}>
          Εδώ βλέπεις τις κρατήσεις σου. Μπορείς να ακυρώσεις και να πάρεις πίσω το token σου.
        </Typography>

        {myBookings.length === 0 ? (
          <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px dashed #333', textAlign: 'center' }}>
            <Typography sx={{ color: '#888' }}>Δεν έχεις προγραμματισμένα μαθήματα.</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {myBookings.map((booking) => (
              <Paper 
                key={booking.slot_id} 
                sx={{ 
                  p: 3, 
                  bgcolor: '#1a1a1a', 
                  border: '1px solid #333', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  transition: '0.3s',
                  '&:hover': { borderColor: '#d32f2f' }
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 900, textTransform: 'uppercase' }}>
                    {booking.day}
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                    {booking.time.substring(0, 5)}
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<CancelScheduleSend />}
                  onClick={() => handleCancel(booking.slot_id)}
                  sx={{ 
                    borderRadius: '8px', 
                    borderWidth: '2px',
                    fontWeight: 'bold',
                    '&:hover': { borderWidth: '2px', bgcolor: 'rgba(211, 47, 47, 0.1)' }
                  }}
                >
                  CANCEL
                </Button>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default MyBookings;