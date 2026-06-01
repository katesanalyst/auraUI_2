'use client';

import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { Build } from '@mui/icons-material';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3, textAlign: 'center' }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '24px', bgcolor: 'warning.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <Build sx={{ fontSize: 40, color: 'warning.main' }} />
      </Box>
      <Typography variant="h3" fontWeight={800} mb={1}>Under Maintenance</Typography>
      <Typography variant="body1" color="text.secondary" mb={4} maxWidth={440}>
        We&apos;re performing scheduled maintenance to improve performance. We&apos;ll be back shortly.
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 360, mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography variant="caption" color="text.secondary">Progress</Typography>
          <Typography variant="caption" fontWeight={700} color="warning.main">72%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={72} sx={{ height: 8, borderRadius: 4, bgcolor: 'warning.light', '& .MuiLinearProgress-bar': { bgcolor: 'warning.main', borderRadius: 4 } }} />
      </Box>
      <Typography variant="caption" color="text.disabled" mb={4}>Estimated completion: ~30 minutes</Typography>
      <Button variant="contained" component={Link} href="/dashboard">Check Status</Button>
    </Box>
  );
}
