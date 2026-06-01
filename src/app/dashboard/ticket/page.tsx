'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid, Chip, LinearProgress } from '@mui/material';
import {
  ConfirmationNumber,
  HourglassTop,
  CheckCircle,
  Reply,
  ThumbUp,
  ThumbDown,
  Remove,
  CalendarMonth,
  SyncAlt,
  CellTower,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';
import { useColorMode } from '@/components/ThemeProvider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const weeklyCreated = [3200, 4100, 3800, 4500, 3900, 4200, 3817];
const weeklyResolved = [2100, 2800, 2400, 3100, 2600, 2900, 2176];
const weekDays = ['2023-12-18', '2023-12-19', '2023-12-20', '2023-12-21', '2023-12-22', '2023-12-23', '2023-12-24'];

const BUBBLE_DATA = [
  { label: 'Yogyakarta', value: 12320, color: '#0085db', size: 148 },
  { label: 'Bandung',    value: 3260,  color: '#46caeb', size: 88  },
  { label: 'Jakarta',    value: 1320,  color: '#fb977d', size: 60  },
  { label: 'Kebumen',    value: 340,   color: '#39b69a', size: 30  },
];

const CHANNELS = [
  { label: 'Email',        color: '#0085db', value: 8200 },
  { label: 'Live Chat',    color: '#46caeb', value: 5600 },
  { label: 'Contact Form', color: '#fb977d', value: 800  },
  { label: 'Messenger',    color: '#39b69a', value: 180  },
  { label: 'WhatsApp',     color: '#9c27b0', value: 52   },
];

const SATISFACTION = [
  { label: 'Positive', pct: 80, color: '#39b69a', icon: <ThumbUp sx={{ fontSize: 18, color: '#39b69a' }} /> },
  { label: 'Neutral',  pct: 15, color: '#f0c040', icon: <Remove   sx={{ fontSize: 18, color: '#f0c040' }} /> },
  { label: 'Negative', pct: 5,  color: '#f44336', icon: <ThumbDown sx={{ fontSize: 18, color: '#f44336' }} /> },
];

// Custom SVG semicircle arc chart — matches reference thick rounded arc style
function SemiArcChart({ channels, isDark }: { channels: typeof CHANNELS; isDark: boolean }) {
  const total = channels.reduce((s, c) => s + c.value, 0);
  const SW = 20;       // stroke width
  const R = 105;       // radius
  const CX = 150;      // center x
  const CY = 130;      // center y (baseline of arc)
  // Gap must exceed SW in arc-length to stay visible with round linecap: gap° > SW/R*(180/π) ≈ 10.9°
  const GAP = 12;
  const totalGaps = (channels.length - 1) * GAP;
  const available = 180 - totalGaps;

  // Math angle → SVG coords (y-flipped)
  const polar = (deg: number) => ({
    x: +(CX + R * Math.cos((deg * Math.PI) / 180)).toFixed(3),
    y: +(CY - R * Math.sin((deg * Math.PI) / 180)).toFixed(3),
  });

  // Arc from math angle d1 → d2 going clockwise-in-screen (sweep=1)
  // which equals going counterclockwise in math = over the top of the semicircle
  const arc = (d1: number, d2: number) => {
    const p1 = polar(d1);
    const p2 = polar(d2);
    const span = Math.abs(d1 - d2);
    return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${span > 180 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
  };

  let cursor = 180;
  const segs = channels.map((c, i) => {
    const span = (c.value / total) * available;
    const d1 = cursor;
    const d2 = cursor - span;
    cursor = d2 - (i < channels.length - 1 ? GAP : 0);
    return { ...c, d1, d2 };
  });

  const trackColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const textPrimary = isDark ? '#e8eaf0' : '#111c2d';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="300" height="165" viewBox="0 0 300 165" style={{ overflow: 'visible' }}>
          {/* Background track */}
          <path d={arc(180, 0)} fill="none" stroke={trackColor} strokeWidth={SW} strokeLinecap="round" />
          {/* Colored segments */}
          {segs.map((s) => (
            <path key={s.label} d={arc(s.d1, s.d2)} fill="none" stroke={s.color} strokeWidth={SW} strokeLinecap="round" />
          ))}
          {/* Center text */}
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="11" fill="#8a929a" fontFamily="Plus Jakarta Sans, sans-serif">
            Total Active Tickets
          </text>
          <text x={CX} y={CY + 34} textAnchor="middle" fontSize="22" fontWeight="700" fill={textPrimary} fontFamily="Plus Jakarta Sans, sans-serif">
            14,832
          </text>
        </svg>
      </Box>
      {/* Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 0.5 }}>
        {channels.map((c) => (
          <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c.color, flexShrink: 0 }} />
            <Typography variant="caption" color="text.secondary">{c.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function TicketDashboardPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const textColor = '#8a929a';
  const gridColor = isDark ? '#1e2a3a' : '#e5eaef';
  const strokeColor = isDark ? '#1a2234' : '#ffffff';

  const stackedBarOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', stacked: true, fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, background: 'transparent' },
    colors: ['#1939B7', '#00C9FF'],
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        columnWidth: '42%',
      },
    },
    grid: { borderColor: gridColor, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      type: 'category',
      categories: weekDays,
      labels: { style: { colors: textColor, fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: '12px' },
        formatter: (v) => `${(v / 1000).toFixed(0)}k`,
      },
      max: 5000,
      tickAmount: 5,
    },
    tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (v) => v.toLocaleString() } },
    dataLabels: { enabled: false },
    legend: { show: false },
    fill: { opacity: 1 },
    theme: { mode: isDark ? 'dark' : 'light' },
  };

  return (
    <Box>
      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Created Tickets" value="24,208" change="5%" changeType="down"
            icon={<ConfirmationNumber />} color="primary.main" bgColor="primary.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Unsolved Tickets" value="4,564" change="2%" changeType="up"
            icon={<HourglassTop />} color="warning.main" bgColor="warning.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Resolved Tickets" value="18,208" change="8%" changeType="up"
            icon={<CheckCircle />} color="success.main" bgColor="success.light" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Avg First Reply" value="12:01" change="8%" changeType="up"
            icon={<Reply />} color="info.main" bgColor="info.light" />
        </Grid>
      </Grid>

      {/* Row 1: Stacked Bar + Bubble Conversions */}
      <Grid container spacing={3} sx={{ mb: 3 }}>

        {/* Stacked Bar */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                  <ConfirmationNumber sx={{ fontSize: 15, color: 'text.disabled' }} />
                  <Typography variant="subtitle1" fontWeight={700}>Average Tickets Created</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#00C9FF' }} />
                      <Typography variant="caption" color="text.secondary">Avg. Tickets Created</Typography>
                    </Box>
                    <Typography variant="h5" fontWeight={700}>3,817</Typography>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#1939B7' }} />
                      <Typography variant="caption" color="text.secondary">Avg. Tickets Resolved</Typography>
                    </Box>
                    <Typography variant="h5" fontWeight={700}>2,176</Typography>
                  </Box>
                </Box>
              </Box>
              <Chip
                icon={<CalendarMonth sx={{ fontSize: '14px !important' }} />}
                label="Dec 18, 2023 - Dec 24, 2023"
                size="small"
                variant="outlined"
                sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.7rem' }}
              />
            </Box>
            <Chart
              options={stackedBarOptions}
              series={[
                { name: 'Avg. Tickets Resolved', data: weeklyResolved },
                { name: 'Avg. Tickets Created',  data: weeklyCreated  },
              ]}
              type="bar"
              height={300}
            />
          </Card>
        </Grid>

        {/* Bubble Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <SyncAlt sx={{ fontSize: 15, color: 'text.disabled' }} />
              <Typography variant="subtitle1" fontWeight={700}>Conversions</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 1.5 }}>
              <Typography variant="h4" fontWeight={700}>17,220</Typography>
              <Typography variant="body2" color="text.secondary">Sales</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
              {BUBBLE_DATA.map((b) => (
                <Box key={b.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: b.color }} />
                  <Typography variant="caption" color="text.secondary">{b.label}</Typography>
                </Box>
              ))}
            </Box>
            {/* Fixed-pixel layout so bubbles cluster regardless of container width */}
            <Box sx={{ position: 'relative', height: 180, width: 240, mx: 'auto' }}>
              {/* Yogyakarta — large blue: 148px, anchored left */}
              <Box sx={{
                position: 'absolute', borderRadius: '50%',
                width: 148, height: 148, bgcolor: '#0085db',
                left: 0, top: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#fff', lineHeight: 1 }}>12,320</Typography>
              </Box>
              {/* Bandung — cyan 88px: overlaps large on right */}
              <Box sx={{
                position: 'absolute', borderRadius: '50%',
                width: 88, height: 88, bgcolor: '#46caeb',
                left: 122, top: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#fff' }}>3,260</Typography>
              </Box>
              {/* Jakarta — orange 60px: below cyan, touching large */}
              <Box sx={{
                position: 'absolute', borderRadius: '50%',
                width: 60, height: 60, bgcolor: '#fb977d',
                left: 138, top: 104,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: '#fff' }}>1,320</Typography>
              </Box>
              {/* Kebumen — green 30px: top-right of cyan */}
              <Box sx={{
                position: 'absolute', borderRadius: '50%',
                width: 30, height: 30, bgcolor: '#39b69a',
                left: 198, top: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography sx={{ color: '#fff', fontSize: '0.5rem', fontWeight: 700 }}>340</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Row 2: Semicircle Channels + Satisfaction Bars */}
      <Grid container spacing={3}>

        {/* Semicircle */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              <CellTower sx={{ fontSize: 15, color: 'text.disabled' }} />
              <Typography variant="subtitle1" fontWeight={700}>Ticket By Channels</Typography>
            </Box>
            <SemiArcChart channels={CHANNELS} isDark={isDark} />
          </Card>
        </Grid>

        {/* Satisfaction Progress Bars */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 3 }}>
              <SyncAlt sx={{ fontSize: 15, color: 'text.disabled' }} />
              <Typography variant="subtitle1" fontWeight={700}>Customer Satisfaction</Typography>
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
                <Typography variant="caption" color="text.secondary">Responses Received</Typography>
                <Typography variant="h2" fontWeight={700} lineHeight={1.1} sx={{ mt: 0.5 }}>156</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Customers</Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                {SATISFACTION.map(({ label, pct, color, icon }) => (
                  <Box key={label} sx={{ mb: 2.5, '&:last-child': { mb: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        {icon}
                        <Typography variant="body2" fontWeight={500}>{label}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={700}>{pct}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
                        '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
                      }}
                    />
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
