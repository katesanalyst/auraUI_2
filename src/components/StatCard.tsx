'use client';

import { Box, Typography, Avatar, SxProps, Theme } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down';
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
  sx?: SxProps<Theme>;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'up',
  icon,
  color = 'primary.main',
  bgColor = 'primary.light',
  sx,
}: StatCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 'var(--radius-lg)',
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 'var(--shadow-card)',
        },
        ...sx,
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        {change && (
          <Typography
            variant="caption"
            sx={{ color: changeType === 'up' ? 'success.main' : 'error.main', fontWeight: 600 }}
          >
            {changeType === 'up' ? '+' : ''}{change}
          </Typography>
        )}
      </Box>
      <Avatar
        sx={{
          width: 56,
          height: 56,
          bgcolor: bgColor,
          borderRadius: '14px',
        }}
      >
        {icon}
      </Avatar>
    </Box>
  );
}
