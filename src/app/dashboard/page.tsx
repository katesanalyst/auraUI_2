'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid, Avatar } from '@mui/material';
import {
  ConfirmationNumber,
  HourglassTop,
  CheckCircle,
  Reply,
  TrendingUp,
} from '@mui/icons-material';
import StatCard from '@/components/StatCard';
import { useColorMode } from '@/components/ThemeProvider';
import {
  weeklyCreated,
  weeklyResolved,
  getCreatedVsResolvedOptions,
  getConversionsOptions,
  getChannelsOptions,
  getSatisfactionOptions,
} from '@/config/charts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const conversionsData = [1200, 1900, 1500, 2100, 1800, 2400, 2100, 2600, 2300, 1900, 2500, 2800];

export default function DashboardPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">Overview of ticket metrics and performance</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Created Tickets"
            value="24,208"
            change="5%"
            changeType="down"
            icon={<ConfirmationNumber sx={{ color: 'primary.main' }} />}
            color="primary.main"
            bgColor="primary.light"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Unsolved Tickets"
            value="4,564"
            change="2%"
            changeType="up"
            icon={<HourglassTop sx={{ color: 'warning.main' }} />}
            color="warning.main"
            bgColor="warning.light"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Resolved Tickets"
            value="18,208"
            change="8%"
            changeType="up"
            icon={<CheckCircle sx={{ color: 'success.main' }} />}
            color="success.main"
            bgColor="success.light"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Avg First Reply"
            value="12:01"
            change="8%"
            changeType="up"
            icon={<Reply sx={{ color: 'info.main' }} />}
            color="info.main"
            bgColor="info.light"
          />
        </Grid>

        {/* Avg Tickets (2/3) + Conversions (1/3) */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box>
                <Typography variant="h5" fontWeight={700}>Avg. Tickets Created</Typography>
                <Typography variant="body2" color="text.secondary">Dec 18, 2023 - Dec 24, 2023</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary" fontSize="0.75rem">Avg. Created</Typography>
                  <Typography variant="h6" fontWeight={700}>3,817</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary" fontSize="0.75rem">Avg. Resolved</Typography>
                  <Typography variant="h6" fontWeight={700} color="secondary.main">2,176</Typography>
                </Box>
              </Box>
            </Box>
            <Chart
              options={getCreatedVsResolvedOptions(isDark)}
              series={[
                { name: 'Created', data: weeklyCreated },
                { name: 'Resolved', data: weeklyResolved },
              ]}
              type="area"
              height={320}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', borderRadius: '10px' }}>
                <TrendingUp sx={{ fontSize: 20, color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" fontWeight={700}>Conversions</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1 }}>
              <Typography variant="h3" fontWeight={700}>17,220</Typography>
              <Typography variant="body2" color="text.secondary">Sales</Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
              <Chart
                options={getConversionsOptions(isDark)}
                series={[{ name: 'Sales', data: conversionsData }]}
                type="area"
                height={200}
              />
            </Box>
          </Card>
        </Grid>

        {/* Ticket By Channels (1/2) + Customer Satisfaction (1/2) */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', borderRadius: '10px' }}>
                <ConfirmationNumber sx={{ fontSize: 20, color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" fontWeight={700}>Ticket By Channels</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chart options={getChannelsOptions(isDark)} series={[8200, 6400, 5100, 4508]} type="donut" height={280} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', borderRadius: '10px' }}>
                <CheckCircle sx={{ fontSize: 20, color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" fontWeight={700}>Customer Satisfaction</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Chart options={getSatisfactionOptions(isDark)} series={[80, 15, 5]} type="donut" height={220} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} color="success.main">80%</Typography>
                <Typography variant="body2" color="text.secondary">Positive</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} color="warning.main">15%</Typography>
                <Typography variant="body2" color="text.secondary">Neutral</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} color="error.main">5%</Typography>
                <Typography variant="body2" color="text.secondary">Negative</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
              Survey results from 156 customers
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
