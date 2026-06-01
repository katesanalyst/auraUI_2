'use client';

import { Box, Typography, Button } from '@mui/material';
import { BugReport } from '@mui/icons-material';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3, textAlign: 'center' }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '24px', bgcolor: 'error.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <BugReport sx={{ fontSize: 40, color: 'error.main' }} />
      </Box>
      <Typography variant="h1" fontWeight={800} sx={{ fontSize: { xs: '5rem', sm: '8rem' }, color: 'error.main', lineHeight: 1 }}>500</Typography>
      <Typography variant="h4" fontWeight={700} mt={2} mb={1}>Internal Server Error</Typography>
      <Typography variant="body1" color="text.secondary" mb={4} maxWidth={420}>
        Something went wrong on our end. We&apos;re working to fix it. Please try again later.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => window.location.reload()}>Try Again</Button>
        <Button variant="contained" component={Link} href="/dashboard">Go Home</Button>
      </Box>
    </Box>
  );
}
