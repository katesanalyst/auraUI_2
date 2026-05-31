'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarChartPage() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: true },
    },
    colors: ['#0085db', '#46caeb', '#39b69a'],
    plotOptions: {
      bar: { horizontal: false, columnWidth: '55%', borderRadius: 6, borderRadiusApplication: 'end' },
    },
    grid: {
      borderColor: '#e5eaef',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
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
    fill: { opacity: 1 },
  };

  const series = [
    { name: 'Product A', data: [44, 55, 57, 56] },
    { name: 'Product B', data: [76, 85, 101, 98] },
    { name: 'Product C', data: [35, 41, 36, 26] },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Bar Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Quarterly product sales comparison</Typography>
      <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Chart options={options} series={series} type="bar" height={400} />
      </Card>
    </Box>
  );
}
