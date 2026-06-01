'use client';

import { useState, useMemo } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Chip, IconButton, TablePagination, TextField, InputAdornment, TableSortLabel,
} from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';

type SortKey = 'name' | 'email' | 'role' | 'status';
type SortDir = 'asc' | 'desc';

const allRows = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', joined: '2024-02-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', joined: '2024-01-10' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joined: '2024-03-05' },
  { id: 5, name: 'Eve Williams', email: 'eve@example.com', role: 'Editor', status: 'pending', joined: '2024-02-28' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'active', joined: '2024-01-22' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'active', joined: '2024-03-12' },
  { id: 8, name: 'Henry Davis', email: 'henry@example.com', role: 'Editor', status: 'inactive', joined: '2024-02-14' },
  { id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Viewer', status: 'active', joined: '2024-01-30' },
  { id: 10, name: 'Jack Wilson', email: 'jack@example.com', role: 'Admin', status: 'active', joined: '2024-03-18' },
  { id: 11, name: 'Karen White', email: 'karen@example.com', role: 'Editor', status: 'pending', joined: '2024-02-05' },
  { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Viewer', status: 'active', joined: '2024-01-25' },
  { id: 13, name: 'Mia Taylor', email: 'mia@example.com', role: 'Admin', status: 'active', joined: '2024-03-22' },
  { id: 14, name: 'Noah Garcia', email: 'noah@example.com', role: 'Editor', status: 'inactive', joined: '2024-02-18' },
  { id: 15, name: 'Olivia Brown', email: 'olivia@example.com', role: 'Viewer', status: 'active', joined: '2024-03-01' },
];

const statusColors: Record<string, 'success' | 'error' | 'warning'> = { active: 'success', inactive: 'error', pending: 'warning' };

export default function DataGridPage() {
  const [page, setPage] = useState(0);
  const [rpp, setRpp] = useState(10);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    setSortDir(sortKey === key && sortDir === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  const filtered = useMemo(() => {
    let data = [...allRows];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.role.toLowerCase().includes(q));
    }
    data.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return data;
  }, [search, sortKey, sortDir]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Data Grid</Typography>
      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <TextField size="small" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            sx={{ minWidth: 250 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
          />
        </Box>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'var(--bg-body)' }}>
                {(['name', 'email', 'role', 'status'] as SortKey[]).map(key => (
                  <TableCell key={key} sx={{ fontWeight: 600 }}>
                    <TableSortLabel active={sortKey === key} direction={sortDir} onClick={() => handleSort(key)}
                      sx={{ textTransform: 'capitalize' }}>{key}</TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Joined</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * rpp, page * rpp + rpp).map(row => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.7rem', fontWeight: 600 }}>
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell><Chip label={row.status} size="small" color={statusColors[row.status]} sx={{ textTransform: 'capitalize', fontWeight: 500, height: 24, fontSize: '0.7rem' }} /></TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, color: 'text.secondary' }}>{row.joined}</TableCell>
                  <TableCell>
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rpp} onRowsPerPageChange={(e) => { setRpp(parseInt(e.target.value)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]} />
      </Card>
    </Box>
  );
}
