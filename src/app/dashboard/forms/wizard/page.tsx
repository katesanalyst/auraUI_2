'use client';

import { useState } from 'react';
import { Box, Typography, Card, Grid, TextField, Button, Stepper, Step, StepLabel, Divider, Alert } from '@mui/material';

const steps = ['Personal Info', 'Address', 'Confirmation'];

export default function FormWizardPage() {
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', street: '', city: '', zip: '', country: '' });

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const content = [
    <Box key="step1" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="First Name" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} fullWidth size="small" />
        </Grid>
      </Grid>
      <TextField label="Email" value={form.email} onChange={(e) => update('email', e.target.value)} fullWidth size="small" type="email" />
    </Box>,
    <Box key="step2" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField label="Street Address" value={form.street} onChange={(e) => update('street', e.target.value)} fullWidth size="small" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="City" value={form.city} onChange={(e) => update('city', e.target.value)} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="ZIP Code" value={form.zip} onChange={(e) => update('zip', e.target.value)} fullWidth size="small" />
        </Grid>
      </Grid>
      <TextField label="Country" value={form.country} onChange={(e) => update('country', e.target.value)} fullWidth size="small" />
    </Box>,
    <Box key="step3">
      <Alert severity="info" sx={{ mb: 2, borderRadius: 'var(--radius-lg)' }}>Please review your information before submitting.</Alert>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {Object.entries(form).map(([k, v]) => (
          <Box key={k}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</Typography>
            <Typography variant="body2" fontWeight={600}>{v || '—'}</Typography>
          </Box>
        ))}
      </Box>
    </Box>,
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Form Wizard</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 4, borderRadius: 'var(--radius-lg)' }}>
            <Stepper activeStep={active} sx={{ mb: 4 }}>
              {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>
            <Divider sx={{ mb: 3 }} />
            {content[active]}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" disabled={active === 0} onClick={() => setActive(active - 1)}>Back</Button>
              {active < steps.length - 1 ? (
                <Button variant="contained" onClick={() => setActive(active + 1)}>Next</Button>
              ) : (
                <Button variant="contained" color="success" onClick={() => alert('Submitted!')}>Submit</Button>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
