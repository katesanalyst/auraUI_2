'use client';

import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Chip, IconButton, TablePagination,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useState } from 'react';

const rows = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
  { id: 5, name: 'Eve Williams', email: 'eve@example.com', role: 'Editor', status: 'pending' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'active' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'active' },
  { id: 8, name: 'Henry Davis', email: 'henry@example.com', role: 'Editor', status: 'inactive' },
];

const statusColors: Record<string, 'success' | 'error' | 'warning'> = { active: 'success', inactive: 'error', pending: 'warning' };

export default function BasicTablePage() {
  const [page, setPage] = useState(0);
  const rpp = 5;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Basic Table</Typography>
      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'var(--bg-body)' }}>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rpp, page * rpp + rpp).map((row, i) => (
                <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { bgcolor: 'rgba(0,0,0,0.015)' }, '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.8rem', fontWeight: 600 }}>
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'text.secondary' }}>{row.email}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{row.role}</TableCell>
                  <TableCell><Chip label={row.status} size="small" color={statusColors[row.status]} sx={{ textTransform: 'capitalize', fontWeight: 500 }} /></TableCell>
                  <TableCell>
                    <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={rows.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rpp} rowsPerPageOptions={[5]} />
      </Card>
    </Box>
  );
}
