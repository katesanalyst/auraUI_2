'use client';

import { useState } from 'react';
import { Box, Typography, Card, IconButton, Grid, Chip, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const sampleEvents: Record<number, { title: string; color: string }[]> = {
  3: [{ title: 'Team Standup', color: '#0085db' }],
  5: [{ title: 'Client Call', color: '#fb977d' }, { title: 'Design Review', color: '#39b69a' }],
  10: [{ title: 'Sprint Planning', color: '#0085db' }],
  15: [{ title: 'Release v2.0', color: '#7c3aed' }],
  18: [{ title: 'Team Lunch', color: '#39b69a' }],
  22: [{ title: 'Demo Day', color: '#fb977d' }],
  25: [{ title: 'Retro', color: '#46caeb' }],
  28: [{ title: 'Deadline', color: '#ef4444' }],
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Calendar</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Schedule and events</Typography>

      <Card sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={prev}><ChevronLeft /></IconButton>
          <Typography variant="h5" fontWeight={700}>{MONTHS[month]} {year}</Typography>
          <IconButton onClick={next}><ChevronRight /></IconButton>
        </Box>

        <Grid container spacing={0}>
          {DAYS.map((day) => (
            <Grid item xs key={day} sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="caption" fontWeight={600} color="text.secondary">{isMobile ? day[0] : day}</Typography>
            </Grid>
          ))}

          {cells.map((day, i) => {
            const isToday = day && today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const events = day ? sampleEvents[day] || [] : [];
            return (
              <Grid item xs key={i} sx={{ minHeight: isMobile ? 56 : 80, border: '1px solid', borderColor: 'divider', borderTop: 0, borderLeft: i % 7 === 0 ? '1px solid' : 0, p: 0.5 }}>
                {day && (
                  <Box>
                    <Box
                      sx={{
                        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: isToday ? 'primary.main' : 'transparent',
                        color: isToday ? '#fff' : 'text.primary',
                        fontWeight: isToday ? 700 : 400,
                        fontSize: '0.8rem',
                        mb: 0.5,
                      }}
                    >
                      {day}
                    </Box>
                    {events.map((ev, j) => (
                      <Chip
                        key={j}
                        label={ev.title}
                        size="small"
                        sx={{
                          height: 18, fontSize: '0.6rem', mb: 0.25, maxWidth: '100%',
                          bgcolor: ev.color + '20', color: ev.color, fontWeight: 600,
                          '& .MuiChip-label': { px: 0.5 },
                          display: isMobile ? 'none' : 'flex',
                        }}
                      />
                    ))}
                    {isMobile && events.length > 0 && (
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: events[0].color, mx: 'auto' }} />
                    )}
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </Box>
  );
}
