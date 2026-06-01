'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LineChartPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const gc = isDark ? '#1e2a3a' : '#e5eaef';
  const tc = '#8a929a';

  const base: ApexCharts.ApexOptions = {
    chart: { fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: true }, background: 'transparent', zoom: { enabled: true } },
    grid: { borderColor: gc, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: tc, fontSize: '12px' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: tc, fontSize: '12px' }, formatter: (v) => `$${v}k` } },
    tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (v) => `$${v}k` } },
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: tc } },
    dataLabels: { enabled: false },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const smoothOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'line' },
    colors: ['#0085db', '#fb977d'],
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 4, strokeWidth: 2, strokeColors: isDark ? '#1a2234' : '#fff', hover: { sizeOffset: 4 } },
  };

  const stepOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'line' },
    colors: ['#39b69a', '#7C3AED'],
    stroke: { curve: 'stepline', width: 2 },
  };

  const gradientOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'line' },
    colors: ['#0085db'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: ['#7C3AED'], shadeIntensity: 1, type: 'horizontal', stops: [0, 100] } },
  };

  const revenue = [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 130];
  const expenses = [11, 32, 45, 32, 34, 52, 41, 60, 45, 50, 55, 68];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Line Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Smooth, step-line, and gradient variants</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Smooth Line</Typography>
            <Chart options={smoothOpts} series={[{ name: 'Revenue', data: revenue }, { name: 'Expenses', data: expenses }]} type="line" height={300} />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Step Line</Typography>
            <Chart options={stepOpts} series={[{ name: 'Revenue', data: revenue }, { name: 'Expenses', data: expenses }]} type="line" height={300} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Gradient Line</Typography>
            <Chart options={gradientOpts} series={[{ name: 'Revenue', data: [...revenue, ...revenue.map(v => v + 20)].slice(0, 12) }]} type="line" height={300} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
