import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 🔥 Εισαγωγή SweetAlert2
import api from '../api/axiosConfig'; 

const Register = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Helper για τα Alerts
  const showBoxAlert = (title: string, text: string, icon: 'success' | 'error') => {
    Swal.fire({
      title: `<span style="color: #fff; font-weight: 900; text-transform: uppercase;">${title}</span>`,
      html: `<span style="color: #888;">${text}</span>`,
      icon: icon,
      background: '#0a0a0a',
      confirmButtonText: icon === 'success' ? 'GO TO LOGIN' : 'TRY AGAIN',
      iconColor: '#d32f2f',
      customClass: {
        popup: 'box-alert-popup',
        confirmButton: 'box-alert-button',
      },
      buttonsStyling: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        name, // Φρόντισε το backend σου να δέχεται το name αν το χρειάζεσαι
        email,
        password
      });

      showBoxAlert("WELCOME TO THE TEAM", response.data.message || "Η εγγραφή ολοκληρώθηκε!", "success");
      navigate('/login'); 

    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Η εγγραφή απέτυχε";
      showBoxAlert("REGISTRATION ERROR", errorMsg, "error");
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', bgcolor: '#000' }}>
      <Container maxWidth="xs">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: '#0a0a0a', 
            borderRadius: 0, 
            border: '1px solid #1a1a1a',
            '&:hover': { borderColor: '#d32f2f' },
            transition: '0.3s'
          }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 4, textTransform: 'uppercase', color: 'white' }}>
            JOIN THE <span style={{ color: '#d32f2f' }}>GYM</span>
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ονοματεπώνυμο"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              variant="outlined"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 0 },
                '& .MuiInputLabel-root': { color: '#666' },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 0 },
                '& .MuiInputLabel-root': { color: '#666' },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': { borderRadius: 0 },
                '& .MuiInputLabel-root': { color: '#666' },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                py: 2, 
                fontWeight: 900, 
                borderRadius: 0, 
                bgcolor: '#d32f2f',
                '&:hover': { bgcolor: '#ff1744' }
              }}
            >
              ΕΓΓΡΑΦΗ
            </Button>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: '#555', 
                  textDecoration: 'none', 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: 1,
                  '&:hover': { color: '#d32f2f' } 
                }}
              >
                {"Έχεις ήδη λογαριασμό; Σύνδεση"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;