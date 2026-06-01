import { createTheme, Theme } from '@mui/material/styles';

const baseComponents: Theme['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 25,
        padding: '8px 22px',
        fontSize: '0.9375rem',
        fontWeight: 500,
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
      containedPrimary: {
        '&:hover': { backgroundColor: '#006bb3' },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        boxShadow: '0 2px 30px 15px rgba(37,83,185,.1)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 18,
          '& fieldset': { borderColor: '#DFE5EF' },
          '&:hover fieldset': { borderColor: '#0085db' },
          '&.Mui-focused fieldset': { borderColor: '#0085db', borderWidth: 2 },
        },
      },
    },
  },
  MuiChip: { styleOverrides: { root: { borderRadius: 8 } } },
  MuiAvatar: { styleOverrides: { root: { borderRadius: 12 } } },
};

const baseTypography = {
  fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif",
  fontSize: 14,
  h1: { fontWeight: 700, fontSize: '2rem', lineHeight: '2.5rem' },
  h2: { fontWeight: 700, fontSize: '1.75rem', lineHeight: '2.25rem' },
  h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.75rem' },
  h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: '1.5rem' },
  h5: { fontWeight: 600, fontSize: '1rem', lineHeight: '1.2rem' },
  h6: { fontWeight: 600, fontSize: '0.875rem', lineHeight: '1.1rem' },
  body1: { fontSize: '0.875rem', lineHeight: '1.75' },
  body2: { fontSize: '0.75rem', lineHeight: '1.334rem' },
  button: { textTransform: 'none' as const, fontWeight: 500 },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0085db', light: '#e5f3fb', dark: '#006bb3', contrastText: '#ffffff' },
    secondary: { main: '#46caeb', light: '#e1f5fa', dark: '#3aa8c7', contrastText: '#ffffff' },
    warning: { main: '#fb977d', light: '#fde8e2', dark: '#f57a5a' },
    error: { main: '#f44336', light: '#fdecea', dark: '#c62828' },
    success: { main: '#39b69a', light: '#e6f7f3' },
    info: { main: '#46caeb', light: '#e1f5fa' },
    background: { default: '#F0F5F9', paper: '#ffffff' },
    text: { primary: '#111c2d', secondary: '#5a6264', disabled: '#8a929a' },
    divider: '#e5eaef',
  },
  typography: baseTypography,
  shape: { borderRadius: 18 },
  components: baseComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0085db', light: '#1a3a5c', dark: '#006bb3', contrastText: '#ffffff' },
    secondary: { main: '#46caeb', light: '#1a3a45', dark: '#3aa8c7', contrastText: '#ffffff' },
    warning: { main: '#fb977d', light: '#3a2218', dark: '#f57a5a' },
    error: { main: '#f44336', light: '#3a1515', dark: '#c62828' },
    success: { main: '#39b69a', light: '#1a3530' },
    info: { main: '#46caeb', light: '#1a3a45' },
    background: { default: '#0f1214', paper: '#1a2234' },
    text: { primary: '#e8eaf0', secondary: '#8a929a', disabled: '#4a5568' },
    divider: '#2a3a4a',
  },
  typography: baseTypography,
  shape: { borderRadius: 18 },
  components: {
    ...baseComponents,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 2px 20px 8px rgba(0,0,0,0.3)',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 18,
            '& fieldset': { borderColor: '#2a3a4a' },
            '&:hover fieldset': { borderColor: '#0085db' },
            '&.Mui-focused fieldset': { borderColor: '#0085db', borderWidth: 2 },
          },
        },
      },
    },
  },
});

export default lightTheme;
