'use client';

import { Box, Typography, Card, Divider } from '@mui/material';

export default function TypographyPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Typography</Typography>
      <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 'var(--radius-lg)' }}>
        <Typography variant="h1" mb={2}>h1. Heading - Plus Jakarta Sans 2rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h2" mb={2}>h2. Heading - Plus Jakarta Sans 1.75rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h3" mb={2}>h3. Heading - Plus Jakarta Sans 1.5rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" mb={2}>h4. Heading - Plus Jakarta Sans 1.25rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5" mb={2}>h5. Heading - Plus Jakarta Sans 1rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" mb={2}>h6. Heading - Plus Jakarta Sans 0.875rem</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" mb={2}>subtitle1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" mb={2}>subtitle2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" mb={2}>body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" mb={2}>body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="button" display="block" mb={2}>BUTTON TEXT</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption" display="block" mb={2}>caption text</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="overline" display="block">OVERLINE TEXT</Typography>
      </Card>
    </Box>
  );
}
