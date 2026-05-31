'use client';

import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
} from '@mui/material';

interface Transaction {
  id: string;
  name: string;
  avatar: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: '1', avatar: 'JD', name: 'John Doe', date: 'Jan 12, 2024', amount: '$1,200', status: 'completed' },
  { id: '2', avatar: 'AS', name: 'Alice Smith', date: 'Jan 15, 2024', amount: '$850', status: 'pending' },
  { id: '3', avatar: 'BJ', name: 'Bob Johnson', date: 'Jan 18, 2024', amount: '$2,400', status: 'completed' },
  { id: '4', avatar: 'EW', name: 'Emma Wilson', date: 'Jan 20, 2024', amount: '$560', status: 'failed' },
  { id: '5', avatar: 'MB', name: 'Mike Brown', date: 'Jan 22, 2024', amount: '$1,800', status: 'completed' },
];

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
};

export default function RecentTransactions() {
  return (
    <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Recent Transactions
      </Typography>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, borderColor: 'var(--border)' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, borderColor: 'var(--border)' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, borderColor: 'var(--border)' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600, borderColor: 'var(--border)' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ borderColor: 'var(--border)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: '10px',
                      }}
                    >
                      {tx.avatar}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {tx.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderColor: 'var(--border)', color: 'text.secondary' }}>
                  {tx.date}
                </TableCell>
                <TableCell sx={{ borderColor: 'var(--border)', fontWeight: 600 }}>
                  {tx.amount}
                </TableCell>
                <TableCell sx={{ borderColor: 'var(--border)' }}>
                  <Chip
                    label={tx.status}
                    size="small"
                    color={statusColors[tx.status]}
                    sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
