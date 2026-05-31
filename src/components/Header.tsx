'use client';

import {
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  DarkMode,
  LightMode,
  PersonOutline,
  Settings,
  Logout,
  Fullscreen,
  Language,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  mini: boolean;
  onToggleMini: () => void;
}

export default function Header({ onMenuClick, mini, onToggleMini }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box
      component="header"
      sx={{
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        borderRadius: 'var(--radius-lg)',
        mb: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Left: Menu + Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={isMobile ? onMenuClick : onToggleMini} size="small">
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            bgcolor: 'var(--bg-body)',
            borderRadius: 'var(--radius-xl)',
            px: 2,
            py: 0.5,
            minWidth: 200,
          }}
        >
          <Search sx={{ fontSize: 20, color: 'text.disabled', mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ fontSize: '0.875rem', flex: 1 }} />
        </Box>
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
        {!isMobile && (
          <IconButton size="small">
            <Language fontSize="small" />
          </IconButton>
        )}
        <IconButton size="small">
          <ChatBubbleOutline fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={(e) => setNotifAnchor(e.currentTarget)}>
          <Badge badgeContent={4} color="primary" variant="dot">
            <Notifications fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton size="small">
          <Fullscreen fontSize="small" sx={{ display: { xs: 'none', sm: 'block' } }} />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />

        {/* User Menu */}
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            borderRadius: 'var(--radius-xl)',
            px: 1,
            py: 0.5,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Avatar sx={{ width: 35, height: 35, borderRadius: '12px', bgcolor: 'primary.light' }}>
            <PersonOutline sx={{ color: 'primary.main', fontSize: 20 }} />
          </Avatar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
              John Doe
            </Typography>
            <Typography variant="caption" color="text.disabled" fontSize="0.7rem">
              Admin
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={() => setNotifAnchor(null)}
        PaperProps={{ sx: { width: 320, borderRadius: 'var(--radius-lg)', mt: 1 } }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {['New order received', 'Server limit reached', 'New registration'].map((text, i) => (
          <MenuItem key={i} onClick={() => setNotifAnchor(null)}>
            <ListItemIcon>
              <Badge color={i === 1 ? 'warning' : 'primary'} variant="dot">
                <Notifications fontSize="small" />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={text} secondary="Just now" />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="primary">
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 220, borderRadius: 'var(--radius-lg)', mt: 1 } }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><PersonOutline fontSize="small" /></ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
