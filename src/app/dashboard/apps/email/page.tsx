'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Avatar, IconButton, Badge, List, ListItemButton,
  ListItemIcon, ListItemText, Divider, TextField, InputAdornment,
  useMediaQuery, useTheme, Chip,
} from '@mui/material';
import {
  Inbox, Send, Drafts, Delete, Search, Star, StarBorder, ArrowBack, Reply, Forward,
} from '@mui/icons-material';

const folders = [
  { label: 'Inbox', icon: <Inbox fontSize="small" />, count: 5 },
  { label: 'Sent', icon: <Send fontSize="small" />, count: 12 },
  { label: 'Drafts', icon: <Drafts fontSize="small" />, count: 3 },
  { label: 'Trash', icon: <Delete fontSize="small" />, count: 0 },
];

const emails = [
  { id: 1, sender: 'Alice Smith', subject: 'Project Update - Q2 Roadmap', preview: 'Hi team, here is the updated roadmap for Q2. Please review the milestones...', time: '10:30 AM', unread: true, starred: true, avatar: 'AS' },
  { id: 2, sender: 'Bob Johnson', subject: 'Meeting Tomorrow', preview: 'Just a reminder that we have a team sync tomorrow at 2 PM. Please prepare...', time: '9:15 AM', unread: true, starred: false, avatar: 'BJ' },
  { id: 3, sender: 'GitHub', subject: '[PR #142] Review requested', preview: 'A new pull request has been opened and requires your review. Changes include...', time: 'Yesterday', unread: false, starred: false, avatar: 'GH' },
  { id: 4, sender: 'Emma Wilson', subject: 'Design Feedback', preview: 'I reviewed the latest mockups and have some suggestions for the navigation...', time: 'Yesterday', unread: false, starred: true, avatar: 'EW' },
  { id: 5, sender: 'Vercel', subject: 'Deployment Successful', preview: 'Your project spike-admin has been successfully deployed to production...', time: 'May 27', unread: false, starred: false, avatar: 'VL' },
];

export default function EmailPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [showList, setShowList] = useState(true);

  const activeEmail = emails.find(e => e.id === selectedEmail);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Email</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Manage your inbox</Typography>

      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 220px)', overflow: 'hidden' }}>
        {/* Sidebar */}
        {(!isMobile || (showList && !selectedEmail)) && (
          <Card sx={{ width: isMobile ? '100%' : 220, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>Folders</Typography>
              <List dense disablePadding>
                {folders.map((f) => (
                  <ListItemButton
                    key={f.label}
                    selected={selectedFolder === f.label}
                    onClick={() => setSelectedFolder(f.label)}
                    sx={{ borderRadius: '10px', mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: selectedFolder === f.label ? 'primary.main' : 'text.secondary' }}>{f.icon}</ListItemIcon>
                    <ListItemText primary={<Typography variant="body2" fontWeight={selectedFolder === f.label ? 600 : 400}>{f.label}</Typography>} />
                    {f.count > 0 && <Chip label={f.count} size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Card>
        )}

        {/* Email list */}
        {(!isMobile || (showList && !selectedEmail)) && (
          <Card sx={{ flex: isMobile ? 1 : 320, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <TextField size="small" fullWidth placeholder="Search emails..." slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }} />
            </Box>
            <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
              {emails.map((email) => (
                <ListItemButton
                  key={email.id}
                  selected={email.id === selectedEmail}
                  onClick={() => { setSelectedEmail(email.id); if (isMobile) setShowList(false); }}
                  sx={{ py: 1.5, px: 2, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { border: 0 } }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: email.unread ? 'primary.light' : 'grey.100', color: email.unread ? 'primary.main' : 'text.secondary', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>{email.avatar}</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={email.unread ? 700 : 400} noWrap>{email.sender}</Typography>
                        <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0, ml: 1 }}>{email.time}</Typography>
                      </Box>
                    }
                    secondary={
                      <span>
                        <Typography variant="caption" fontWeight={email.unread ? 600 : 400} noWrap display="block">{email.subject}</Typography>
                        <Typography variant="caption" color="text.disabled" noWrap display="block">{email.preview}</Typography>
                      </span>
                    }
                    primaryTypographyProps={{ component: 'div' }}
                    secondaryTypographyProps={{ component: 'span' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Card>
        )}

        {/* Email detail */}
        {(!isMobile || (!showList && selectedEmail)) && activeEmail && (
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Box sx={{ p: { xs: 2, sm: 3 }, borderBottom: '1px solid', borderColor: 'divider' }}>
              {isMobile && (
                <IconButton onClick={() => { setShowList(true); setSelectedEmail(null); }} size="small" sx={{ mb: 1 }}>
                  <ArrowBack />
                </IconButton>
              )}
              <Typography variant="h6" fontWeight={700} mb={1}>{activeEmail.subject}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light', color: 'primary.main', borderRadius: '12px', fontWeight: 600 }}>{activeEmail.avatar}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{activeEmail.sender}</Typography>
                  <Typography variant="caption" color="text.secondary">to me</Typography>
                </Box>
                <Typography variant="caption" color="text.disabled">{activeEmail.time}</Typography>
              </Box>
            </Box>
            <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1 }}>
              <Typography variant="body2" lineHeight={1.8}>
                {activeEmail.preview}
                <br /><br />
                Please review and let me know your thoughts by end of day. If you have any questions, feel free to reach out.
                <br /><br />
                Best regards,<br />{activeEmail.sender}
              </Typography>
            </Box>
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
              <IconButton size="small"><Reply fontSize="small" /></IconButton>
              <IconButton size="small"><Forward fontSize="small" /></IconButton>
              <IconButton size="small"><Delete fontSize="small" /></IconButton>
            </Box>
          </Card>
        )}

        {!selectedEmail && (!isMobile || (!showList)) && (
          <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Select an email to read</Typography>
          </Card>
        )}
      </Box>
    </Box>
  );
}
