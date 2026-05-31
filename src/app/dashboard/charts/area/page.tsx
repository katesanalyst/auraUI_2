'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AreaChartPage() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: true },
      stacked: true,
    },
    colors: ['#0085db', '#46caeb', '#39b69a'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: '#e5eaef',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#8a929a', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#8a929a', fontSize: '12px' },
        formatter: (val) => `$${val}k`,
      },
    },
    tooltip: { theme: 'light', y: { formatter: (val) => `$${val}k` } },
    legend: { position: 'top', horizontalAlign: 'right' },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: 'Product A', data: [31, 40, 28, 51, 42, 109, 100, 80, 95, 70, 110, 130] },
    { name: 'Product B', data: [11, 32, 45, 32, 34, 52, 41, 60, 45, 50, 55, 68] },
    { name: 'Product C', data: [5, 12, 20, 15, 22, 30, 25, 35, 28, 32, 38, 42] },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Area Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Stacked product revenue trends</Typography>
      <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Chart options={options} series={series} type="area" height={400} />
      </Card>
    </Box>
  );
}
