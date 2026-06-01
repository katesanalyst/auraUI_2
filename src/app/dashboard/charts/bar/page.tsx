'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const series = [
  { name: 'Product A', data: [44, 55, 57, 56] },
  { name: 'Product B', data: [76, 85, 101, 98] },
  { name: 'Product C', data: [35, 41, 36, 26] },
];

const seriesH = [
  { name: '2024', data: [47, 65, 84, 95, 112, 128, 140, 152, 167, 185, 198, 210] },
  { name: '2023', data: [35, 50, 62, 74, 88, 102, 110, 125, 138, 150, 163, 178] },
];

export default function BarChartPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const gc = isDark ? '#1e2a3a' : '#e5eaef';
  const tc = '#8a929a';

  const base = {
    chart: { fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: true }, background: 'transparent' },
    colors: ['#0085db', '#46caeb', '#39b69a'],
    grid: { borderColor: gc, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: { labels: { style: { colors: tc, fontSize: '12px' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: tc, fontSize: '12px' } } },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    legend: { position: 'top' as const, horizontalAlign: 'right' as const, labels: { colors: tc } },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    theme: { mode: isDark ? 'dark' as const : 'light' as const },
  };

  const groupedOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'bar' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 6, borderRadiusApplication: 'end' } },
    xaxis: { ...base.xaxis, categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    yaxis: { labels: { ...base.yaxis.labels, formatter: (v) => `$${v}k` } },
    tooltip: { ...base.tooltip, y: { formatter: (v) => `$${v}k` } },
  };

  const stackedOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'bar', stacked: true },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%', borderRadius: 4, borderRadiusApplication: 'end', borderRadiusWhenStacked: 'last' } },
    xaxis: { ...base.xaxis, categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    yaxis: { labels: { ...base.yaxis.labels, formatter: (v) => `${(v / 1000).toFixed(0)}k` } },
  };

  const horizontalOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'bar' },
    colors: ['#0085db', '#fb977d'],
    plotOptions: { bar: { horizontal: true, barHeight: '55%', borderRadius: 6 } },
    xaxis: { ...base.xaxis, categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    tooltip: { ...base.tooltip, y: { formatter: (v) => `${v}k units` } },
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Bar Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Grouped, stacked, and horizontal variants</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Grouped Bar</Typography>
            <Chart options={groupedOpts} series={series} type="bar" height={320} />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Stacked Bar</Typography>
            <Chart options={stackedOpts} series={series} type="bar" height={320} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Horizontal Bar</Typography>
            <Chart options={horizontalOpts} series={seriesH} type="bar" height={340} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
