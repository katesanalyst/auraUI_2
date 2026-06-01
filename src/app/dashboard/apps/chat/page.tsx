'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Avatar, TextField, IconButton, Badge,
  List, ListItemButton, ListItemAvatar, ListItemText, InputAdornment,
  Divider, useMediaQuery, useTheme,
} from '@mui/material';
import { Send, ArrowBack, Search } from '@mui/icons-material';

const contacts = [
  { id: 1, name: 'Alice Smith', avatar: 'AS', lastMsg: 'See you tomorrow!', time: '2m', unread: 2, online: true },
  { id: 2, name: 'Bob Johnson', avatar: 'BJ', lastMsg: 'Thanks for the update', time: '15m', unread: 0, online: false },
  { id: 3, name: 'Emma Wilson', avatar: 'EW', lastMsg: 'Can we schedule a call?', time: '1h', unread: 1, online: true },
];

const initialMessages: Record<number, { id: number; text: string; sent: boolean; time: string }[]> = {
  1: [
    { id: 1, text: 'Hey, how are you?', sent: false, time: '10:00 AM' },
    { id: 2, text: "I'm good, thanks! Working on the new project.", sent: true, time: '10:02 AM' },
    { id: 3, text: 'That sounds great! Need any help?', sent: false, time: '10:05 AM' },
    { id: 4, text: "Actually yes, can you review the PR?", sent: true, time: '10:07 AM' },
    { id: 5, text: 'Sure, I will take a look today.', sent: false, time: '10:10 AM' },
    { id: 6, text: 'See you tomorrow!', sent: false, time: '10:12 AM' },
  ],
  2: [
    { id: 1, text: 'The deployment went smoothly.', sent: true, time: '9:00 AM' },
    { id: 2, text: 'Thanks for the update', sent: false, time: '9:15 AM' },
  ],
  3: [
    { id: 1, text: 'Hi, I have some questions about the design.', sent: false, time: '11:00 AM' },
    { id: 2, text: 'Sure, what do you need?', sent: true, time: '11:05 AM' },
    { id: 3, text: 'Can we schedule a call?', sent: false, time: '11:30 AM' },
  ],
};

export default function ChatPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedId, setSelectedId] = useState(1);
  const [input, setInput] = useState('');
  const [showList, setShowList] = useState(true);
  const [allMessages, setAllMessages] = useState(initialMessages);

  const selected = contacts.find(c => c.id === selectedId)!;
  const messages = allMessages[selectedId] || [];

  const handleSend = () => {
    if (!input.trim()) return;
    setAllMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { id: Date.now(), text: input, sent: true, time: 'Now' }],
    }));
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 180px)', gap: 0, overflow: 'hidden' }}>
      {/* Contact list */}
      {(!isMobile || showList) && (
        <Card sx={{ width: isMobile ? '100%' : 320, flexShrink: 0, display: 'flex', flexDirection: 'column', mr: isMobile ? 0 : 2 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Chats</Typography>
            <TextField size="small" placeholder="Search..." fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }} />
          </Box>
          <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
            {contacts.map((c) => (
              <ListItemButton
                key={c.id}
                selected={c.id === selectedId}
                onClick={() => { setSelectedId(c.id); if (isMobile) setShowList(false); }}
                sx={{ py: 1.5, px: 2 }}
              >
                <ListItemAvatar>
                  <Badge color="success" variant="dot" invisible={!c.online} overlap="circular">
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', borderRadius: '12px', fontWeight: 600, fontSize: '0.8rem' }}>{c.avatar}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body2" fontWeight={600}>{c.name}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary" noWrap>{c.lastMsg}</Typography>}
                />
                <Box sx={{ textAlign: 'right', ml: 1 }}>
                  <Typography variant="caption" color="text.disabled">{c.time}</Typography>
                  {c.unread > 0 && (
                    <Box sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, mt: 0.5 }}>{c.unread}</Box>
                  )}
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Card>
      )}

      {/* Chat area */}
      {(!isMobile || !showList) && (
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            {isMobile && (
              <IconButton onClick={() => setShowList(true)} size="small"><ArrowBack /></IconButton>
            )}
            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', borderRadius: '12px', fontWeight: 600 }}>{selected.avatar}</Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>{selected.name}</Typography>
              <Typography variant="caption" color="text.secondary">{selected.online ? 'Online' : 'Offline'}</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {messages.map((m) => (
              <Box key={m.id} sx={{ display: 'flex', justifyContent: m.sent ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ maxWidth: '75%', bgcolor: m.sent ? 'primary.main' : 'grey.100', color: m.sent ? '#fff' : 'text.primary', borderRadius: '18px', px: 2, py: 1 }}>
                  <Typography variant="body2">{m.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem', display: 'block', textAlign: 'right', mt: 0.5 }}>{m.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}>
              <Send fontSize="small" />
            </IconButton>
          </Box>
        </Card>
      )}
    </Box>
  );
}
