'use client';

import { useState } from 'react';
import { Box, Typography, Card, Grid, TextField, Button, Alert } from '@mui/material';

export default function FormValidationPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) setSubmitted(false);
  };

  const update = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (submitted) setErrors(validate());
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Form Validation</Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 4, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={0.5}>Registration Form</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>All fields are required</Typography>
            {submitted && Object.keys(errors).length === 0 && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 'var(--radius-lg)' }}>Form submitted successfully!</Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Full Name" value={form.name} onChange={(e) => update('name', e.target.value)}
                  error={!!errors.name} helperText={errors.name} fullWidth size="small" required
                />
                <TextField
                  label="Email Address" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  error={!!errors.email} helperText={errors.email} fullWidth size="small" required
                />
                <TextField
                  label="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)}
                  error={!!errors.password} helperText={errors.password || 'Minimum 6 characters'} fullWidth size="small" required
                />
                <TextField
                  label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)}
                  error={!!errors.confirmPassword} helperText={errors.confirmPassword} fullWidth size="small" required
                />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                  <Button variant="outlined" onClick={() => { setForm({ name: '', email: '', password: '', confirmPassword: '' }); setErrors({}); setSubmitted(false); }}>Reset</Button>
                  <Button type="submit" variant="contained">Register</Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
