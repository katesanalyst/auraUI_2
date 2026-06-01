'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Grid, TextField, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, Divider, MenuItem,
} from '@mui/material';
import { Add, Delete, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

type LineItem = { id: number; desc: string; qty: number; price: number };

export default function InvoiceCreatePage() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, desc: '', qty: 1, price: 0 },
  ]);

  const addItem = () => setItems((p) => [...p, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  const removeItem = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Button startIcon={<ArrowBack />} component={Link} href="/dashboard/apps/invoice/list" variant="outlined" size="small" sx={{ mb: 1 }}>
            Back
          </Button>
          <Typography variant="h4" fontWeight={700}>Create Invoice</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined">Save Draft</Button>
          <Button variant="contained">Send Invoice</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', mb: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Invoice Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Invoice Number" defaultValue="INV-011" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Status" select defaultValue="Draft" size="small">
                {['Draft', 'Pending', 'Paid', 'Overdue'].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Issue Date" type="date" size="small" slotProps={{ inputLabel: { shrink: true } }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Due Date" type="date" size="small" slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', mb: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Bill To</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Client Name" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email" type="email" size="small" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Address" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="City" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Country" size="small" /></Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Line Items</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, fontSize: '0.75rem' } }}>
                  <TableCell>Description</TableCell>
                  <TableCell align="center" sx={{ width: 80 }}>Qty</TableCell>
                  <TableCell align="right" sx={{ width: 120 }}>Unit Price</TableCell>
                  <TableCell align="right" sx={{ width: 120 }}>Total</TableCell>
                  <TableCell sx={{ width: 40 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TextField fullWidth size="small" placeholder="Item description" variant="standard"
                        value={item.desc} onChange={(e) => updateItem(item.id, 'desc', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" type="number" variant="standard" inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        value={item.qty} onChange={(e) => updateItem(item.id, 'qty', +e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" type="number" variant="standard" inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        value={item.price} onChange={(e) => updateItem(item.id, 'price', +e.target.value)} />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>${(item.qty * item.price).toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="error" onClick={() => removeItem(item.id)} disabled={items.length === 1}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button startIcon={<Add />} size="small" onClick={addItem} sx={{ mt: 1.5 }}>Add Item</Button>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ minWidth: 220 }}>
                {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Tax (6%)', `$${tax.toFixed(2)}`]].map(([k, v]) => (
                  <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">{k}</Typography>
                    <Typography variant="body2" fontWeight={600}>{v}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 0.75 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight={700}>Total</Typography>
                  <Typography fontWeight={800} color="primary.main">${total.toFixed(2)}</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', mb: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Payment Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Bank Name" size="small" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Account Number" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Routing Number" size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Swift Code" size="small" /></Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Notes</Typography>
            <TextField fullWidth multiline rows={4} placeholder="Add a note or payment terms…" size="small" />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
