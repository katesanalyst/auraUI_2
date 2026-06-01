'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, InputAdornment, Chip, IconButton,
  MenuItem, Select, FormControl, InputLabel, Avatar, Tooltip,
  useMediaQuery, useTheme, Grid, TablePagination,
} from '@mui/material';
import {
  Search, Visibility, Edit, Delete, FilterList,
} from '@mui/icons-material';

type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
type TicketPriority = 'High' | 'Medium' | 'Low';
type TicketChannel = 'Email' | 'Chat' | 'Phone' | 'Social';

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  avatar: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  assignee: string;
  created: string;
  updated: string;
}

const tickets: Ticket[] = [
  { id: 'TKT-1001', subject: 'Login page returns 500 error', customer: 'Sarah Johnson', avatar: 'SJ', status: 'Open', priority: 'High', channel: 'Email', assignee: 'John Doe', created: '2024-12-20', updated: '2024-12-23' },
  { id: 'TKT-1002', subject: 'Cannot reset password', customer: 'Mike Chen', avatar: 'MC', status: 'In Progress', priority: 'High', channel: 'Chat', assignee: 'Alice Smith', created: '2024-12-19', updated: '2024-12-23' },
  { id: 'TKT-1003', subject: 'Invoice PDF not generating', customer: 'Emma Wilson', avatar: 'EW', status: 'Open', priority: 'Medium', channel: 'Phone', assignee: 'Bob Johnson', created: '2024-12-18', updated: '2024-12-22' },
  { id: 'TKT-1004', subject: 'Feature request: dark mode', customer: 'James Lee', avatar: 'JL', status: 'Closed', priority: 'Low', channel: 'Social', assignee: 'John Doe', created: '2024-12-15', updated: '2024-12-20' },
  { id: 'TKT-1005', subject: 'Dashboard loading slowly', customer: 'Lisa Park', avatar: 'LP', status: 'In Progress', priority: 'Medium', channel: 'Email', assignee: 'Alice Smith', created: '2024-12-17', updated: '2024-12-23' },
  { id: 'TKT-1006', subject: 'Payment gateway timeout', customer: 'David Kim', avatar: 'DK', status: 'Open', priority: 'High', channel: 'Chat', assignee: 'Bob Johnson', created: '2024-12-22', updated: '2024-12-23' },
  { id: 'TKT-1007', subject: 'Mobile app crashes on launch', customer: 'Rachel Green', avatar: 'RG', status: 'Resolved', priority: 'High', channel: 'Phone', assignee: 'John Doe', created: '2024-12-14', updated: '2024-12-19' },
  { id: 'TKT-1008', subject: 'Email notifications not sent', customer: 'Tom Brady', avatar: 'TB', status: 'Open', priority: 'Medium', channel: 'Email', assignee: 'Alice Smith', created: '2024-12-21', updated: '2024-12-23' },
  { id: 'TKT-1009', subject: 'Search results incorrect', customer: 'Nina Patel', avatar: 'NP', status: 'Resolved', priority: 'Low', channel: 'Social', assignee: 'Bob Johnson', created: '2024-12-13', updated: '2024-12-18' },
  { id: 'TKT-1010', subject: 'Cannot upload files > 10MB', customer: 'Chris Wu', avatar: 'CW', status: 'In Progress', priority: 'Medium', channel: 'Chat', assignee: 'John Doe', created: '2024-12-16', updated: '2024-12-22' },
  { id: 'TKT-1011', subject: 'Two-factor auth not working', customer: 'Amy Liu', avatar: 'AL', status: 'Open', priority: 'High', channel: 'Email', assignee: 'Alice Smith', created: '2024-12-23', updated: '2024-12-23' },
  { id: 'TKT-1012', subject: 'Export CSV missing columns', customer: 'Ryan Moss', avatar: 'RM', status: 'Closed', priority: 'Low', channel: 'Phone', assignee: 'Bob Johnson', created: '2024-12-10', updated: '2024-12-15' },
];

const statusColor: Record<TicketStatus, 'warning' | 'info' | 'success' | 'default'> = {
  'Open': 'warning',
  'In Progress': 'info',
  'Resolved': 'success',
  'Closed': 'default',
};

const priorityColor: Record<TicketPriority, 'error' | 'warning' | 'success'> = {
  'High': 'error',
  'Medium': 'warning',
  'Low': 'success',
};

export default function TicketListPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [channelFilter, setChannelFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const filtered = tickets.filter((t) => {
    const matchSearch = !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || t.status === statusFilter;
    const matchPriority = !priorityFilter || t.priority === priorityFilter;
    const matchChannel = !channelFilter || t.channel === channelFilter;
    return matchSearch && matchStatus && matchPriority && matchChannel;
  });

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Ticket List</Typography>
        <Typography variant="body2" color="text.secondary">Manage and track all support tickets</Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ p: 2, mb: 3, borderRadius: 'var(--radius-lg)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              placeholder="Search tickets..."
              fullWidth
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select value={priorityFilter} label="Priority" onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Channel</InputLabel>
              <Select value={channelFilter} label="Channel" onChange={(e) => { setChannelFilter(e.target.value); setPage(0); }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Chat">Chat</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="body2" color="text.secondary" textAlign={{ xs: 'left', md: 'right' }}>
              {filtered.length} ticket{filtered.length !== 1 ? 's' : ''}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Table */}
      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Subject</TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Customer</TableCell>}
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Priority</TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Channel</TableCell>}
                {!isMobile && <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Assignee</TableCell>}
                {!isMobile && <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Updated</TableCell>}
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((ticket) => (
                <TableRow key={ticket.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary.main">{ticket.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 250 }}>{ticket.subject}</Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', bgcolor: 'primary.light', color: 'primary.main' }}>{ticket.avatar}</Avatar>
                        <Typography variant="body2">{ticket.customer}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell>
                    <Chip label={ticket.status} size="small" color={statusColor[ticket.status]} variant="outlined" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={ticket.priority} size="small" color={priorityColor[ticket.priority]} variant="filled" sx={{ fontWeight: 600, fontSize: '0.7rem', color: '#fff' }} />
                  </TableCell>
                  {!isMobile && <TableCell><Typography variant="body2">{ticket.channel}</Typography></TableCell>}
                  {!isMobile && <TableCell><Typography variant="body2">{ticket.assignee}</Typography></TableCell>}
                  {!isMobile && <TableCell><Typography variant="body2" color="text.secondary">{ticket.updated}</Typography></TableCell>}
                  <TableCell align="right">
                    <Tooltip title="View"><IconButton size="small" color="primary"><Visibility fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Edit"><IconButton size="small" color="info"><Edit fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No tickets found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 8, 15, 25]}
        />
      </Card>
    </Box>
  );
}
