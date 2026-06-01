'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const COLORS = ['#0085db', '#46caeb', '#39b69a', '#fb977d', '#7C3AED', '#f0c040'];
const LABELS = ['Direct', 'Organic', 'Social', 'Referral', 'Email', 'Paid'];
const DATA   = [44, 28, 18, 12, 8, 5];

export default function PieChartPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const strokeColor = isDark ? '#1a2234' : '#fff';
  const tc = '#8a929a';

  const base: ApexCharts.ApexOptions = {
    chart: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'transparent' },
    colors: COLORS,
    labels: LABELS,
    stroke: { width: 2, colors: [strokeColor] },
    legend: { position: 'bottom', labels: { colors: tc }, fontSize: '13px' },
    dataLabels: { enabled: true, style: { fontSize: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" } },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const pieOpts: ApexCharts.ApexOptions = { ...base, chart: { ...base.chart, type: 'pie' } };

  const donutOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'donut' },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', fontWeight: 600, color: tc },
            value: { show: true, fontSize: '22px', fontWeight: 700, color: isDark ? '#e8eaf0' : '#111c2d' },
            total: { show: true, label: 'Total', fontSize: '13px', color: tc, formatter: () => DATA.reduce((a, b) => a + b, 0).toString() },
          },
        },
      },
    },
  };

  const monoOpts: ApexCharts.ApexOptions = {
    ...base,
    chart: { ...base.chart, type: 'donut' },
    colors: undefined,
    theme: { mode: isDark ? 'dark' : 'light', monochrome: { enabled: true, color: '#0085db', shadeTo: 'light', shadeIntensity: 0.65 } },
    plotOptions: { pie: { donut: { size: '65%' } } },
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Pie & Donut Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Pie, donut, and monochrome variants</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Pie Chart</Typography>
            <Chart options={pieOpts} series={DATA} type="pie" height={320} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Donut Chart</Typography>
            <Chart options={donutOpts} series={DATA} type="donut" height={320} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>Monochrome Donut</Typography>
            <Chart options={monoOpts} series={DATA} type="donut" height={320} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
