'use client';

import {
  Box, Typography, Card, Divider, Button, Grid, Table,
  TableBody, TableCell, TableHead, TableRow, Chip,
} from '@mui/material';
import { Print, Download, Edit, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

const LINE_ITEMS = [
  { desc: 'UI/UX Design — Dashboard Redesign',  qty: 1, unit: '$4,500.00', total: '$4,500.00' },
  { desc: 'Frontend Development (40 hrs)',       qty: 40, unit: '$85.00',   total: '$3,400.00' },
  { desc: 'Backend API Integration',             qty: 1, unit: '$2,200.00', total: '$2,200.00' },
  { desc: 'QA Testing & Bug Fixes',              qty: 1, unit: '$800.00',   total: '$800.00' },
];
const subtotal = '$10,900.00';
const tax = '$654.00';
const total = '$11,554.00';

export default function InvoiceDetailPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBack />} component={Link} href="/dashboard/apps/invoice/list" variant="outlined" size="small">
          Back to List
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<Edit />} variant="outlined" size="small" component={Link} href="/dashboard/apps/invoice/create">Edit</Button>
          <Button startIcon={<Print />} variant="outlined" size="small">Print</Button>
          <Button startIcon={<Download />} variant="contained" size="small">Download PDF</Button>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', p: { xs: 3, sm: 5 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>S</Typography>
            </Box>
            <Typography variant="h5" fontWeight={800}>Spike Admin</Typography>
            <Typography variant="body2" color="text.secondary">45 Innovation Drive, Tech Park</Typography>
            <Typography variant="body2" color="text.secondary">San Francisco, CA 94105</Typography>
            <Typography variant="body2" color="text.secondary">billing@spikeadmin.com</Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: { xs: 'flex-start', sm: 'flex-end' }, mb: 1 }}>
              <Typography variant="h4" fontWeight={800} color="primary.main">INV-001</Typography>
              <Chip label="Paid" color="success" size="small" sx={{ fontWeight: 700 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">Issue Date: <strong>Dec 1, 2024</strong></Typography>
            <Typography variant="body2" color="text.secondary">Due Date: <strong>Dec 31, 2024</strong></Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Bill To / From */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.disabled" fontWeight={700} letterSpacing={1.2}>Bill To</Typography>
            <Typography variant="body1" fontWeight={700} mt={1}>Acme Corporation</Typography>
            <Typography variant="body2" color="text.secondary">Attn: John Smith, CFO</Typography>
            <Typography variant="body2" color="text.secondary">100 Market Street, Suite 300</Typography>
            <Typography variant="body2" color="text.secondary">New York, NY 10001</Typography>
            <Typography variant="body2" color="text.secondary">accounts@acmecorp.com</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.disabled" fontWeight={700} letterSpacing={1.2}>Payment Info</Typography>
            <Box sx={{ mt: 1 }}>
              {[['Bank', 'First National Bank'], ['Account', '****4821'], ['Routing', '021000021'], ['Swift', 'FNBKUS33']].map(([k, v]) => (
                <Box key={k} sx={{ display: 'flex', gap: 1, mb: 0.25 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>{k}:</Typography>
                  <Typography variant="body2" fontWeight={600}>{v}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Line Items */}
        <Table sx={{ mb: 3 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'action.hover', fontSize: '0.75rem' } }}>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LINE_ITEMS.map((item) => (
              <TableRow key={item.desc}>
                <TableCell><Typography variant="body2">{item.desc}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{item.qty}</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2">{item.unit}</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2" fontWeight={600}>{item.total}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Totals */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ minWidth: 240 }}>
            {[['Subtotal', subtotal], ['Tax (6%)', tax]].map(([k, v]) => (
              <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant="body2" color="text.secondary">{k}</Typography>
                <Typography variant="body2" fontWeight={600}>{v}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" fontWeight={700}>Total</Typography>
              <Typography variant="body1" fontWeight={800} color="primary.main">{total}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> Payment is due within 30 days of invoice date. Late payments may be subject to a 1.5% monthly fee.
          Thank you for your business!
        </Typography>
      </Card>
    </Box>
  );
}
