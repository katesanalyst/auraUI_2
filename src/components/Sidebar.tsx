'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Drawer,
  useMediaQuery,
  useTheme,
  Divider,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Apps,
  Description,
  EditNote,
  TableChart,
  BarChart,
  Widgets,
  Lock,
  Build,
  Circle,
  ExpandMore,
  ChevronRight,
  Close,
  PersonOutline,
  ConfirmationNumber,
  ViewKanban,
  Receipt,
  Category,
} from '@mui/icons-material';
import { sidebarNav, NavItem } from '@/lib/navigation';

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <Dashboard fontSize="small" />,
  Apps: <Apps fontSize="small" />,
  Description: <Description fontSize="small" />,
  EditNote: <EditNote fontSize="small" />,
  TableChart: <TableChart fontSize="small" />,
  BarChart: <BarChart fontSize="small" />,
  Widgets: <Widgets fontSize="small" />,
  Lock: <Lock fontSize="small" />,
  Build: <Build fontSize="small" />,
  ConfirmationNumber: <ConfirmationNumber fontSize="small" />,
  ViewKanban: <ViewKanban fontSize="small" />,
  Receipt: <Receipt fontSize="small" />,
  Category: <Category fontSize="small" />,
  Circle: <Circle sx={{ fontSize: 8 }} />,
};

interface SidebarProps {
  mini: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavItemComponent({ item, mini, depth = 0 }: { item: NavItem; mini: boolean; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const isActive =
    item.href === '/dashboard'
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(item.href + '/');

  const handleClick = () => {
    if (hasChildren) setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block', px: 1 }}>
        <ListItemButton
          component={hasChildren ? 'button' : Link}
          href={hasChildren ? undefined : item.href}
          onClick={handleClick}
          sx={{
            minHeight: 44,
            borderRadius: '10px',
            px: mini ? 1.5 : 2,
            mx: 0.5,
            mb: 0.25,
            backgroundColor: isActive && !hasChildren ? 'primary.main' : 'transparent',
            color: isActive && !hasChildren ? 'primary.contrastText' : 'text.secondary',
            '&:hover': {
              backgroundColor: isActive && !hasChildren ? 'primary.main' : 'action.hover',
            },
            justifyContent: mini ? 'center' : 'initial',
            pl: mini ? 1.5 : depth > 0 ? 4 : 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: mini ? 0 : 36,
              mr: mini ? 0 : 1,
              color: 'inherit',
              justifyContent: 'center',
            }}
          >
            {iconMap[item.icon] || <Circle fontSize="small" />}
          </ListItemIcon>
          {!mini && (
            <>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: depth > 0 ? '0.8rem' : '0.875rem',
                  fontWeight: isActive && !hasChildren ? 600 : 400,
                }}
              />
              {item.chip && (
                <Chip
                  label={item.chip}
                  size="small"
                  color={(item.chipColor as 'primary' | 'secondary') || 'primary'}
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              )}
              {hasChildren && (open ? <ExpandMore fontSize="small" /> : <ChevronRight fontSize="small" />)}
            </>
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && !mini && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <NavItemComponent key={child.href} item={child} mini={mini} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function SidebarContent({ mini }: { mini: boolean }) {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'John Doe';
  const userRole = (session?.user as { role?: string })?.role ?? 'Admin';

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'var(--bg-sidebar)' }}>
      {/* Logo */}
      <Box sx={{ p: mini ? 2 : 3, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1.1rem',
          }}
        >
          S
        </Avatar>
        {!mini && (
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            Spike
          </Typography>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* User */}
      <Box sx={{ p: mini ? 1.5 : 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
        >
          <Avatar sx={{ width: 40, height: 40, borderRadius: '12px' }}>
            <PersonOutline />
          </Avatar>
        </Badge>
        {!mini && (
          <Box>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
              {userName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-sidebar)' }}>
              {userRole}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1, '&::-webkit-scrollbar': { width: 0 } }}>
        <List component="nav" disablePadding>
          {sidebarNav.map((item) => (
            <NavItemComponent key={item.href} item={item} mini={mini} />
          ))}
        </List>
      </Box>

      {/* Footer */}
      {!mini && (
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="caption" sx={{ color: 'var(--text-sidebar)' }}>
            Spike Admin Template
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function Sidebar({ mini, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [hovered, setHovered] = useState(false);

  // When in mini mode, hovering temporarily expands the sidebar as an overlay.
  // Main content margin does not change — expanded sidebar floats over content.
  const isExpanded = !mini || hovered;

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 'var(--sidebar-width)',
            border: 'none',
            bgcolor: 'var(--bg-sidebar)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onMobileClose} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </Box>
        <SidebarContent mini={false} />
      </Drawer>

      {/* Desktop sidebar */}
      <Box
        component="aside"
        onMouseEnter={() => mini && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: isExpanded ? 'var(--sidebar-width)' : 'var(--sidebar-mini-width)',
          flexShrink: 0,
          transition: 'width 0.25s ease, box-shadow 0.25s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1200,
          bgcolor: 'var(--bg-sidebar)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          // Elevate when hover-expanded in mini mode so it floats over content
          boxShadow: mini && hovered ? '4px 0 24px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <SidebarContent mini={!isExpanded} />
      </Box>
    </>
  );
}
