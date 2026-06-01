'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function GaugePage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const textColor = '#8a929a';

  const radialOptions = (color: string, label: string): ApexCharts.ApexOptions => ({
    chart: { type: 'radialBar', fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'transparent' },
    colors: [color],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '65%' },
        track: { background: isDark ? '#1e2a3a' : '#f0f5f9', strokeWidth: '100%' },
        dataLabels: {
          name: { show: true, fontSize: '13px', color: textColor, offsetY: 20 },
          value: { show: true, fontSize: '26px', fontWeight: 700, color: isDark ? '#e8eaf0' : '#111c2d', offsetY: -10 },
        },
      },
    },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', gradientToColors: [color + 'aa'], stops: [0, 100] } },
    stroke: { lineCap: 'round' },
    labels: [label],
    theme: { mode: isDark ? 'dark' : 'light' },
  });

  const multiGaugeOptions: ApexCharts.ApexOptions = {
    chart: { type: 'radialBar', fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'transparent' },
    colors: ['#0085db', '#39b69a', '#fb977d', '#7C3AED'],
    plotOptions: {
      radialBar: {
        hollow: { size: '30%' },
        track: { background: isDark ? '#1e2a3a' : '#f0f5f9' },
        dataLabels: {
          name: { fontSize: '13px', color: textColor },
          value: { fontSize: '14px', fontWeight: 700, color: isDark ? '#e8eaf0' : '#111c2d' },
          total: {
            show: true,
            label: 'Overall',
            fontSize: '14px',
            color: textColor,
            formatter: () => '71%',
          },
        },
      },
    },
    stroke: { lineCap: 'round' },
    labels: ['Revenue', 'Growth', 'Retention', 'Satisfaction'],
    legend: { show: true, position: 'bottom', labels: { colors: textColor } },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const metrics = [
    { label: 'CPU Usage',    value: 72, color: '#0085db' },
    { label: 'Memory',       value: 58, color: '#39b69a' },
    { label: 'Disk',         value: 43, color: '#fb977d' },
    { label: 'Network',      value: 85, color: '#7C3AED' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Gauge / Radial Bar</Typography>
        <Typography variant="body2" color="text.secondary">Progress indicators and KPI gauges</Typography>
      </Box>
      <Grid container spacing={3}>
        {metrics.map(({ label, value, color }) => (
          <Grid item xs={12} sm={6} lg={3} key={label}>
            <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center' }}>
              <Chart options={radialOptions(color, label)} series={[value]} type="radialBar" height={220} />
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Multi-metric Gauge</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>4 KPIs in one radial chart</Typography>
            <Chart options={multiGaugeOptions} series={[78, 65, 84, 57]} type="radialBar" height={340} />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Goal Completion</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>Single large gauge — semi-circle style</Typography>
            <Chart
              options={{
                ...radialOptions('#0085db', 'Target'),
                plotOptions: {
                  radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: { size: '60%' },
                    track: { background: isDark ? '#1e2a3a' : '#f0f5f9', strokeWidth: '100%' },
                    dataLabels: {
                      name: { show: true, fontSize: '14px', color: textColor, offsetY: -10 },
                      value: { show: true, fontSize: '32px', fontWeight: 700, color: isDark ? '#e8eaf0' : '#111c2d', offsetY: -30 },
                    },
                  },
                },
              }}
              series={[83]}
              type="radialBar"
              height={280}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
