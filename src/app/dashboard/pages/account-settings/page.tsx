'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Grid, TextField, Button, Avatar, Tabs, Tab, Switch,
  FormControlLabel, Divider, IconButton,
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

export default function AccountSettingsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Account Settings</Typography>
      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab label="Profile" />
          <Tab label="Security" />
          <Tab label="Notifications" />
        </Tabs>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {tab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2.5rem', fontWeight: 700 }}>JD</Avatar>
                  <IconButton size="small" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'background.paper', boxShadow: 1 }}>
                    <CameraAlt fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="First Name" defaultValue="John" fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Last Name" defaultValue="Doe" fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" defaultValue="john@example.com" fullWidth size="small" type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone" defaultValue="+1 (555) 000-0000" fullWidth size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Bio" defaultValue="Senior developer with 5+ years experience." fullWidth multiline rows={3} size="small" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined">Cancel</Button>
                  <Button variant="contained">Save Changes</Button>
                </Box>
              </Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Box sx={{ maxWidth: 500 }}>
              <Typography variant="h6" mb={2}>Change Password</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField label="Current Password" type="password" fullWidth size="small" />
                <TextField label="New Password" type="password" fullWidth size="small" helperText="Minimum 8 characters" />
                <TextField label="Confirm New Password" type="password" fullWidth size="small" />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" mb={2}>Two-Factor Authentication</Typography>
              <FormControlLabel control={<Switch defaultChecked />} label="Enable 2FA via authenticator app" />
              <Typography variant="body2" color="text.secondary" mt={1}>Add an extra layer of security to your account.</Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained">Update Security</Button>
              </Box>
            </Box>
          )}
          {tab === 2 && (
            <Box sx={{ maxWidth: 500 }}>
              <Typography variant="h6" mb={2}>Email Notifications</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <FormControlLabel control={<Switch defaultChecked />} label="Product updates and announcements" />
                <FormControlLabel control={<Switch defaultChecked />} label="Security alerts" />
                <FormControlLabel control={<Switch />} label="Marketing emails" />
                <FormControlLabel control={<Switch defaultChecked />} label="Weekly digest" />
                <FormControlLabel control={<Switch />} label="Comment replies" />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" mb={2}>Push Notifications</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <FormControlLabel control={<Switch defaultChecked />} label="New messages" />
                <FormControlLabel control={<Switch />} label="Task reminders" />
                <FormControlLabel control={<Switch defaultChecked />} label="System alerts" />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained">Save Preferences</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
}
