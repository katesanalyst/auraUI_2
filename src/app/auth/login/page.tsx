'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError('Invalid credentials. Use demo1234@gmail.com / demo1234');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -125,
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'warning.main',
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -65,
          right: -60,
          width: 304,
          height: 315,
          background: 'url(/images/backgrounds/shap-login.png) no-repeat',
          backgroundSize: 'contain',
          opacity: 0.5,
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: 400, sm: 500, lg: 1320 },
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            minHeight: { lg: 600 },
          }}
        >
          {/* Left side - Illustration (desktop only) */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              flex: 1,
              bgcolor: 'primary.main',
              alignItems: 'center',
              justifyContent: 'center',
              p: 6,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ textAlign: 'center', color: '#fff', zIndex: 1 }}>
              <Typography variant="h3" fontWeight={700} mb={2}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 300, mx: 'auto' }}>
                Sign in to continue to Spike Admin Dashboard
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                width: 200,
                height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.1)',
                top: -40,
                right: -40,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: 150,
                height: 150,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.08)',
                bottom: -30,
                left: -30,
              }}
            />
          </Box>

          {/* Right side - Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4, lg: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                S
              </Box>
              <Typography variant="h5" fontWeight={700}>
                Spike
              </Typography>
            </Box>

            <Typography variant="h4" fontWeight={700} mb={1}>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Enter your credentials to access your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 'var(--radius-lg)' }}>
                {error}
              </Alert>
            )}

            {/* Social login buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: 'var(--radius-xl)',
                  borderColor: 'divider',
                  color: 'text.primary',
                  py: 1.5,
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: 'var(--radius-xl)',
                  borderColor: 'divider',
                  color: 'text.primary',
                  py: 1.5,
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                GitHub
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.disabled">
                or sign in with
              </Typography>
            </Divider>

            <form onSubmit={handleSubmit}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                sx={{ mb: 2.5 }}
                size="small"
                disabled={loading}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>
                  Password
                </Typography>
                <MuiLink component={Link} href="/auth/forgot-password" variant="caption" color="primary">
                  Forgot Password?
                </MuiLink>
              </Box>
              <TextField
                fullWidth
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                sx={{ mb: 2 }}
                size="small"
                disabled={loading}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <FormControlLabel
                control={<Checkbox size="small" color="primary" />}
                label={<Typography variant="body2">Remember this Device</Typography>}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mb: 3, py: 1.5, fontWeight: 600 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </form>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              New to Spike?{' '}
              <MuiLink component={Link} href="/auth/register" fontWeight={600}>
                Create an account
              </MuiLink>
            </Typography>

            <Alert severity="info" sx={{ mt: 3, borderRadius: 'var(--radius-lg)' }}>
              <Typography variant="caption">
                Demo: <strong>demo1234@gmail.com</strong> / <strong>demo1234</strong>
              </Typography>
            </Alert>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
