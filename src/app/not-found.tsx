'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--bg-body)',
        p: 3,
      }}
    >
      <Typography variant="h1" fontWeight={800} sx={{ fontSize: { xs: '6rem', sm: '10rem' }, color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} href="/dashboard">
        Back to Dashboard
      </Button>
    </Box>
  );
}
