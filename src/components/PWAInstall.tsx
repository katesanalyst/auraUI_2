'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar, IconButton } from '@mui/material';
import { Close, InstallMobile } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <Snackbar
      open={showInstall}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 2 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <InstallMobile color="primary" />
        <Box>
          <Typography variant="body2" fontWeight={600}>
            Install Spike Admin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Add to home screen for quick access
          </Typography>
        </Box>
        <Button variant="contained" size="small" onClick={handleInstall}>
          Install
        </Button>
        <IconButton size="small" onClick={() => setShowInstall(false)}>
          <Close fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
}
