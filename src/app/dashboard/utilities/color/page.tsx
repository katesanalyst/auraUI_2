'use client';

import { Box, Typography, Card, Grid } from '@mui/material';

const colors = [
  { name: 'Primary', shades: [{ label: 'light', hex: '#e5f3fb' }, { label: 'main', hex: '#0085db' }, { label: 'dark', hex: '#006bb3' }] },
  { name: 'Secondary', shades: [{ label: 'light', hex: '#e1f5fa' }, { label: 'main', hex: '#46caeb' }, { label: 'dark', hex: '#3aa8c7' }] },
  { name: 'Success', shades: [{ label: 'light', hex: '#e6f7f3' }, { label: 'main', hex: '#39b69a' }, { label: 'dark', hex: '#2d9179' }] },
  { name: 'Warning', shades: [{ label: 'light', hex: '#fde8e2' }, { label: 'main', hex: '#fb977d' }, { label: 'dark', hex: '#f57a5a' }] },
  { name: 'Error', shades: [{ label: 'light', hex: '#fde8e2' }, { label: 'main', hex: '#fb977d' }, { label: 'dark', hex: '#e5563e' }] },
  { name: 'Info', shades: [{ label: 'light', hex: '#e1f5fa' }, { label: 'main', hex: '#46caeb' }, { label: 'dark', hex: '#3aa8c7' }] },
  { name: 'Grey', shades: [{ label: '100', hex: '#F0F5F9' }, { label: '300', hex: '#e5eaef' }, { label: '500', hex: '#8a929a' }, { label: '700', hex: '#5a6264' }, { label: '900', hex: '#111c2d' }] },
];

export default function ColorPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Color Palette</Typography>
      <Grid container spacing={3}>
        {colors.map((color) => (
          <Grid item xs={12} sm={6} md={4} key={color.name}>
            <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600}>{color.name}</Typography>
              </Box>
              {color.shades.map((shade) => (
                <Box key={shade.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.5 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: shade.hex, border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{shade.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{shade.hex}</Typography>
                  </Box>
                </Box>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
