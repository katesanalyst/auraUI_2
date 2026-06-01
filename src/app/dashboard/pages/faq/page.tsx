'use client';

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  { q: 'What is Spike Admin?', a: 'Spike Admin is a modern, responsive admin dashboard template built with Next.js and Material UI. It provides a comprehensive set of UI components and pages for building web applications.' },
  { q: 'Is it responsive?', a: 'Yes, Spike Admin is fully responsive and works on all screen sizes including mobile, tablet, and desktop. It includes a collapsible sidebar and adaptive layouts.' },
  { q: 'Does it support PWA?', a: 'Yes, Spike Admin includes full PWA support with a service worker, manifest file, and install prompt. Users can install it as a native-like app on their devices.' },
  { q: 'What tech stack is used?', a: 'Spike Admin uses Next.js 15, React 19, Material UI v6, ApexCharts for data visualization, and TypeScript for type safety.' },
  { q: 'Can I customize the theme?', a: 'Absolutely. The theme is centralized in src/theme/theme.ts. You can change colors, typography, spacing, and component defaults easily.' },
  { q: 'Is authentication included?', a: 'Yes, the template includes login, register, forgot password, and two-step verification pages. You can integrate with NextAuth or your own auth backend.' },
  { q: 'How do I add new pages?', a: 'Create a new folder under src/app/dashboard/ with a page.tsx file. The dashboard layout with sidebar and header is applied automatically.' },
  { q: 'Where can I get support?', a: 'For support, please reach out through the documentation or contact the development team directly via email.' },
];

export default function FAQPage() {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>Frequently Asked Questions</Typography>
        <Typography variant="body1" color="text.secondary">Find answers to common questions</Typography>
      </Box>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {faqs.map((faq, i) => (
          <Accordion key={i} defaultExpanded={i === 0} sx={{ borderRadius: 'var(--radius-lg) !important', mb: 1.5, '&:before': { display: 'none' }, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body1" fontWeight={600}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" lineHeight={1.8}>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
