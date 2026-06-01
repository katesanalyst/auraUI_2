'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, People, ShoppingCart, AttachMoney, Visibility } from '@mui/icons-material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SPARKLINES = [
  { title: 'Total Revenue',  value: '$48,295', change: '+12.5%', up: true,  color: '#0085db', icon: <AttachMoney />, data: [31, 40, 28, 51, 42, 109, 100, 89, 121, 95, 140, 130] },
  { title: 'New Users',      value: '8,243',   change: '+8.2%',  up: true,  color: '#39b69a', icon: <People />,      data: [50, 41, 67, 22, 43, 21, 41, 56, 27, 43, 60, 71] },
  { title: 'Orders',         value: '1,893',   change: '-3.1%',  up: false, color: '#fb977d', icon: <ShoppingCart />, data: [120, 90, 135, 80, 110, 75, 95, 105, 80, 70, 60, 55] },
  { title: 'Page Views',     value: '284k',    change: '+22.4%', up: true,  color: '#7C3AED', icon: <Visibility />,  data: [40, 52, 38, 80, 63, 95, 58, 102, 78, 115, 90, 130] },
];

function SparkCard({ title, value, change, up, color, icon, data, isDark }: typeof SPARKLINES[0] & { isDark: boolean }) {
  const opts: ApexCharts.ApexOptions = {
    chart: { type: 'area', sparkline: { enabled: true }, background: 'transparent' },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 100] } },
    tooltip: { theme: isDark ? 'dark' : 'light', fixed: { enabled: false }, x: { show: false } },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  return (
    <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box sx={{ width: 42, height: 42, borderRadius: '12px', bgcolor: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {icon}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.25, borderRadius: 'var(--radius-xl)', bgcolor: up ? 'success.light' : 'error.light' }}>
          {up ? <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} /> : <TrendingDown sx={{ fontSize: 14, color: 'error.main' }} />}
          <Typography variant="caption" fontWeight={700} sx={{ color: up ? 'success.main' : 'error.main' }}>{change}</Typography>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight={700} mb={0.25}>{value}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>{title}</Typography>
      <Chart options={opts} series={[{ name: title, data }]} type="area" height={60} />
    </Card>
  );
}

export default function SparklinePage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const textColor = '#8a929a';
  const gridColor = isDark ? '#1e2a3a' : '#e5eaef';

  const combinedOpts: ApexCharts.ApexOptions = {
    chart: { type: 'line', fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, background: 'transparent' },
    colors: SPARKLINES.map(s => s.color),
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: gridColor, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: textColor, fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: textColor, fontSize: '12px' } } },
    legend: { position: 'top', labels: { colors: textColor } },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Sparkline Charts</Typography>
        <Typography variant="body2" color="text.secondary">Inline mini-charts for KPI cards</Typography>
      </Box>
      <Grid container spacing={3}>
        {SPARKLINES.map((s) => (
          <Grid item xs={12} sm={6} lg={3} key={s.title}>
            <SparkCard {...s} isDark={isDark} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Combined Trend</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>All 4 metrics over 12 months</Typography>
            <Chart
              options={combinedOpts}
              series={SPARKLINES.map(s => ({ name: s.title, data: s.data }))}
              type="line"
              height={300}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
