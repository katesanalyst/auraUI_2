'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function WeeklyStatsChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    colors: ['#0085db'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
      },
    },
    grid: {
      borderColor: '#e5eaef',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#8a929a', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#8a929a', fontSize: '12px' },
        formatter: (val) => `${val}k`,
      },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => `${val}k` },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  const series = [
    { name: 'Sales', data: [35, 60, 45, 70, 55, 80, 65] },
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Weekly Stats
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Average weekly sales
      </Typography>
      <Chart options={options} series={series} type="bar" height={300} />
    </Card>
  );
}
