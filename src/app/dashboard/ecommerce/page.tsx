'use client';

import { useState } from 'react';
import { Grid, Box, Typography, Card, Avatar, Chip, LinearProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  AttachMoney,
  ShoppingCart,
  People,
  TrendingUp,
  LocalOffer,
  Star,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const topProducts = [
  { name: 'iPhone 15 Pro Max', category: 'Electronics', price: '$1,199', sold: 234, revenue: '$280,566', rating: 4.8 },
  { name: 'MacBook Pro M3', category: 'Laptops', price: '$2,499', sold: 156, revenue: '$389,844', rating: 4.9 },
  { name: 'AirPods Pro 2', category: 'Audio', price: '$249', sold: 521, revenue: '$129,729', rating: 4.7 },
  { name: 'iPad Air', category: 'Tablets', price: '$599', sold: 189, revenue: '$113,211', rating: 4.6 },
  { name: 'Apple Watch Ultra', category: 'Wearables', price: '$799', sold: 98, revenue: '$78,302', rating: 4.5 },
];

const orderStatus = [
  { label: 'Delivered', value: 65, color: '#39b69a' },
  { label: 'Processing', value: 20, color: '#0085db' },
  { label: 'Shipped', value: 10, color: '#46caeb' },
  { label: 'Cancelled', value: 5, color: '#fb977d' },
];

export default function EcommercePage() {
  const [period, setPeriod] = useState('monthly');

  const pieOptions: ApexCharts.ApexOptions = {
    chart: { type: 'donut', fontFamily: "'Plus Jakarta Sans', sans-serif" },
    colors: orderStatus.map(s => s.color),
    labels: orderStatus.map(s => s.label),
    plotOptions: { pie: { donut: { size: '70%' } } },
    legend: { position: 'bottom', fontSize: '13px' },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  const pieSeries = orderStatus.map(s => s.value);

  const revenueOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    colors: ['#0085db', '#46caeb'],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
    grid: { borderColor: '#e5eaef', strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#8a929a', fontSize: '12px' } },
      axisBorder: { show: false },
    },
    yaxis: { labels: { style: { colors: '#8a929a', fontSize: '12px' }, formatter: v => `$${v}k` } },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const revenueSeries = [
    { name: 'Revenue', data: [44, 55, 41, 67, 22, 43, 65] },
    { name: 'Last Week', data: [35, 41, 36, 52, 18, 35, 50] },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h4" fontWeight={700}>eCommerce Dashboard</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select value={period} onChange={e => setPeriod(e.target.value)} sx={{ borderRadius: 'var(--radius-xl)' }}>
            <MenuItem value="weekly">This Week</MenuItem>
            <MenuItem value="monthly">This Month</MenuItem>
            <MenuItem value="yearly">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total Revenue" value="$89,400" change="14.2%" changeType="up" icon={<AttachMoney sx={{ color: 'primary.main' }} />} bgColor="primary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total Orders" value="2,845" change="9.5%" changeType="up" icon={<ShoppingCart sx={{ color: 'secondary.main' }} />} bgColor="secondary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="New Customers" value="1,240" change="5.3%" changeType="up" icon={<People sx={{ color: 'success.main' }} />} bgColor="success.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Conversion Rate" value="3.24%" change="0.8%" changeType="down" icon={<TrendingUp sx={{ color: 'warning.main' }} />} bgColor="#fde8e2" />
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Weekly Revenue</Typography>
            <Chart options={revenueOptions} series={revenueSeries} type="bar" height={300} />
          </Card>
        </Grid>

        {/* Order Status */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Order Status</Typography>
            <Chart options={pieOptions} series={pieSeries} type="donut" height={280} />
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'auto' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Top Selling Products</Typography>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <Box component="thead">
                <Box component="tr" sx={{ borderBottom: '1px solid var(--border)' }}>
                  {['Product', 'Category', 'Price', 'Sold', 'Revenue', 'Rating'].map(h => (
                    <Box key={h} component="th" sx={{ textAlign: 'left', p: 1.5, fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>{h}</Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {topProducts.map((p, i) => (
                  <Box key={i} component="tr" sx={{ borderBottom: '1px solid var(--border)', '&:last-child': { border: 0 } }}>
                    <Box component="td" sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light', borderRadius: '10px' }}>
                          <LocalOffer sx={{ fontSize: 18, color: 'primary.main' }} />
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>{p.name}</Typography>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ p: 1.5, fontSize: '0.8rem', color: 'text.secondary' }}>{p.category}</Box>
                    <Box component="td" sx={{ p: 1.5, fontWeight: 600, fontSize: '0.8rem' }}>{p.price}</Box>
                    <Box component="td" sx={{ p: 1.5, fontSize: '0.8rem' }}>{p.sold}</Box>
                    <Box component="td" sx={{ p: 1.5, fontWeight: 600, fontSize: '0.8rem' }}>{p.revenue}</Box>
                    <Box component="td" sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ fontSize: 16, color: '#fb977d' }} />
                        <Typography variant="body2">{p.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
