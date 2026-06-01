'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid, Chip } from '@mui/material';
import { CandlestickChart, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Simulated SENSEX-style OHLC data (daily candles, ~3 months)
const ohlcData = [
  { x: new Date('2024-01-02'), y: [72000, 72850, 71600, 72540] },
  { x: new Date('2024-01-03'), y: [72540, 73200, 72100, 71980] },
  { x: new Date('2024-01-04'), y: [71980, 72400, 71200, 72150] },
  { x: new Date('2024-01-05'), y: [72150, 73500, 71900, 73320] },
  { x: new Date('2024-01-08'), y: [73320, 74100, 72800, 73880] },
  { x: new Date('2024-01-09'), y: [73880, 74500, 73200, 74200] },
  { x: new Date('2024-01-10'), y: [74200, 74800, 73600, 74050] },
  { x: new Date('2024-01-11'), y: [74050, 74600, 73400, 73780] },
  { x: new Date('2024-01-12'), y: [73780, 74200, 72900, 73100] },
  { x: new Date('2024-01-15'), y: [73100, 73600, 72400, 73450] },
  { x: new Date('2024-01-16'), y: [73450, 74300, 73200, 74100] },
  { x: new Date('2024-01-17'), y: [74100, 75200, 73800, 75050] },
  { x: new Date('2024-01-18'), y: [75050, 75800, 74600, 75400] },
  { x: new Date('2024-01-19'), y: [75400, 76200, 74900, 75900] },
  { x: new Date('2024-01-22'), y: [75900, 76800, 75200, 76500] },
  { x: new Date('2024-01-23'), y: [76500, 77100, 75800, 76200] },
  { x: new Date('2024-01-24'), y: [76200, 76800, 75400, 75800] },
  { x: new Date('2024-01-25'), y: [75800, 76400, 74800, 76100] },
  { x: new Date('2024-01-29'), y: [76100, 77200, 75600, 77000] },
  { x: new Date('2024-01-30'), y: [77000, 78000, 76400, 77800] },
  { x: new Date('2024-01-31'), y: [77800, 78500, 77100, 77400] },
  { x: new Date('2024-02-01'), y: [77400, 78200, 76800, 78000] },
  { x: new Date('2024-02-02'), y: [78000, 79200, 77500, 79100] },
  { x: new Date('2024-02-05'), y: [79100, 79800, 78200, 78600] },
  { x: new Date('2024-02-06'), y: [78600, 79400, 78000, 79200] },
  { x: new Date('2024-02-07'), y: [79200, 80500, 78900, 80200] },
  { x: new Date('2024-02-08'), y: [80200, 81000, 79400, 80700] },
  { x: new Date('2024-02-09'), y: [80700, 81600, 80000, 81200] },
  { x: new Date('2024-02-12'), y: [81200, 82000, 80400, 81700] },
  { x: new Date('2024-02-13'), y: [81700, 82400, 80800, 81100] },
  { x: new Date('2024-02-14'), y: [81100, 81800, 80200, 81500] },
  { x: new Date('2024-02-15'), y: [81500, 82600, 81000, 82300] },
  { x: new Date('2024-02-16'), y: [82300, 83100, 81800, 82800] },
  { x: new Date('2024-02-19'), y: [82800, 83500, 82000, 82400] },
  { x: new Date('2024-02-20'), y: [82400, 83200, 81600, 82100] },
  { x: new Date('2024-02-21'), y: [82100, 82800, 80900, 81400] },
  { x: new Date('2024-02-22'), y: [81400, 82200, 80600, 82000] },
  { x: new Date('2024-02-23'), y: [82000, 83400, 81500, 83200] },
  { x: new Date('2024-02-26'), y: [83200, 84000, 82600, 83700] },
  { x: new Date('2024-02-27'), y: [83700, 84500, 83000, 84200] },
  { x: new Date('2024-02-28'), y: [84200, 85000, 83500, 84800] },
  { x: new Date('2024-02-29'), y: [84800, 85600, 84000, 85200] },
  { x: new Date('2024-03-01'), y: [85200, 86400, 84600, 86100] },
  { x: new Date('2024-03-04'), y: [86100, 87200, 85400, 86800] },
  { x: new Date('2024-03-05'), y: [86800, 87600, 85800, 86400] },
  { x: new Date('2024-03-06'), y: [86400, 87000, 85200, 86700] },
  { x: new Date('2024-03-07'), y: [86700, 88000, 86000, 87800] },
  { x: new Date('2024-03-08'), y: [87800, 89000, 87200, 88600] },
  { x: new Date('2024-03-11'), y: [88600, 89400, 87800, 88200] },
  { x: new Date('2024-03-12'), y: [88200, 89200, 87400, 89000] },
];

const volumeData = ohlcData.map((d) => ({
  x: d.x,
  y: Math.floor(Math.random() * 4000 + 1000),
}));

const firstClose = ohlcData[0].y[3];
const lastClose = ohlcData[ohlcData.length - 1].y[3];
const changeAbs = lastClose - firstClose;
const changePct = ((changeAbs / firstClose) * 100).toFixed(2);
const isPositive = changeAbs >= 0;

export default function CandlestickPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const textColor = '#8a929a';
  const gridColor = isDark ? '#1e2a3a' : '#e5eaef';

  const candlestickOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
      id: 'candles',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: true, tools: { download: true, selection: true, zoom: true, zoomin: true, zoomout: true, pan: true, reset: true } },
      background: 'transparent',
      brush: { target: 'volume-bar', enabled: false },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: '#39b69a', downward: '#f44336' },
        wick: { useFillColor: true },
      },
    },
    grid: { borderColor: gridColor, strokeDashArray: 3, xaxis: { lines: { show: false } } },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: textColor, fontSize: '11px' }, datetimeUTC: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: { colors: textColor, fontSize: '12px' },
        formatter: (v) => `₹${(v / 1000).toFixed(1)}k`,
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      x: { format: 'dd MMM yyyy' },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  const volumeOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'volume-bar',
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: false },
      background: 'transparent',
      brush: { enabled: true, target: 'candles' },
      selection: {
        enabled: true,
        xaxis: {
          min: ohlcData[ohlcData.length - 15].x.getTime(),
          max: ohlcData[ohlcData.length - 1].x.getTime(),
        },
      },
    },
    colors: ['#0085db'],
    plotOptions: { bar: { columnWidth: '80%', borderRadius: 2 } },
    grid: { borderColor: gridColor, strokeDashArray: 3, xaxis: { lines: { show: false } } },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: textColor, fontSize: '10px' }, datetimeUTC: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: '10px' },
        formatter: (v) => `${(v / 1000).toFixed(0)}k`,
      },
    },
    dataLabels: { enabled: false },
    tooltip: { theme: isDark ? 'dark' : 'light', x: { format: 'dd MMM yyyy' } },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Candlestick Chart</Typography>
        <Typography variant="body2" color="text.secondary">OHLC price visualization — stock & financial data</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CandlestickChart sx={{ color: 'primary.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="h5" fontWeight={700}>SENSEX</Typography>
                  <Typography variant="caption" color="text.secondary">BSE Sensex Index • Jan–Mar 2024</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5" fontWeight={700}>
                    ₹{lastClose.toLocaleString('en-IN')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                    {isPositive
                      ? <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                      : <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />}
                    <Typography
                      variant="caption"
                      fontWeight={600}
                      sx={{ color: isPositive ? 'success.main' : 'error.main' }}
                    >
                      {isPositive ? '+' : ''}{changeAbs.toLocaleString('en-IN')} ({changePct}%)
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['1W', '1M', '3M', 'YTD'].map((label, i) => (
                    <Chip
                      key={label}
                      label={label}
                      size="small"
                      variant={i === 2 ? 'filled' : 'outlined'}
                      color={i === 2 ? 'primary' : 'default'}
                      sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* OHLC legend */}
            <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
              {[
                { label: 'Open', value: `₹${ohlcData[ohlcData.length - 1].y[0].toLocaleString('en-IN')}` },
                { label: 'High', value: `₹${ohlcData[ohlcData.length - 1].y[1].toLocaleString('en-IN')}`, color: 'success.main' },
                { label: 'Low',  value: `₹${ohlcData[ohlcData.length - 1].y[2].toLocaleString('en-IN')}`, color: 'error.main' },
                { label: 'Close',value: `₹${ohlcData[ohlcData.length - 1].y[3].toLocaleString('en-IN')}` },
              ].map(({ label, value, color }) => (
                <Box key={label}>
                  <Typography variant="caption" color="text.secondary">{label}</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ color: color ?? 'text.primary' }}>{value}</Typography>
                </Box>
              ))}
            </Box>

            <Chart options={candlestickOptions} series={[{ data: ohlcData }]} type="candlestick" height={350} />

            {/* Volume brush */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Volume — drag to zoom range above
              </Typography>
              <Chart options={volumeOptions} series={[{ name: 'Volume', data: volumeData }]} type="bar" height={100} />
            </Box>
          </Card>
        </Grid>

        {/* Info Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="caption" color="text.secondary">52W High</Typography>
            <Typography variant="h5" fontWeight={700} color="success.main">₹89,000</Typography>
            <Typography variant="caption" color="text.secondary">Mar 12, 2024</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="caption" color="text.secondary">52W Low</Typography>
            <Typography variant="h5" fontWeight={700} color="error.main">₹71,200</Typography>
            <Typography variant="caption" color="text.secondary">Jan 4, 2024</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="caption" color="text.secondary">YTD Return</Typography>
            <Typography variant="h5" fontWeight={700} color="success.main">+{changePct}%</Typography>
            <Typography variant="caption" color="text.secondary">Since Jan 1, 2024</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="caption" color="text.secondary">Avg Daily Vol</Typography>
            <Typography variant="h5" fontWeight={700}>2,485</Typography>
            <Typography variant="caption" color="text.secondary">Thousand shares</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
