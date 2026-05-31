'use client';

import { Grid, Box, Typography, Chip, Card, Avatar, LinearProgress } from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  People,
  LocalOffer,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import RecentTransactions from '@/components/RecentTransactions';
import WeeklyStatsChart from '@/components/WeeklyStatsChart';

const products = [
  { name: 'iPhone 15 Pro', category: 'Electronics', price: '$999', stock: 45, progress: 85 },
  { name: 'MacBook Air M3', category: 'Laptops', price: '$1,299', stock: 32, progress: 72 },
  { name: 'AirPods Pro 2', category: 'Audio', price: '$249', stock: 120, progress: 95 },
  { name: 'iPad Pro', category: 'Tablets', price: '$799', stock: 58, progress: 60 },
];

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, John! Here&apos;s what&apos;s happening.
          </Typography>
        </Box>
        <Chip
          label="Jan 20 - Feb 20, 2024"
          variant="outlined"
          sx={{ borderRadius: 'var(--radius-xl)', fontWeight: 500, display: { xs: 'none', sm: 'flex' } }}
        />
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Revenue"
            value="$52,680"
            change="12.5%"
            changeType="up"
            icon={<AttachMoney sx={{ color: 'primary.main' }} />}
            color="primary.main"
            bgColor="primary.light"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Orders"
            value="1,240"
            change="8.2%"
            changeType="up"
            icon={<ShoppingCart sx={{ color: 'secondary.main' }} />}
            color="secondary.main"
            bgColor="secondary.light"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Customers"
            value="4,520"
            change="3.1%"
            changeType="up"
            icon={<People sx={{ color: 'success.main' }} />}
            color="success.main"
            bgColor="success.light"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <StatCard
            title="Growth Rate"
            value="24.8%"
            change="2.4%"
            changeType="down"
            icon={<TrendingUp sx={{ color: 'warning.main' }} />}
            color="warning.main"
            bgColor="#fde8e2"
          />
        </Grid>

        {/* Revenue Chart */}
        <Grid xs={12} lg={8}>
          <RevenueChart />
        </Grid>

        {/* Weekly Stats */}
        <Grid xs={12} lg={4}>
          <WeeklyStatsChart />
        </Grid>

        {/* Recent Transactions */}
        <Grid xs={12} lg={7}>
          <RecentTransactions />
        </Grid>

        {/* Top Products */}
        <Grid xs={12} lg={5}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              Top Products
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {products.map((product) => (
                <Box key={product.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'primary.light',
                          borderRadius: '10px',
                        }}
                      >
                        <LocalOffer sx={{ fontSize: 20, color: 'primary.main' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight={600}>
                        {product.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.stock} sold
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={product.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'var(--bg-body)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        bgcolor: product.progress > 90 ? 'success.main' : 'primary.main',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
