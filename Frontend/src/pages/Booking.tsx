import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Paper, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'; // 🔥 Εισαγωγή SweetAlert2
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

interface Slot {
  id: number;
  day: string;
  time: string;
  current_capacity: number;
}

const days = ["ΔΕΥΤΕΡΑ", "ΤΡΙΤΗ", "ΤΕΤΑΡΤΗ", "ΠΕΜΠΤΗ", "ΠΑΡΑΣΚΕΥΗ"];

const Booking = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [fetching, setFetching] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  
  const { tokens: userTokens, refreshTokens, loading: authLoading } = useAuth();

  // Helper για τα Alerts
  const showBoxAlert = (title: string, text: string, icon: 'success' | 'error') => {
    Swal.fire({
      title: `<span style="color: #fff; font-weight: 900; text-transform: uppercase;">${title}</span>`,
      html: `<span style="color: #888;">${text}</span>`,
      icon: icon,
      background: '#0a0a0a',
      confirmButtonText: 'UNDERSTOOD',
      iconColor: '#d32f2f',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
      },
      buttonsStyling: false,
    });
  };

  const fetchData = useCallback(async () => {
    try {
      setFetching(true);
      const slotsRes = await api.get('/slots');
      setSlots(slotsRes.data);
      await refreshTokens();
    } catch (err) {
      console.error("Error fetching slots:", err);
    } finally {
      setFetching(false);
    }
  }, [refreshTokens]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBooking = async (slotId: number) => {
    if (processingId) return;

    if (userTokens !== undefined && userTokens <= 0) {
      showBoxAlert("NO AMMO", "Δεν έχεις αρκετά tokens! Πέρνα από το κατάστημα.", "error");
      return;
    }

    try {
      setProcessingId(slotId);
      const response = await api.post(`/bookings/reserve/${slotId}`);
      
      showBoxAlert("TARGET LOCKED", response.data.message || "Η κράτηση ολοκληρώθηκε!", "success");
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Η κράτηση απέτυχε.";
      showBoxAlert("MISSION FAILED", errorMsg, "error");
      await fetchData();
    } finally {
      setProcessingId(null);
    }
  };

  if (authLoading || fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#000' }}>
        <CircularProgress color="error" thickness={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 6, gap: 3 }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'white', fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 1 }}>
              RESERVE <span style={{ color: '#d32f2f' }}>YOUR SLOT</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', textTransform: 'uppercase', fontWeight: 900, mt: 1, letterSpacing: 1 }}>
              Το πρόγραμμα ανανεώνεται κάθε Κυριακή στις 12:00.
            </Typography>
          </Box>
          <Paper elevation={0} sx={{ p: 3, bgcolor: '#000', border: '2px solid #d32f2f', borderRadius: '0px', textAlign: 'center', minWidth: '180px' }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: '#d32f2f', textTransform: 'uppercase', letterSpacing: 2 }}>Tokens Left</Typography>
            <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 900 }}>{userTokens}</Typography>
          </Paper>
        </Box>

        {/* Schedule Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: 'repeat(5, 1fr)' 
          }, 
          gap: 2 
        }}>
          {days.map((day) => {
            const daySlots = slots.filter(s => s.day.toUpperCase() === day);
            return (
              <Box key={day}>
                <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 900, color: '#d32f2f', textTransform: 'uppercase', borderBottom: '2px solid #1a1a1a', pb: 1 }}>
                  {day}
                </Typography>
                {daySlots.length > 0 ? (
                  daySlots.map((slot) => {
                    const isFull = slot.current_capacity <= 0;
                    const isProcessing = processingId === slot.id;
                    return (
                      <Paper 
                        key={slot.id} 
                        elevation={0}
                        sx={{ 
                          p: 2.5, 
                          mb: 2, 
                          bgcolor: isFull ? '#050505' : '#111', 
                          border: '1px solid #1a1a1a', 
                          textAlign: 'center', 
                          borderRadius: '0px',
                          transition: '0.2s',
                          '&:hover': { borderColor: isFull ? '#1a1a1a' : '#d32f2f' }
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 900, color: 'white' }}>{slot.time.substring(0, 5)}</Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: isFull ? '#333' : '#00e676', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                          {isFull ? "OUT OF SPACE" : `${slot.current_capacity} SPOTS LEFT`}
                        </Typography>
                        <Button 
                          variant="contained" 
                          disabled={isFull || (userTokens !== undefined && userTokens <= 0) || isProcessing}
                          onClick={() => handleBooking(slot.id)}
                          fullWidth
                          sx={{ 
                            borderRadius: '0', 
                            fontWeight: 900, 
                            bgcolor: isFull ? '#1a1a1a' : '#d32f2f', 
                            '&:hover': { bgcolor: '#ff1744' },
                            '&.Mui-disabled': { bgcolor: '#0a0a0a', color: '#333' }
                          }}
                        >
                          {isProcessing ? <CircularProgress size={20} color="inherit" /> : isFull ? "FULL" : "BOOK"}
                        </Button>
                      </Paper>
                    );
                  })
                ) : (
                  <Typography variant="body2" align="center" sx={{ color: '#222', fontWeight: 900, textTransform: 'uppercase' }}>REST DAY</Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Booking;