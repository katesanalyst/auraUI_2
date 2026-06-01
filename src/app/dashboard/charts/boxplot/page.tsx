'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid } from '@mui/material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Box plot: y = [min, Q1, median, Q3, max]
const monthlyScores = [
  { x: 'Jan', y: [42, 55, 68, 78, 92] },
  { x: 'Feb', y: [38, 52, 65, 76, 88] },
  { x: 'Mar', y: [45, 60, 72, 83, 95] },
  { x: 'Apr', y: [50, 63, 74, 85, 96] },
  { x: 'May', y: [35, 50, 62, 74, 89] },
  { x: 'Jun', y: [48, 62, 75, 86, 97] },
  { x: 'Jul', y: [40, 55, 69, 80, 93] },
  { x: 'Aug', y: [52, 65, 77, 88, 98] },
  { x: 'Sep', y: [44, 58, 71, 82, 94] },
  { x: 'Oct', y: [47, 61, 73, 84, 95] },
  { x: 'Nov', y: [39, 54, 67, 79, 91] },
  { x: 'Dec', y: [53, 67, 78, 89, 99] },
];

const deptDistribution = [
  { x: 'Engineering', y: [55, 68, 75, 84, 96] },
  { x: 'Sales',       y: [40, 54, 64, 76, 90] },
  { x: 'Marketing',   y: [48, 60, 70, 80, 92] },
  { x: 'Support',     y: [35, 50, 62, 74, 87] },
  { x: 'Finance',     y: [52, 65, 73, 82, 94] },
  { x: 'HR',          y: [44, 57, 67, 78, 89] },
];

export default function BoxPlotPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const textColor = '#8a929a';
  const gridColor = isDark ? '#1e2a3a' : '#e5eaef';
  const bg = 'transparent';

  const baseBoxOptions = (categories?: string[]): ApexCharts.ApexOptions => ({
    chart: {
      type: 'boxPlot',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: false },
      background: bg,
    },
    colors: ['#0085db'],
    plotOptions: {
      boxPlot: {
        colors: { upper: '#0085db', lower: '#46caeb' },
      },
    },
    grid: { borderColor: gridColor, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      type: 'category',
      ...(categories ? { categories } : {}),
      labels: { style: { colors: textColor, fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: textColor, fontSize: '12px' } },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      shared: false,
    },
    theme: { mode: isDark ? 'dark' : 'light' },
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Box Plot Chart</Typography>
        <Typography variant="body2" color="text.secondary">Statistical distribution — min, Q1, median, Q3, max</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Monthly Distribution */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Monthly Score Distribution</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Team performance scores — upper (blue) = above median, lower (cyan) = below median
            </Typography>
            <Chart
              options={baseBoxOptions()}
              series={[{ name: 'Scores', type: 'boxPlot', data: monthlyScores }]}
              type="boxPlot"
              height={360}
            />
          </Card>
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>Department Distribution</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Score spread across departments
            </Typography>
            <Chart
              options={{
                ...baseBoxOptions(),
                plotOptions: {
                  boxPlot: { colors: { upper: '#39b69a', lower: '#46caeb' } },
                },
              }}
              series={[{ name: 'Scores', type: 'boxPlot', data: deptDistribution }]}
              type="boxPlot"
              height={360}
            />
          </Card>
        </Grid>

        {/* Stat summary cards */}
        {[
          { label: 'Overall Median', value: '71.5', sub: 'Across all months', color: 'primary.main' },
          { label: 'Highest Max',    value: '99',   sub: 'December',          color: 'success.main' },
          { label: 'Lowest Min',     value: '35',   sub: 'May & Support',     color: 'error.main' },
          { label: 'Avg IQR',        value: '27.4', sub: 'Q3 − Q1 spread',   color: 'info.main' },
        ].map(({ label, value, sub, color }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
              <Typography variant="h4" fontWeight={700} sx={{ color, my: 0.5 }}>{value}</Typography>
              <Typography variant="caption" color="text.secondary">{sub}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
