import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Paper, Button, Stack, CircularProgress } from '@mui/material';
import { CancelScheduleSend, EventBusy, LockClock } from '@mui/icons-material'; 
import Swal from 'sweetalert2'; // 🔥 Εισαγωγή SweetAlert2
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

interface Booking {
  slot_id: number;
  day: string;
  time: string;
}

const daysMap: { [key: string]: number } = {
  'ΚΥΡΙΑΚΗ': 0, 'ΔΕΥΤΕΡΑ': 1, 'ΤΡΙΤΗ': 2, 'ΤΕΤΑΡΤΗ': 3, 
  'ΠΕΜΠΤΗ': 4, 'ΠΑΡΑΣΚΕΥΗ': 5, 'ΣΑΒΒΑΤΟ': 6
};

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const { refreshTokens } = useAuth();

  // Helper για τα Alerts
  const showBoxAlert = (title: string, text: string, icon: 'success' | 'error') => {
    Swal.fire({
      title: `<span style="color: #fff; font-weight: 900; text-transform: uppercase;">${title}</span>`,
      html: `<span style="color: #888;">${text}</span>`,
      icon: icon,
      background: '#0a0a0a',
      confirmButtonText: 'OK',
      iconColor: '#d32f2f',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
      },
      buttonsStyling: false,
    });
  };

  const fetchMyBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/my-bookings');
      setMyBookings(res.data);
    } catch (err) {
      console.error("Error fetching my bookings", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const isCancellable = (day: string, time: string) => {
    const now = new Date();
    const currentDayNum = now.getDay();
    const [h, m] = time.split(':').map(Number);
    const slotTotalMins = h * 60 + m;
    const nowTotalMins = now.getHours() * 60 + now.getMinutes();
    const slotDayNum = daysMap[day.toUpperCase()];

    if (slotDayNum < currentDayNum && currentDayNum !== 0) return false;
    if (slotDayNum === currentDayNum) {
      if (nowTotalMins >= slotTotalMins - 60) return false;
    }
    return true;
  };

  const handleCancel = async (slotId: number) => {
    // 🔥 Custom Confirm αντί για window.confirm
    const result = await Swal.fire({
      title: '<span style="color: #fff; font-weight: 900;">ARE YOU SURE?</span>',
      html: '<span style="color: #888;">Η ακύρωση θα σου επιστρέψει 1 token.</span>',
      icon: 'question',
      iconColor: '#d32f2f',
      showCancelButton: true,
      confirmButtonText: 'YES, CANCEL',
      cancelButtonText: 'NO, KEEP IT',
      background: '#0a0a0a',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
        cancelButton: 'box-cancel-button',
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      setProcessingId(slotId);
      await api.delete(`/bookings/cancel/${slotId}`);
      
      setMyBookings(prev => prev.filter(b => b.slot_id !== slotId));
      await refreshTokens();
      
      showBoxAlert("SUCCESS", "Η θέση ελευθερώθηκε και το token επιστράφηκε!", "success");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Αποτυχία ακύρωσης";
      showBoxAlert("ERROR", msg, "error");
      fetchMyBookings();
    } finally {
      setProcessingId(null);
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
        <Typography variant="h3" sx={{ 
          fontWeight: 900, 
          color: 'white', 
          mb: 1, 
          textAlign: 'center', 
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          fontSize: { xs: '2rem', md: '3rem' }
        }}>
          MY <span style={{ color: '#d32f2f' }}>SESSIONS</span> <EventBusy sx={{ fontSize: '2.5rem', color: '#d32f2f' }} />
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#666', mb: 6, textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          Ακυρώσεις επιτρέπονται έως και 60' πριν την έναρξη.
        </Typography>

        {myBookings.length === 0 ? (
          <Paper sx={{ p: 4, bgcolor: '#111', border: '1px dashed #333', textAlign: 'center', borderRadius: 0 }}>
            <Typography sx={{ color: '#555', fontWeight: 700 }}>ΔΕΝ ΕΧΕΙΣ ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΑ ΜΑΘΗΜΑΤΑ</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {myBookings.map((booking) => {
              const cancellable = isCancellable(booking.day, booking.time);
              const isProcessing = processingId === booking.slot_id;

              return (
                <Paper 
                  key={booking.slot_id} 
                  sx={{ 
                    p: 3, 
                    bgcolor: '#111', 
                    border: '1px solid #1a1a1a', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderRadius: 0,
                    transition: '0.3s',
                    '&:hover': { borderColor: cancellable ? '#d32f2f' : '#333' }
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>
                      {booking.day}
                    </Typography>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 900 }}>
                      {booking.time.substring(0, 5)}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    disabled={!cancellable || isProcessing}
                    startIcon={cancellable ? <CancelScheduleSend /> : <LockClock />}
                    onClick={() => handleCancel(booking.slot_id)}
                    sx={{ 
                      borderRadius: '0px', 
                      fontWeight: 900,
                      px: 3,
                      bgcolor: cancellable ? '#d32f2f' : '#222',
                      color: cancellable ? '#fff' : '#555',
                      '&:hover': { bgcolor: '#ff1744' },
                      '&.Mui-disabled': { bgcolor: '#1a1a1a', color: '#444' }
                    }}
                  >
                    {isProcessing ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : cancellable ? (
                      "CANCEL"
                    ) : (
                      "LOCKED"
                    )}
                  </Button>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default MyBookings;