'use client';

import { Box, Typography, Card, Grid, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const plans = [
  { name: 'Basic', price: 9, features: ['5 Projects', '10GB Storage', 'Email Support', 'Basic Analytics', { text: 'Custom Domain', included: false }, { text: 'Priority Support', included: false }], popular: false },
  { name: 'Pro', price: 29, features: ['50 Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain', { text: 'White Label', included: false }], popular: true },
  { name: 'Enterprise', price: 99, features: ['Unlimited Projects', '1TB Storage', '24/7 Support', 'Advanced Analytics', 'Custom Domain', 'White Label'], popular: false },
];

export default function PricingPage() {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>Pricing Plans</Typography>
        <Typography variant="body1" color="text.secondary">Choose the plan that fits your needs</Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {plans.map(plan => (
          <Grid item xs={12} sm={6} lg={4} key={plan.name}>
            <Card sx={{ p: 4, borderRadius: 'var(--radius-lg)', border: plan.popular ? '2px solid' : '1px solid', borderColor: plan.popular ? 'primary.main' : 'var(--border)', position: 'relative', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-card)' } }}>
              {plan.popular && <Chip label="Most Popular" color="primary" size="small" sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 600 }} />}
              <Typography variant="h6" fontWeight={600} color="text.secondary">{plan.name}</Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="h2" fontWeight={700} component="span">${plan.price}</Typography>
                <Typography variant="body2" color="text.secondary" component="span">/month</Typography>
              </Box>
              <Button variant={plan.popular ? 'contained' : 'outlined'} fullWidth sx={{ mb: 3 }}>Get Started</Button>
              <List dense>
                {plan.features.map((f, i) => {
                  const text = typeof f === 'string' ? f : f.text;
                  const included = typeof f === 'string' ? f !== undefined : f.included;
                  return (
                    <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {included !== false ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="disabled" fontSize="small" />}
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" sx={{ color: included !== false ? 'text.primary' : 'text.disabled' }}>{text}</Typography>} />
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
