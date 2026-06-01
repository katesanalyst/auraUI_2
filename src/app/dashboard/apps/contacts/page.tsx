'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Avatar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, InputAdornment,
  IconButton, Chip, useMediaQuery, useTheme, Grid,
} from '@mui/material';
import { Search, Edit, Delete, Email, Phone } from '@mui/icons-material';

const contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-5678', role: 'Admin', status: 'active', avatar: 'JD' },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com', phone: '+1 345-6789', role: 'Editor', status: 'active', avatar: 'AS' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 456-7890', role: 'Viewer', status: 'inactive', avatar: 'BJ' },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 567-8901', role: 'Editor', status: 'active', avatar: 'EW' },
  { id: 5, name: 'Mike Brown', email: 'mike@example.com', phone: '+1 678-9012', role: 'Admin', status: 'active', avatar: 'MB' },
  { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', phone: '+1 789-0123', role: 'Viewer', status: 'inactive', avatar: 'SD' },
  { id: 7, name: 'Tom Wilson', email: 'tom@example.com', phone: '+1 890-1234', role: 'Editor', status: 'active', avatar: 'TW' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 901-2345', role: 'Admin', status: 'active', avatar: 'LA' },
];

export default function ContactsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Contacts</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Manage your contacts</Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: 360 }}
        />
      </Box>

      {isMobile ? (
        <Grid container spacing={2}>
          {filtered.map((c) => (
            <Grid item xs={12} sm={6} key={c.id}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', borderRadius: '12px', fontWeight: 600 }}>{c.avatar}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{c.role}</Typography>
                  </Box>
                  <Chip label={c.status} size="small" color={c.status === 'active' ? 'success' : 'default'} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Email fontSize="small" color="action" /><Typography variant="caption">{c.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" color="action" /><Typography variant="caption">{c.phone}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', color: 'primary.main', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>{c.avatar}</Avatar>
                        <Typography variant="body2" fontWeight={500}>{c.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell><Chip label={c.role} size="small" variant="outlined" /></TableCell>
                    <TableCell><Chip label={c.status} size="small" color={c.status === 'active' ? 'success' : 'default'} /></TableCell>
                    <TableCell>
                      <IconButton size="small"><Edit fontSize="small" /></IconButton>
                      <IconButton size="small"><Delete fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}
