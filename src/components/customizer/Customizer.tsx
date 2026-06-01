'use client';

import { useState } from 'react';
import {
  Box, Drawer, IconButton, Typography, Divider,
  Tooltip, Switch, FormControlLabel,
} from '@mui/material';
import { Settings, Close, LightMode, DarkMode } from '@mui/icons-material';
import { useColorMode } from '@/components/ThemeProvider';
import { useSidebar } from '@/components/layout/SidebarProvider';

const THEME_COLORS = [
  { label: 'Blue',   value: '#0085db' },
  { label: 'Purple', value: '#7C3AED' },
  { label: 'Green',  value: '#059669' },
  { label: 'Orange', value: '#EA580C' },
  { label: 'Pink',   value: '#DB2777' },
  { label: 'Teal',   value: '#0D9488' },
];

export default function Customizer() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useColorMode();
  const { mini, toggleMini } = useSidebar();

  const applyColor = (hex: string) => {
    document.documentElement.style.setProperty('--primary', hex);
  };

  return (
    <>
      {/* FAB trigger */}
      <Tooltip title="Customize" placement="left">
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'primary.main',
            color: '#fff',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px 0 0 8px',
            cursor: 'pointer',
            zIndex: 1300,
            boxShadow: '-2px 0 12px rgba(0,0,0,0.2)',
            '&:hover': { bgcolor: 'primary.dark' },
            animation: 'spin 4s linear infinite',
            '@keyframes spin': {
              from: { transform: 'translateY(-50%) rotate(0deg)' },
              to:   { transform: 'translateY(-50%) rotate(360deg)' },
            },
          }}
        >
          <Settings fontSize="small" />
        </Box>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 0,
            bgcolor: 'background.paper',
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: 'primary.main' }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>Settings</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>Customize your template</Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 2.5, overflowY: 'auto', flex: 1 }}>
          {/* Theme Mode */}
          <Typography variant="overline" color="text.disabled" fontWeight={700} letterSpacing={1.2}>
            Theme Mode
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1, mb: 3 }}>
            {(['light', 'dark'] as const).map((m) => (
              <Box
                key={m}
                onClick={() => mode !== m && toggleMode()}
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid',
                  borderColor: mode === m ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                  bgcolor: m === 'dark' ? '#111c2d' : '#F0F5F9',
                  transition: 'border-color 0.2s',
                }}
              >
                {m === 'light'
                  ? <LightMode sx={{ color: '#fb977d', fontSize: 22 }} />
                  : <DarkMode   sx={{ color: '#46caeb', fontSize: 22 }} />}
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: m === 'dark' ? '#fff' : '#111c2d', textTransform: 'capitalize' }}
                >
                  {m}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Theme Color */}
          <Typography variant="overline" color="text.disabled" fontWeight={700} letterSpacing={1.2}>
            Theme Color
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mt: 1, mb: 3 }}>
            {THEME_COLORS.map(({ label, value }) => (
              <Tooltip key={value} title={label}>
                <Box
                  onClick={() => applyColor(value)}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: value,
                    cursor: 'pointer',
                    border: '3px solid',
                    borderColor: 'transparent',
                    transition: 'transform 0.15s, border-color 0.15s',
                    '&:hover': {
                      transform: 'scale(1.15)',
                      borderColor: value,
                      filter: 'brightness(1.1)',
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Sidebar */}
          <Typography variant="overline" color="text.disabled" fontWeight={700} letterSpacing={1.2}>
            Sidebar
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={mini}
                  onChange={toggleMini}
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Mini Sidebar</Typography>}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
