import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// 🔥 ΔΙΟΡΘΩΣΗ 1: Χρησιμοποιούμε το δικό μας api config
import api from '../api/axiosConfig'; 
// 🔥 ΔΙΟΡΘΩΣΗ 2: Παίρνουμε τη συνάρτηση login από το Context
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { token } = response.data;
      login(token);
      
      alert("🔥 Welcome back, Champ!");
      navigate('/booking'); 

    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#121212', borderRadius: '15px', border: '1px solid #333' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            LOGIN <span style={{ color: '#d32f2f' }}>GYM</span>
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
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
              ΕΙΣΟΔΟΣ
            </Button>
            {/* ΔΙΟΡΘΩΣΗ: Αλλαγή Grid για MUI v6 */}
            <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/register" sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#d32f2f' } }}>
                  {"Δεν έχεις λογαριασμό; Γράψου εδώ"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;