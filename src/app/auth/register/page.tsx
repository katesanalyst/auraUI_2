'use client';

import { useState } from 'react';
import {
  Box, Card, Typography, TextField, Button, Checkbox, FormControlLabel,
  Divider, IconButton, InputAdornment, Link as MuiLink, Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { setError('Please fill in all fields'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (!agreed) { setError('Please agree to the Terms'); return; }
    window.location.href = '/auth/login';
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--bg-body)', p: 2, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', bottom: -50, left: -125, width: 300, height: 300, borderRadius: '50%', bgcolor: '#46caeb', opacity: 0.3 }} />
      <Box sx={{ position: 'absolute', top: -65, right: -60, width: 304, height: 315, borderRadius: '50%', bgcolor: '#0085db', opacity: 0.15 }} />

      <Card sx={{ width: '100%', maxWidth: { xs: 400, sm: 500, lg: 1320 }, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, minHeight: { lg: 650 } }}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1, bgcolor: 'secondary.main', alignItems: 'center', justifyContent: 'center', p: 6, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ textAlign: 'center', color: '#fff', zIndex: 1 }}>
              <Typography variant="h3" fontWeight={700} mb={2}>Join Us Today</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 300, mx: 'auto' }}>Create your account and start managing your dashboard</Typography>
            </Box>
            <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', top: -40, right: -40 }} />
            <Box sx={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)', bottom: -30, left: -30 }} />
          </Box>

          <Box sx={{ flex: 1, p: { xs: 3, sm: 4, lg: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>S</Box>
                <Typography variant="h5" fontWeight={700}>Spike</Typography>
              </Box>
            </Box>

            <Typography variant="h4" fontWeight={700} mb={1}>Sign Up</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Create your account to get started</Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 'var(--radius-lg)' }}>{error}</Alert>}

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button variant="outlined" fullWidth sx={{ borderRadius: 'var(--radius-xl)', borderColor: 'var(--border)', color: 'text.primary', py: 1.5, '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}>Google</Button>
              <Button variant="outlined" fullWidth sx={{ borderRadius: 'var(--radius-xl)', borderColor: 'var(--border)', color: 'text.primary', py: 1.5, '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}>GitHub</Button>
            </Box>

            <Divider sx={{ mb: 3 }}><Typography variant="caption" color="text.disabled">or sign up with email</Typography></Divider>

            <form onSubmit={handleSubmit}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>Full Name</Typography>
              <TextField fullWidth placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2.5 }} size="small" />

              <Typography variant="body2" fontWeight={600} mb={0.5}>Email Address</Typography>
              <TextField fullWidth placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ mb: 2.5 }} size="small" />

              <Typography variant="body2" fontWeight={600} mb={0.5}>Password</Typography>
              <TextField fullWidth placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} sx={{ mb: 2.5 }} size="small"
                slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment> } }} />

              <Typography variant="body2" fontWeight={600} mb={0.5}>Confirm Password</Typography>
              <TextField fullWidth placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} sx={{ mb: 2 }} size="small" />

              <FormControlLabel control={<Checkbox size="small" color="primary" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />} label={<Typography variant="body2">I agree to the <MuiLink href="#" fontWeight={600}>Terms & Conditions</MuiLink></Typography>} sx={{ mb: 3 }} />

              <Button type="submit" variant="contained" fullWidth size="large" sx={{ mb: 3, py: 1.5, fontWeight: 600 }}>Sign Up</Button>
            </form>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Already have an account? <MuiLink component={Link} href="/auth/login" fontWeight={600}>Sign In</MuiLink>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
