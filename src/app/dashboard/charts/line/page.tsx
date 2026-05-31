'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LineChartPage() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    colors: ['#0085db', '#fb977d'],
    stroke: { curve: 'smooth', width: 3 },
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
    markers: { size: 4, strokeWidth: 2, strokeColors: '#fff', hover: { sizeOffset: 4 } },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: 'Revenue', data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 130] },
    { name: 'Expenses', data: [11, 32, 45, 32, 34, 52, 41, 60, 45, 50, 55, 68] },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Line Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Revenue vs Expenses over 12 months</Typography>
      <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Chart options={options} series={series} type="line" height={400} />
      </Card>
    </Box>
  );
}
