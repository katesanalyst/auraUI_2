'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function rnd(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(1);
}

const group1 = Array.from({ length: 25 }, () => ({ x: rnd(10, 60),  y: rnd(20, 80)  }));
const group2 = Array.from({ length: 25 }, () => ({ x: rnd(40, 90),  y: rnd(50, 95)  }));
const group3 = Array.from({ length: 25 }, () => ({ x: rnd(5,  50),  y: rnd(60, 100) }));

const correlation = Array.from({ length: 40 }, (_, i) => ({
  x: +(i * 2.5 + rnd(-3, 3)).toFixed(1),
  y: +(i * 1.8 + rnd(-8, 8) + 10).toFixed(1),
}));

export default function ScatterPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const textColor = '#8a929a';
  const gridColor = isDark ? '#1e2a3a' : '#e5eaef';

  const baseAxis = {
    labels: { style: { colors: textColor, fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  };

  const clusterOptions: ApexCharts.ApexOptions = {
    chart: { type: 'scatter', fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, background: 'transparent', zoom: { enabled: true, type: 'xy' } },
    colors: ['#0085db', '#39b69a', '#fb977d'],
    markers: { size: 6, strokeWidth: 0, hover: { sizeOffset: 3 } },
    grid: { borderColor: gridColor, strokeDashArray: 4 },
    xaxis: { ...baseAxis, type: 'numeric', title: { text: 'X Value', style: { color: textColor } } },
    yaxis: { ...baseAxis, title: { text: 'Y Value', style: { color: textColor } } },
    legend: { position: 'top', labels: { colors: textColor } },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const correlationOptions: ApexCharts.ApexOptions = {
    chart: { type: 'scatter', fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, background: 'transparent' },
    colors: ['#7C3AED'],
    markers: { size: 5, strokeWidth: 0, fillOpacity: 0.8 },
    grid: { borderColor: gridColor, strokeDashArray: 4 },
    xaxis: { ...baseAxis, type: 'numeric', title: { text: 'Study Hours', style: { color: textColor } } },
    yaxis: { ...baseAxis, title: { text: 'Exam Score', style: { color: textColor } } },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Scatter Chart</Typography>
        <Typography variant="body2" color="text.secondary">Data point distribution and correlation analysis</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Cluster Analysis</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Three distinct data clusters — drag to zoom</Typography>
            <Chart
              options={clusterOptions}
              series={[
                { name: 'Group A', data: group1 },
                { name: 'Group B', data: group2 },
                { name: 'Group C', data: group3 },
              ]}
              type="scatter"
              height={360}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Correlation</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Study hours vs exam score — positive correlation</Typography>
            <Chart
              options={correlationOptions}
              series={[{ name: 'Students', data: correlation }]}
              type="scatter"
              height={360}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
