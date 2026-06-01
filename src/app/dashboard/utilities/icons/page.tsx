'use client';

import { Box, Typography, Card, Grid } from '@mui/material';
import {
  Home, Settings, Person, Email, Notifications, ShoppingCart,
  Favorite, Star, Search, Add, Delete, Edit, Share, Download,
  Upload, Lock, CalendarToday, LocationOn, Phone, ChatBubble,
  Dashboard, BarChart, TableChart, Description,
} from '@mui/icons-material';

const icons = [
  { icon: <Home />, name: 'Home' }, { icon: <Settings />, name: 'Settings' },
  { icon: <Person />, name: 'Person' }, { icon: <Email />, name: 'Email' },
  { icon: <Notifications />, name: 'Notifications' }, { icon: <ShoppingCart />, name: 'ShoppingCart' },
  { icon: <Favorite />, name: 'Favorite' }, { icon: <Star />, name: 'Star' },
  { icon: <Search />, name: 'Search' }, { icon: <Add />, name: 'Add' },
  { icon: <Delete />, name: 'Delete' }, { icon: <Edit />, name: 'Edit' },
  { icon: <Share />, name: 'Share' }, { icon: <Download />, name: 'Download' },
  { icon: <Upload />, name: 'Upload' }, { icon: <Lock />, name: 'Lock' },
  { icon: <CalendarToday />, name: 'Calendar' }, { icon: <LocationOn />, name: 'Location' },
  { icon: <Phone />, name: 'Phone' }, { icon: <ChatBubble />, name: 'Chat' },
  { icon: <Dashboard />, name: 'Dashboard' }, { icon: <BarChart />, name: 'BarChart' },
  { icon: <TableChart />, name: 'Table' }, { icon: <Description />, name: 'Document' },
];

export default function IconsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Icons</Typography>
      <Grid container spacing={2}>
        {icons.map((item) => (
          <Grid item xs={4} sm={3} md={2} key={item.name}>
            <Card sx={{ p: 2, borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'all 0.2s', '&:hover': { bgcolor: 'primary.light', transform: 'translateY(-2px)' }, cursor: 'pointer' }}>
              <Box sx={{ color: 'text.primary', mb: 1 }}>{item.icon}</Box>
              <Typography variant="caption" color="text.secondary">{item.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
