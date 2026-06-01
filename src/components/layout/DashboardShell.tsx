'use client';

import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useSidebar } from './SidebarProvider';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { mini, mobileOpen, toggleMini, setMobileOpen } = useSidebar();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        mini={mini}
        onToggle={toggleMini}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, lg: mini ? 'var(--sidebar-mini-width)' : 'var(--sidebar-width)' },
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
          onToggleMini={toggleMini}
        />
        {children}
      </Box>
    </Box>
  );
}
