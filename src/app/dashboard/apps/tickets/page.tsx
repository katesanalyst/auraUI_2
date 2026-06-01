'use client';

import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Avatar, useMediaQuery, useTheme, Grid,
} from '@mui/material';

const tickets = [
  { id: 'TKT-001', subject: 'Login page not loading on Safari', status: 'open', priority: 'high', assignee: 'John Doe', avatar: 'JD', date: 'May 28, 2026' },
  { id: 'TKT-002', subject: 'Dashboard chart tooltip misaligned', status: 'pending', priority: 'medium', assignee: 'Alice Smith', avatar: 'AS', date: 'May 27, 2026' },
  { id: 'TKT-003', subject: 'Email notifications not sending', status: 'open', priority: 'high', assignee: 'Bob Johnson', avatar: 'BJ', date: 'May 26, 2026' },
  { id: 'TKT-004', subject: 'Mobile sidebar overlaps content', status: 'closed', priority: 'low', assignee: 'Emma Wilson', avatar: 'EW', date: 'May 25, 2026' },
  { id: 'TKT-005', subject: 'CSV export broken for large datasets', status: 'pending', priority: 'medium', assignee: 'Mike Brown', avatar: 'MB', date: 'May 24, 2026' },
  { id: 'TKT-006', subject: 'User avatar not displaying', status: 'closed', priority: 'low', assignee: 'Sarah Davis', avatar: 'SD', date: 'May 23, 2026' },
];

const statusColors: Record<string, 'warning' | 'info' | 'success'> = {
  open: 'warning',
  pending: 'info',
  closed: 'success',
};

const priorityColors: Record<string, 'error' | 'warning' | 'default'> = {
  high: 'error',
  medium: 'warning',
  low: 'default',
};

export default function TicketsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Tickets</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Support ticket management</Typography>

      {isMobile ? (
        <Grid container spacing={2}>
          {tickets.map((t) => (
            <Grid item xs={12} key={t.id}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="primary" fontWeight={600}>{t.id}</Typography>
                  <Chip label={t.status} size="small" color={statusColors[t.status]} />
                </Box>
                <Typography variant="body2" fontWeight={600} mb={1}>{t.subject}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.6rem', fontWeight: 600 }}>{t.avatar}</Avatar>
                    <Typography variant="caption">{t.assignee}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={t.priority} size="small" color={priorityColors[t.priority]} variant="outlined" sx={{ height: 20, fontSize: '0.6rem' }} />
                    <Typography variant="caption" color="text.disabled">{t.date}</Typography>
                  </Box>
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
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell><Typography variant="body2" color="primary" fontWeight={600}>{t.id}</Typography></TableCell>
                    <TableCell><Typography variant="body2" fontWeight={500}>{t.subject}</Typography></TableCell>
                    <TableCell><Chip label={t.status} size="small" color={statusColors[t.status]} sx={{ textTransform: 'capitalize' }} /></TableCell>
                    <TableCell><Chip label={t.priority} size="small" color={priorityColors[t.priority]} variant="outlined" sx={{ textTransform: 'capitalize' }} /></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.65rem', fontWeight: 600, borderRadius: '8px' }}>{t.avatar}</Avatar>
                        <Typography variant="body2">{t.assignee}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{t.date}</Typography></TableCell>
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
