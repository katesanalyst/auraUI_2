'use client';

import { Box, Typography, Button, Card, Grid, Avatar, Container } from '@mui/material';
import { Speed, Security, Devices, Code, Star } from '@mui/icons-material';

const features = [
  { icon: <Speed />, title: 'Lightning Fast', desc: 'Built on Next.js 15 with optimized performance and instant page loads.' },
  { icon: <Security />, title: 'Secure by Default', desc: 'Enterprise-grade security with authentication and role-based access.' },
  { icon: <Devices />, title: 'Fully Responsive', desc: 'Looks perfect on desktop, tablet, and mobile with adaptive layouts.' },
];

const testimonials = [
  { name: 'Sarah K.', role: 'CTO, TechCorp', text: 'Spike Admin saved us months of development time. The quality is outstanding.', avatar: 'SK' },
  { name: 'Mike R.', role: 'Lead Dev, StartupXYZ', text: 'Best admin template we\'ve used. Clean code, great design, fully responsive.', avatar: 'MR' },
];

export default function LandingPage() {
  return (
    <Box sx={{ mx: { xs: -2, sm: -3 } }}>
      {/* Hero */}
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: { xs: 8, md: 12 }, px: 3, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)', top: -80, right: -80 }} />
        <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', bottom: -60, left: -60 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" fontWeight={800} mb={2} sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>Build Amazing Dashboards</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400 }}>The most complete admin template with 100+ components, responsive design, and PWA support.</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: '#fff', color: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}>Get Started</Button>
            <Button variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', '&:hover': { borderColor: '#fff' } }}>Live Preview</Button>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>Why Choose Spike?</Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={5}>Everything you need to build modern web applications</Typography>
          <Grid container spacing={4}>
            {features.map(f => (
              <Grid item xs={12} md={4} key={f.title}>
                <Card sx={{ p: 4, borderRadius: 'var(--radius-lg)', textAlign: 'center', height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'primary.light', borderRadius: '16px' }}>{f.icon}</Avatar>
                  <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 3, bgcolor: 'var(--bg-body)' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={5}>What People Say</Typography>
          <Grid container spacing={3}>
            {testimonials.map(t => (
              <Grid item xs={12} sm={6} key={t.name}>
                <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', height: '100%' }}>
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2, color: '#ffc107' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} fontSize="small" />)}
                  </Box>
                  <Typography variant="body2" mb={2} lineHeight={1.8}>&ldquo;{t.text}&rdquo;</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: '10px', fontSize: '0.8rem' }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{t.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 3, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={700} mb={2}>Ready to Get Started?</Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>Join thousands of developers building with Spike Admin.</Typography>
          <Button variant="contained" size="large">Start Building Now</Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, px: 3, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">© 2026 Spike Admin. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}
