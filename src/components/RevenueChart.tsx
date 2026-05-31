'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RevenueChart() {
  const [period, setPeriod] = useState('monthly');

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    colors: ['#0085db', '#46caeb'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
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
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => `$${val}k` },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: 'Revenue', data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 95, 120] },
    { name: 'Expenses', data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 55, 70] },
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Revenue Overview</Typography>
          <Typography variant="body2" color="text.secondary">Revenue & Expenses Analysis</Typography>
        </Box>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, v) => v && setPeriod(v)}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 'var(--radius-xl)',
              px: 2,
              fontSize: '0.75rem',
              border: '1px solid var(--border)',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' },
              },
            },
          }}
        >
          <ToggleButton value="weekly">Week</ToggleButton>
          <ToggleButton value="monthly">Month</ToggleButton>
          <ToggleButton value="yearly">Year</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Chart options={options} series={series} type="area" height={350} />
    </Card>
  );
}
