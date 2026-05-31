'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mini, setMini] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--bg-body)' }}>
      <Sidebar
        mini={mini}
        onToggle={() => setMini(!mini)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, sm: mini ? 'var(--sidebar-mini-width)' : 'var(--sidebar-width)' },
          p: { xs: 2, sm: 3 },
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
          mini={mini}
          onToggleMini={() => setMini(!mini)}
        />
        {children}
      </Box>
    </Box>
  );
}
