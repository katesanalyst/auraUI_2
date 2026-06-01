'use client';

import { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email'); return; }
    setSent(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--bg-body)', p: 2, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', bottom: -50, left: -125, width: 300, height: 300, borderRadius: '50%', bgcolor: '#fb977d', opacity: 0.25 }} />
      <Box sx={{ position: 'absolute', top: -65, right: -60, width: 304, height: 315, borderRadius: '50%', bgcolor: '#0085db', opacity: 0.1 }} />

      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', p: { xs: 3, sm: 5 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>S</Box>
          <Typography variant="h5" fontWeight={700}>Spike</Typography>
        </Box>

        <Typography variant="h4" fontWeight={700} mb={1}>Forgot Password?</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Enter your email and we&apos;ll send you a reset link</Typography>

        {sent ? (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 'var(--radius-lg)' }}>
            Reset link sent to <strong>{email}</strong>. Check your inbox.
          </Alert>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 'var(--radius-lg)' }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>Email Address</Typography>
              <TextField fullWidth placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ mb: 3 }} size="small" />
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ mb: 3, py: 1.5, fontWeight: 600 }}>Send Reset Link</Button>
            </form>
          </>
        )}

        <Typography variant="body2" color="text.secondary" textAlign="center">
          <MuiLink component={Link} href="/auth/login" fontWeight={600}>Back to Sign In</MuiLink>
        </Typography>
      </Card>
    </Box>
  );
}
