'use client';

import { Box, Typography, Card, Grid } from '@mui/material';

const shadows = [
  { level: 0, label: 'Elevation 0', shadow: 'none' },
  { level: 1, label: 'Elevation 1', shadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)' },
  { level: 2, label: 'Elevation 2', shadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)' },
  { level: 3, label: 'Elevation 3', shadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)' },
  { level: 4, label: 'Elevation 4', shadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)' },
  { level: 6, label: 'Elevation 6', shadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)' },
  { level: 8, label: 'Elevation 8', shadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)' },
  { level: 12, label: 'Elevation 12', shadow: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)' },
  { level: 24, label: 'Elevation 24', shadow: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)' },
];

export default function ShadowPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Shadows</Typography>
      <Grid container spacing={3}>
        {shadows.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.level}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 'var(--radius-lg)', p: 4, boxShadow: item.shadow, textAlign: 'center' }}>
              <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
              <Typography variant="caption" color="text.secondary">boxShadow: {item.level}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
