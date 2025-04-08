import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { register } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Container } from '@mui/material';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    //   await dispatch(register({ email, password, displayName })).unwrap();
      await dispatch(register({ email, password })).unwrap();
      navigate('/notes');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            label="Display Name"
            autoComplete="name"
            autoFocus
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to="/login">Already have an account? Sign In</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;