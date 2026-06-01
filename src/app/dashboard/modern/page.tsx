'use client';

import { Grid, Box, Typography, Card, Avatar, Chip } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  AttachMoney,
  ShoppingCart,
  People,
  TrendingUp,
  Notifications,
  Email,
  Payment,
  PersonAdd,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const activities = [
  { icon: <Payment />, color: 'primary', title: 'Payment received from John Doe', time: '2 min ago', amount: '$430' },
  { icon: <PersonAdd />, color: 'success', title: 'New user registered', time: '1 hour ago' },
  { icon: <Email />, color: 'secondary', title: 'Mail sent to HR department', time: '3 hours ago' },
  { icon: <Notifications />, color: 'warning', title: 'Server limit reached', time: '5 hours ago' },
  { icon: <ShoppingCart />, color: 'primary', title: 'New order placed #2341', time: '8 hours ago', amount: '$1,200' },
];

const users = [
  { name: 'Olivia Martin', email: 'olivia@email.com', role: 'Admin', status: 'Active' },
  { name: 'Jackson Lee', email: 'jackson@email.com', role: 'Editor', status: 'Active' },
  { name: 'Isabella Anderson', email: 'isabella@email.com', role: 'Viewer', status: 'Pending' },
  { name: 'William Kim', email: 'william@email.com', role: 'Editor', status: 'Active' },
  { name: 'Sofia Davis', email: 'sofia@email.com', role: 'Admin', status: 'Inactive' },
];

export default function ModernPage() {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    colors: ['#0085db', '#46caeb'],
    stroke: { curve: 'smooth', width: 3 },
    grid: { borderColor: '#e5eaef', strokeDashArray: 4 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: { style: { colors: '#8a929a', fontSize: '12px' } },
      axisBorder: { show: false },
    },
    yaxis: { labels: { style: { colors: '#8a929a', fontSize: '12px' } } },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const chartSeries = [
    { name: 'Revenue', data: [30, 40, 35, 50, 49, 60, 70] },
    { name: 'Expenses', data: [20, 25, 30, 35, 40, 45, 50] },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Modern Dashboard</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Revenue" value="$52,680" change="12.5%" changeType="up" icon={<AttachMoney sx={{ color: 'primary.main' }} />} bgColor="primary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Orders" value="1,240" change="8.2%" changeType="up" icon={<ShoppingCart sx={{ color: 'secondary.main' }} />} bgColor="secondary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Customers" value="4,520" change="3.1%" changeType="up" icon={<People sx={{ color: 'success.main' }} />} bgColor="success.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Growth" value="24.8%" change="2.4%" changeType="down" icon={<TrendingUp sx={{ color: 'warning.main' }} />} bgColor="#fde8e2" />
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Revenue vs Expenses</Typography>
            <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
          </Card>
        </Grid>

        {/* Activity Timeline */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Recent Activity</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activities.map((a, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: `${a.color}.light`, borderRadius: '10px' }}>
                    {a.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>{a.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{a.time}</Typography>
                  </Box>
                  {a.amount && <Typography variant="body2" fontWeight={600} color="primary">{a.amount}</Typography>}
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Users Table */}
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'auto' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Users</Typography>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
              <Box component="thead">
                <Box component="tr" sx={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Email', 'Role', 'Status'].map(h => (
                    <Box key={h} component="th" sx={{ textAlign: 'left', p: 1.5, fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>{h}</Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {users.map((u, i) => (
                  <Box key={i} component="tr" sx={{ borderBottom: '1px solid var(--border)', '&:last-child': { border: 0 } }}>
                    <Box component="td" sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.75rem', borderRadius: '8px' }}>
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>{u.name}</Typography>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ p: 1.5, color: 'text.secondary', fontSize: '0.8rem' }}>{u.email}</Box>
                    <Box component="td" sx={{ p: 1.5, fontSize: '0.8rem' }}>{u.role}</Box>
                    <Box component="td" sx={{ p: 1.5 }}>
                      <Chip
                        label={u.status}
                        size="small"
                        color={u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'default'}
                        sx={{ fontSize: '0.7rem' }}
                      />
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
