'use client';

import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Avatar, IconButton, Button, TextField,
  InputAdornment, TablePagination,
} from '@mui/material';
import { Search, Add, Visibility, Edit, Delete, Receipt } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_COLOR: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  Paid: 'success', Pending: 'warning', Overdue: 'error', Draft: 'default',
};

const INVOICES = [
  { id: 'INV-001', client: 'Acme Corp',        avatar: 'AC', color: '#0085db', amount: '$4,250.00', date: 'Dec 1, 2024',  due: 'Dec 31, 2024', status: 'Paid' },
  { id: 'INV-002', client: 'TechVision Ltd',    avatar: 'TV', color: '#39b69a', amount: '$1,890.00', date: 'Dec 5, 2024',  due: 'Jan 4, 2025',  status: 'Pending' },
  { id: 'INV-003', client: 'Global Retail Inc', avatar: 'GR', color: '#7C3AED', amount: '$9,120.00', date: 'Nov 20, 2024', due: 'Dec 20, 2024', status: 'Overdue' },
  { id: 'INV-004', client: 'Nova Startup',      avatar: 'NS', color: '#fb977d', amount: '$650.00',   date: 'Dec 8, 2024',  due: 'Jan 7, 2025',  status: 'Draft' },
  { id: 'INV-005', client: 'BlueWave Agency',   avatar: 'BW', color: '#46caeb', amount: '$3,400.00', date: 'Dec 10, 2024', due: 'Jan 9, 2025',  status: 'Paid' },
  { id: 'INV-006', client: 'Sunrise Media',     avatar: 'SM', color: '#f0c040', amount: '$2,100.00', date: 'Dec 12, 2024', due: 'Jan 11, 2025', status: 'Pending' },
  { id: 'INV-007', client: 'PinPoint Analytics',avatar: 'PA', color: '#0085db', amount: '$5,800.00', date: 'Nov 25, 2024', due: 'Dec 25, 2024', status: 'Overdue' },
  { id: 'INV-008', client: 'Crescent Foods',    avatar: 'CF', color: '#39b69a', amount: '$780.00',   date: 'Dec 14, 2024', due: 'Jan 13, 2025', status: 'Draft' },
  { id: 'INV-009', client: 'Orbit Software',    avatar: 'OS', color: '#7C3AED', amount: '$12,450.00',date: 'Dec 2, 2024',  due: 'Jan 1, 2025',  status: 'Paid' },
  { id: 'INV-010', client: 'Desert Wind Co',    avatar: 'DW', color: '#fb977d', amount: '$920.00',   date: 'Dec 15, 2024', due: 'Jan 14, 2025', status: 'Pending' },
];

const SUMMARY = [
  { label: 'Total Invoiced', value: '$41,360', color: 'primary.main',  bg: 'primary.light' },
  { label: 'Paid',           value: '$26,200', color: 'success.main',  bg: 'success.light' },
  { label: 'Pending',        value: '$8,290',  color: 'warning.main',  bg: 'warning.light' },
  { label: 'Overdue',        value: '$15,920', color: 'error.main',    bg: 'error.light' },
];

export default function InvoiceListPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  const filtered = INVOICES.filter(
    (inv) =>
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Invoices</Typography>
          <Typography variant="body2" color="text.secondary">Manage and track all invoices</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} component={Link} href="/dashboard/apps/invoice/create">
          New Invoice
        </Button>
      </Box>

      {/* Summary */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2.5, mb: 3 }}>
        {SUMMARY.map(({ label, value, color, bg }) => (
          <Card key={label} sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
              <Receipt sx={{ color, fontSize: 20 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color }}>{value}</Typography>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
          </Card>
        ))}
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>All Invoices</Typography>
          <TextField
            size="small" placeholder="Search invoices…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> } }}
            sx={{ width: 220 }}
          />
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'action.hover', fontSize: '0.75rem' } }}>
                <TableCell>Invoice</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inv) => (
                <TableRow key={inv.id} hover sx={{ '& td': { fontSize: '0.8rem' } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary.main">{inv.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 30, height: 30, fontSize: '0.65rem', bgcolor: inv.color, borderRadius: '8px' }}>{inv.avatar}</Avatar>
                      <Typography variant="body2" fontWeight={500}>{inv.client}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2" fontWeight={700}>{inv.amount}</Typography></TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.due}</TableCell>
                  <TableCell>
                    <Chip label={inv.status} size="small" color={STATUS_COLOR[inv.status]}
                      sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" component={Link} href="/dashboard/apps/invoice/detail"><Visibility sx={{ fontSize: 16 }} /></IconButton>
                    <IconButton size="small" component={Link} href="/dashboard/apps/invoice/create"><Edit sx={{ fontSize: 16 }} /></IconButton>
                    <IconButton size="small" color="error"><Delete sx={{ fontSize: 16 }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div" count={filtered.length} page={page}
          onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[7]} sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Card>
    </Box>
  );
}
