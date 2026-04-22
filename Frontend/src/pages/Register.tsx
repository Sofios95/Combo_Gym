import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// 🔥 ΔΙΟΡΘΩΣΗ: Χρήση του δικού σου api config αντί για σκέτο axios
import api from '../api/axiosConfig'; 

const Register = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Χρήση του api instance για να παίζει σωστά στο deployment
      const response = await api.post('/auth/register', {
        email,
        password
      });

      alert(response.data.message); 
      navigate('/login'); 

    } catch (err: any) {
      alert(err.response?.data?.message || "Η εγγραφή απέτυχε");
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#121212', borderRadius: '15px', border: '1px solid #333' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            JOIN THE <span style={{ color: '#d32f2f' }}>GYM</span>
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ονοματεπώνυμο"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ py: 1.5, fontWeight: 'bold', borderRadius: '30px' }}
            >
              ΕΓΓΡΑΦΗ
            </Button>
            
            {/* ΔΙΟΡΘΩΣΗ: Αλλαγή Grid για MUI v6 */}
            <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#d32f2f' } }}>
                  {"Έχεις ήδη λογαριασμό; Σύνδεση"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;