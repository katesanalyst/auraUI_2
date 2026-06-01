'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Grid, Avatar, Chip, Button, IconButton, Checkbox, FormControlLabel,
  Divider, List, ListItem, ListItemAvatar, ListItemText, LinearProgress, TextField,
} from '@mui/material';
import {
  TrendingUp, AttachMoney, ShoppingCart, People, Cloud, WbSunny, Add, Close, CheckCircle,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';

const todos = [
  { text: 'Review pull requests', done: true },
  { text: 'Update documentation', done: false },
  { text: 'Fix login bug', done: false },
  { text: 'Deploy to staging', done: true },
  { text: 'Team standup meeting', done: false },
];

const notifications = [
  { text: 'New user registered', time: '2 min ago', color: 'primary.main' },
  { text: 'Server CPU at 90%', time: '15 min ago', color: 'warning.main' },
  { text: 'Payment received $1,200', time: '1 hour ago', color: 'success.main' },
  { text: 'Deployment completed', time: '3 hours ago', color: 'secondary.main' },
];

export default function WidgetsPage() {
  const [todoList, setTodoList] = useState(todos);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (i: number) => {
    const updated = [...todoList];
    updated[i] = { ...updated[i], done: !updated[i].done };
    setTodoList(updated);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodoList([...todoList, { text: newTodo, done: false }]);
    setNewTodo('');
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Widgets</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Revenue" value="$52,680" change="12.5%" changeType="up" icon={<AttachMoney sx={{ color: 'primary.main' }} />} bgColor="primary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Orders" value="1,240" change="8.2%" changeType="up" icon={<ShoppingCart sx={{ color: 'secondary.main' }} />} bgColor="secondary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Customers" value="4,520" change="3.1%" changeType="up" icon={<People sx={{ color: 'success.main' }} />} bgColor="success.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Growth" value="24.8%" change="2.4%" changeType="down" icon={<TrendingUp sx={{ color: 'warning.main' }} />} bgColor="#fde8e2" />
        </Grid>

        {/* Profile Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 700 }}>JD</Avatar>
            <Typography variant="h6" fontWeight={700}>John Doe</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Senior Developer</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
              <Box><Typography variant="h6" fontWeight={700}>152</Typography><Typography variant="caption" color="text.secondary">Posts</Typography></Box>
              <Box><Typography variant="h6" fontWeight={700}>12.5k</Typography><Typography variant="caption" color="text.secondary">Followers</Typography></Box>
              <Box><Typography variant="h6" fontWeight={700}>842</Typography><Typography variant="caption" color="text.secondary">Following</Typography></Box>
            </Box>
            <Button variant="contained" fullWidth>Follow</Button>
          </Card>
        </Grid>

        {/* Weather Widget */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', bgcolor: 'primary.main', color: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>New York, US</Typography>
                <Typography variant="h2" fontWeight={700} my={1}>24°C</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Partly Cloudy</Typography>
              </Box>
              <WbSunny sx={{ fontSize: 64, opacity: 0.9 }} />
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                <Box key={d} sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>{d}</Typography>
                  <Cloud sx={{ fontSize: 20, display: 'block', mx: 'auto', my: 0.5 }} />
                  <Typography variant="caption">{22 - i}°</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Todo Widget */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Todo List</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField size="small" placeholder="Add task..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()} fullWidth />
              <IconButton onClick={addTodo} color="primary" sx={{ bgcolor: 'primary.light' }}><Add /></IconButton>
            </Box>
            <List dense>
              {todoList.map((t, i) => (
                <ListItem key={i} disablePadding secondaryAction={<IconButton size="small" onClick={() => setTodoList(todoList.filter((_, j) => j !== i))}><Close fontSize="small" /></IconButton>}>
                  <FormControlLabel control={<Checkbox checked={t.done} onChange={() => toggleTodo(i)} size="small" />}
                    label={<Typography variant="body2" sx={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'text.disabled' : 'text.primary' }}>{t.text}</Typography>}
                    sx={{ flex: 1, mx: 0 }} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Notification Timeline */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Recent Notifications</Typography>
            <List>
              {notifications.map((n, i) => (
                <ListItem key={i} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: n.color, opacity: 0.15 }}>
                      <CheckCircle sx={{ color: n.color, opacity: 1 }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<Typography variant="body2" fontWeight={500}>{n.text}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{n.time}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Progress Widget */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Project Progress</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                { name: 'Website Redesign', progress: 85 },
                { name: 'Mobile App', progress: 62 },
                { name: 'API Integration', progress: 95 },
                { name: 'Database Migration', progress: 40 },
              ].map(p => (
                <Box key={p.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>{p.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>{p.progress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={p.progress} sx={{ height: 8, borderRadius: 4, bgcolor: 'var(--bg-body)', '& .MuiLinearProgress-bar': { borderRadius: 4 } }} />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
