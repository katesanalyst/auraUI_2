'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AreaChartPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const gc = isDark ? '#1e2a3a' : '#e5eaef';
  const tc = '#8a929a';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const base: ApexCharts.ApexOptions = {
    chart: { fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, background: 'transparent' },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05, stops: [0, 100] } },
    grid: { borderColor: gc, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: { categories: months, labels: { style: { colors: tc, fontSize: '12px' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: tc, fontSize: '12px' }, formatter: (v) => `$${v}k` } },
    tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (v) => `$${v}k` } },
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: tc } },
    dataLabels: { enabled: false },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const stackedOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'area', stacked: true },
    colors: ['#0085db', '#46caeb', '#39b69a'],
  };

  const basicOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'area' },
    colors: ['#0085db', '#fb977d'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 100] } },
  };

  const negativeOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'area' },
    colors: ['#39b69a', '#f44336'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Area Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Stacked, basic, and negative area variants</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Stacked Area</Typography>
            <Chart
              options={stackedOpts}
              series={[
                { name: 'Product A', data: [31, 40, 28, 51, 42, 109, 100, 80, 95, 70, 110, 130] },
                { name: 'Product B', data: [11, 32, 45, 32, 34, 52, 41, 60, 45, 50, 55, 68] },
                { name: 'Product C', data: [5, 12, 20, 15, 22, 30, 25, 35, 28, 32, 38, 42] },
              ]}
              type="area" height={320}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Basic Area</Typography>
            <Chart
              options={basicOpts}
              series={[
                { name: 'Revenue', data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 130] },
                { name: 'Expenses', data: [11, 32, 45, 32, 34, 52, 41, 60, 45, 50, 55, 68] },
              ]}
              type="area" height={280}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Positive / Negative</Typography>
            <Chart
              options={negativeOpts}
              series={[
                { name: 'Growth', data: [31, -18, 28, 51, -22, 40, 30, -15, 45, 28, -10, 52] },
                { name: 'Decline', data: [-10, 12, -15, -22, 18, -30, -18, 25, -20, -12, 22, -28] },
              ]}
              type="area" height={280}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
