'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChartPage() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    colors: ['#0085db', '#46caeb', '#39b69a', '#fb977d', '#7c5cfc'],
    labels: ['Electronics', 'Clothing', 'Food', 'Sports', 'Other'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', fontWeight: 600 },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 700,
              formatter: (val) => `$${val}k`,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return `$${total}k`;
              },
            },
          },
        },
      },
    },
    stroke: { width: 2, colors: ['#fff'] },
    legend: { position: 'bottom', fontSize: '13px' },
    tooltip: { theme: 'light', y: { formatter: (val) => `$${val}k` } },
    dataLabels: { enabled: false },
    responsive: [
      { breakpoint: 480, options: { chart: { width: 300 }, legend: { position: 'bottom' } } },
    ],
  };

  const series = [44, 55, 41, 17, 25];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Pie / Donut Chart</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Sales distribution by category</Typography>
      <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        <Chart options={options} series={series} type="donut" height={400} />
      </Card>
    </Box>
  );
}
