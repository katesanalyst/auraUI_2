'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Grid, Alert, AlertTitle,
  Accordion, AccordionSummary, AccordionDetails,
  Avatar, AvatarGroup, Chip, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions,
  List, ListItem, ListItemAvatar, ListItemText, ListItemIcon,
  Tabs, Tab, Tooltip, Rating, Divider, Switch, FormControlLabel,
  Snackbar, IconButton, Badge,
} from '@mui/material';
import {
  ExpandMore, CheckCircle, Info, Warning, Error,
  Inbox, Drafts, Send, Work, BeachAccess, Close,
  Star, Favorite, PersonOutline, Notifications,
} from '@mui/icons-material';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', mb: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>{title}</Typography>
      {children}
    </Card>
  );
}

export default function UIComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [rating, setRating] = useState<number | null>(3.5);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>UI Components</Typography>
        <Typography variant="body2" color="text.secondary">MUI component showcase — alerts, accordions, chips, dialogs and more</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Alerts */}
        <Grid item xs={12} lg={6}>
          <Section title="Alerts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Alert severity="success"><AlertTitle>Success</AlertTitle>Your changes have been saved successfully.</Alert>
              <Alert severity="info"><AlertTitle>Info</AlertTitle>A new software update is available.</Alert>
              <Alert severity="warning"><AlertTitle>Warning</AlertTitle>Your storage is almost full.</Alert>
              <Alert severity="error"><AlertTitle>Error</AlertTitle>Failed to connect to the server.</Alert>
              <Alert severity="success" variant="filled">Filled success alert</Alert>
              <Alert severity="info" variant="outlined">Outlined info alert</Alert>
            </Box>
          </Section>
        </Grid>

        {/* Chips */}
        <Grid item xs={12} lg={6}>
          <Section title="Chips">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].map((c) => (
                <Chip key={c} label={c} color={c as any} sx={{ textTransform: 'capitalize' }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {['primary', 'success', 'warning', 'error'].map((c) => (
                <Chip key={c} label={c} color={c as any} variant="outlined" onDelete={() => {}} sx={{ textTransform: 'capitalize' }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="With Avatar" avatar={<Avatar>A</Avatar>} />
              <Chip label="Clickable" onClick={() => {}} color="primary" />
              <Chip label="Small" size="small" color="secondary" />
              <Chip icon={<CheckCircle />} label="With Icon" color="success" />
            </Box>
          </Section>
        </Grid>

        {/* Accordion */}
        <Grid item xs={12} lg={6}>
          <Section title="Accordion">
            {[
              { title: 'What is Spike Admin?', body: 'Spike Admin is a modern, feature-rich Next.js admin dashboard template built with MUI v6.' },
              { title: 'How do I customize the theme?', body: 'Use the Customizer drawer (gear icon on the right edge) to switch colors, dark/light mode, and sidebar style.' },
              { title: 'Does it support dark mode?', body: 'Yes — toggle via the moon icon in the header or the Customizer panel. Preference is persisted in localStorage.' },
              { title: 'Is it mobile responsive?', body: 'Fully responsive with a collapsible mobile drawer sidebar and fluid grid layouts throughout.' },
            ].map(({ title, body }, i) => (
              <Accordion key={i} sx={{ '&:before': { display: 'none' }, borderRadius: 'var(--radius-md) !important', mb: 1, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body2" fontWeight={600}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">{body}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Section>
        </Grid>

        {/* Avatars */}
        <Grid item xs={12} lg={6}>
          <Section title="Avatars">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
              {['#0085db', '#39b69a', '#fb977d', '#7C3AED', '#f0c040'].map((c, i) => (
                <Avatar key={c} sx={{ bgcolor: c, borderRadius: '12px' }}>{String.fromCharCode(65 + i)}</Avatar>
              ))}
              <Avatar sx={{ bgcolor: 'primary.main' }}><PersonOutline /></Avatar>
              <Avatar sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'secondary.main' }}>XL</Avatar>
              <Avatar sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: 'success.main', fontSize: '0.7rem' }}>SM</Avatar>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge badgeContent={4} color="error"><Avatar sx={{ bgcolor: 'primary.main', borderRadius: '10px' }}>B</Avatar></Badge>
              <Badge variant="dot" color="success"><Avatar sx={{ bgcolor: 'secondary.main', borderRadius: '10px' }}>C</Avatar></Badge>
              <AvatarGroup max={4}>
                {['#0085db', '#39b69a', '#fb977d', '#7C3AED', '#f0c040'].map((c, i) => (
                  <Avatar key={c} sx={{ bgcolor: c, borderRadius: '10px', border: '2px solid', borderColor: 'background.paper' }}>{String.fromCharCode(65 + i)}</Avatar>
                ))}
              </AvatarGroup>
            </Box>
          </Section>
        </Grid>

        {/* Tabs */}
        <Grid item xs={12} lg={6}>
          <Section title="Tabs">
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Tab label="Overview" />
              <Tab label="Analytics" />
              <Tab label="Reports" />
              <Tab label="Settings" />
            </Tabs>
            <Box sx={{ p: 1 }}>
              {tab === 0 && <Typography variant="body2" color="text.secondary">Overview content — key metrics and summary cards would appear here.</Typography>}
              {tab === 1 && <Typography variant="body2" color="text.secondary">Analytics content — charts, trends and data visualizations.</Typography>}
              {tab === 2 && <Typography variant="body2" color="text.secondary">Reports content — downloadable reports and export options.</Typography>}
              {tab === 3 && <Typography variant="body2" color="text.secondary">Settings content — configuration and preferences panel.</Typography>}
            </Box>
          </Section>
        </Grid>

        {/* Dialog + Snackbar */}
        <Grid item xs={12} lg={6}>
          <Section title="Dialog & Snackbar">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
              <Button variant="outlined" onClick={() => setSnackOpen(true)}>Show Snackbar</Button>
            </Box>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: { borderRadius: 'var(--radius-lg)' } }}>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Confirm Action
                <IconButton size="small" onClick={() => setDialogOpen(false)}><Close fontSize="small" /></IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Are you sure you want to delete this item? This action cannot be undone.</DialogContentText>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => setDialogOpen(false)}>Delete</Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="success" onClose={() => setSnackOpen(false)} sx={{ borderRadius: 'var(--radius-lg)' }}>
                Action completed successfully!
              </Alert>
            </Snackbar>
          </Section>
        </Grid>

        {/* List */}
        <Grid item xs={12} lg={6}>
          <Section title="List">
            <List dense>
              {[{ icon: <Inbox />, primary: 'Inbox', secondary: '24 new messages', color: '#0085db' },
                { icon: <Drafts />, primary: 'Drafts', secondary: '7 saved drafts', color: '#7C3AED' },
                { icon: <Send />, primary: 'Sent', secondary: '152 sent messages', color: '#39b69a' },
                { icon: <Work />, primary: 'Work', secondary: 'Team workspace', color: '#fb977d' },
                { icon: <BeachAccess />, primary: 'Vacation', secondary: 'Out of office replies', color: '#f0c040' },
              ].map(({ icon, primary, secondary, color }) => (
                <ListItem key={primary} sx={{ borderRadius: 'var(--radius-md)', '&:hover': { bgcolor: 'action.hover' } }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color + '20', color, borderRadius: '10px', width: 36, height: 36 }}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body2" fontWeight={600}>{primary}</Typography>} secondary={secondary} />
                </ListItem>
              ))}
            </List>
          </Section>
        </Grid>

        {/* Tooltip & Rating */}
        <Grid item xs={12} lg={6}>
          <Section title="Tooltip & Rating">
            <Typography variant="body2" color="text.secondary" mb={1.5}>Hover to see tooltips</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
              {[['top', 'primary'], ['bottom', 'success'], ['left', 'warning'], ['right', 'error']].map(([p, c]) => (
                <Tooltip key={p} title={`Tooltip on ${p}`} placement={p as any}>
                  <Button variant="outlined" color={c as any} size="small" sx={{ textTransform: 'capitalize' }}>{p}</Button>
                </Tooltip>
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" fontWeight={600} mb={1}>Star Rating</Typography>
            <Rating value={rating} onChange={(_, v) => setRating(v)} precision={0.5} sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Rating defaultValue={4} readOnly />
              <Rating defaultValue={2} max={5} icon={<Favorite fontSize="inherit" />} emptyIcon={<Favorite fontSize="inherit" />} sx={{ color: '#f44336' }} />
            </Box>
          </Section>
        </Grid>

        {/* Switch & Notifications badge */}
        <Grid item xs={12} lg={6}>
          <Section title="Switch & Badge">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              {['primary', 'secondary', 'success', 'warning', 'error'].map((c) => (
                <FormControlLabel key={c} control={<Switch defaultChecked color={c as any} />} label={<Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{c}</Typography>} />
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" fontWeight={600} mb={1.5}>Badges</Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {[['error', 4], ['primary', 99], ['success', '●'], ['warning', 'NEW']].map(([color, content]) => (
                <Badge key={String(color)} badgeContent={content} color={color as any}>
                  <Notifications sx={{ fontSize: 28, color: 'text.secondary' }} />
                </Badge>
              ))}
            </Box>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
}
