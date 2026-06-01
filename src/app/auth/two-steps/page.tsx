'use client';

import { useState, useRef } from 'react';
import { Box, Card, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function TwoStepsPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.charAt(value.length - 1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) refs.current[index - 1]?.focus();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--bg-body)', p: 2, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', bottom: -50, left: -125, width: 300, height: 300, borderRadius: '50%', bgcolor: '#39b69a', opacity: 0.2 }} />
      <Box sx={{ position: 'absolute', top: -65, right: -60, width: 304, height: 315, borderRadius: '50%', bgcolor: '#0085db', opacity: 0.1 }} />

      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', p: { xs: 3, sm: 5 }, position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, justifyContent: 'center' }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>S</Box>
          <Typography variant="h5" fontWeight={700}>Spike</Typography>
        </Box>

        <Typography variant="h4" fontWeight={700} mb={1}>Two-Step Verification</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Enter the 6-digit code sent to your email</Typography>

        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 4 }}>
          {code.map((digit, i) => (
            <TextField
              key={i}
              inputRef={(el) => { refs.current[i] = el!; }}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              slotProps={{ htmlInput: { maxLength: 1, style: { textAlign: 'center', fontSize: '1.25rem', fontWeight: 600, padding: '12px 8px' } } }}
              sx={{ width: 52, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              size="small"
            />
          ))}
        </Box>

        <Button variant="contained" fullWidth size="large" sx={{ mb: 3, py: 1.5, fontWeight: 600 }}>Verify</Button>

        <Typography variant="body2" color="text.secondary">
          Didn&apos;t receive the code? <MuiLink href="#" fontWeight={600}>Resend</MuiLink>
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          <MuiLink component={Link} href="/auth/login" fontWeight={600}>Back to Sign In</MuiLink>
        </Typography>
      </Card>
    </Box>
  );
}
