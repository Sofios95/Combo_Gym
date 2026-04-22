import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
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
      alert("❌ Δεν έχεις αρκετά tokens! Αγόρασε πακέτο για να συνεχίσεις.");
      return;
    }

    try {
      setProcessingId(slotId);
      const response = await api.post(`/bookings/reserve/${slotId}`);
      alert(response.data.message || "🎯 Η κράτηση ολοκληρώθηκε!");
      await fetchData();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "⚠️ Η κράτηση απέτυχε. Δοκιμάστε ξανά.";
      alert(errorMsg);
    } finally {
      setProcessingId(null);
    }
  };

  if (authLoading || fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#000' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 6, 
          gap: 3 
        }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'white', fontSize: { xs: '2rem', md: '3.5rem' }, letterSpacing: '-1px' }}>
              RESERVE <span style={{ color: '#d32f2f' }}>YOUR SLOT</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#777', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
              Το πρόγραμμα ανανεώνεται κάθε Κυριακή στις 12:00.
            </Typography>
          </Box>
          
          <Paper sx={{ 
            p: 3, 
            bgcolor: '#111', 
            border: '2px solid #d32f2f', 
            borderRadius: '0px', 
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(211, 47, 47, 0.2)'
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#aaa', textTransform: 'uppercase', mb: 1 }}>
              Available Tokens
            </Typography>
            <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 900 }}>
              {userTokens}
            </Typography>
          </Paper>
        </Box>

        <Grid container spacing={2}>
          {days.map((day) => (
            <Grid key={day} size={{ xs: 12, md: 2.4 }}>
              <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 900, color: '#d32f2f', textTransform: 'uppercase', letterSpacing: 1 }}>
                {day}
              </Typography>
              
              {slots.filter(s => s.day === day).map((slot) => {
                const isFull = slot.current_capacity <= 0;
                const isProcessing = processingId === slot.id;

                return (
                  <Paper 
                    key={slot.id}
                    sx={{ 
                      p: 2.5, 
                      mb: 2, 
                      bgcolor: isFull ? '#050505' : '#111',
                      border: isFull ? '1px solid #222' : '1px solid #1a1a1a',
                      textAlign: 'center',
                      borderRadius: '0px',
                      transition: 'all 0.2s ease-in-out',
                      // ΔΙΟΡΘΩΣΗ: Ternary για αποφυγή boolean error στο TS
                      '&:hover': (!isFull && !isProcessing) ? { 
                        borderColor: '#d32f2f', 
                        bgcolor: '#161616'
                      } : {}
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', mb: 0.5 }}>
                      {slot.time.substring(0, 5)}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2, color: isFull ? '#444' : '#00e676', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                      {isFull ? "NO SLOTS LEFT" : `${slot.current_capacity} SPOTS AVAILABLE`}
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      disabled={isFull || (userTokens !== undefined && userTokens <= 0) || isProcessing}
                      onClick={() => handleBooking(slot.id)}
                      fullWidth
                      sx={{ 
                        borderRadius: '0', 
                        fontWeight: 900,
                        py: 1.2,
                        bgcolor: isFull ? '#222' : '#d32f2f',
                        color: '#fff',
                        '&:hover': { bgcolor: '#ff1744' },
                        '&.Mui-disabled': { bgcolor: '#1a1a1a', color: '#444' }
                      }}
                    >
                      {isProcessing ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : isFull ? (
                        "FULL"
                      ) : (
                        "BOOK NOW"
                      )}
                    </Button>
                  </Paper>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Booking;