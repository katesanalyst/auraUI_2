'use client';

import { Box, Typography, Card, Grid, TextField, Button, Divider, FormControlLabel, Checkbox } from '@mui/material';

export default function FormLayoutPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Form Layout</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={0.5}>Contact Information</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Fill in your contact details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First Name" placeholder="John" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last Name" placeholder="Doe" fullWidth size="small" />
                </Grid>
              </Grid>
              <TextField label="Email" placeholder="john@example.com" fullWidth size="small" type="email" />
              <TextField label="Phone" placeholder="+1 (555) 000-0000" fullWidth size="small" />
              <Divider />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save Contact</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={0.5}>Address</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Enter your shipping address</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Street Address" placeholder="123 Main St" fullWidth size="small" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="City" placeholder="New York" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="State / Province" placeholder="NY" fullWidth size="small" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="ZIP / Postal Code" placeholder="10001" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Country" placeholder="United States" fullWidth size="small" />
                </Grid>
              </Grid>
              <FormControlLabel control={<Checkbox />} label="Save as default address" />
              <Divider />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save Address</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={0.5}>Inline Form</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Horizontal layout for quick inputs</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <TextField label="Name" placeholder="John Doe" size="small" sx={{ minWidth: 200, flex: 1 }} />
              <TextField label="Email" placeholder="john@example.com" size="small" sx={{ minWidth: 200, flex: 1 }} />
              <TextField label="Role" placeholder="Developer" size="small" sx={{ minWidth: 200, flex: 1 }} />
              <Button variant="contained" sx={{ height: 40 }}>Submit</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
