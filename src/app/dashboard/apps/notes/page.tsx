'use client';

import { Box, Typography, Card, Chip, Grid } from '@mui/material';

const notes = [
  { id: 1, title: 'Project Roadmap', preview: 'Define Q2 milestones and deliverables for the product team...', date: 'May 28, 2026', color: '#0085db', tags: ['work', 'planning'] },
  { id: 2, title: 'Meeting Notes', preview: 'Discussed new feature requirements with stakeholders. Key takeaways:...', date: 'May 27, 2026', color: '#39b69a', tags: ['meeting'] },
  { id: 3, title: 'Shopping List', preview: 'Groceries, cleaning supplies, new headphones, birthday gift for...', date: 'May 26, 2026', color: '#fb977d', tags: ['personal'] },
  { id: 4, title: 'Bug Tracker', preview: 'Critical: Login timeout on Safari. Medium: Chart tooltip misalignment...', date: 'May 25, 2026', color: '#46caeb', tags: ['bugs', 'urgent'] },
  { id: 5, title: 'Book Recommendations', preview: 'The Pragmatic Programmer, Clean Architecture, Designing Data...', date: 'May 24, 2026', color: '#7c3aed', tags: ['reading'] },
  { id: 6, title: 'API Design Notes', preview: 'REST conventions: use plural nouns, version prefix, consistent error...', date: 'May 23, 2026', color: '#f59e0b', tags: ['work', 'technical'] },
];

export default function NotesPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={0.5}>Notes</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Your quick notes and reminders</Typography>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} lg={4} key={note.id}>
            <Card
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderLeftColor: note.color,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-card)' },
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} mb={0.5}>{note.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1.5 }}>
                {note.preview}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {note.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                  ))}
                </Box>
                <Typography variant="caption" color="text.disabled">{note.date}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
