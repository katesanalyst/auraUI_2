'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Chip, Avatar, AvatarGroup,
  IconButton, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Tooltip,
} from '@mui/material';
import {
  Add, MoreHoriz, AttachFile, ChatBubbleOutline,
  FlagOutlined, CalendarToday, Close,
} from '@mui/icons-material';
import {
  DragDropContext, Droppable, Draggable, DropResult,
} from '@hello-pangea/dnd';

type Priority = 'low' | 'medium' | 'high';
type KanbanCard = {
  id: string;
  title: string;
  description: string;
  tags: { label: string; color: string }[];
  priority: Priority;
  assignees: string[];
  dueDate: string;
  comments: number;
  attachments: number;
};
type Column = { id: string; title: string; color: string; cards: KanbanCard[] };

const PRIORITY_COLOR: Record<Priority, string> = {
  low: '#39b69a', medium: '#fb977d', high: '#f44336',
};

const AVATARS = ['A', 'B', 'C', 'D', 'E', 'F'];
const AVATAR_COLORS = ['#0085db', '#46caeb', '#39b69a', '#fb977d', '#7C3AED', '#f0c040'];

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'pending', title: 'Pending', color: '#fb977d',
    cards: [
      { id: 'c1', title: 'Redesign landing page hero section', description: 'Update the hero with new brand colors and typography.', tags: [{ label: 'Design', color: '#7C3AED' }, { label: 'UI', color: '#0085db' }], priority: 'high', assignees: ['A', 'B'], dueDate: 'Dec 28', comments: 3, attachments: 2 },
      { id: 'c2', title: 'Set up CI/CD pipeline for staging', description: 'Configure GitHub Actions for automated deployments.', tags: [{ label: 'DevOps', color: '#39b69a' }], priority: 'medium', assignees: ['C'], dueDate: 'Jan 5', comments: 1, attachments: 0 },
      { id: 'c3', title: 'Write unit tests for auth module', description: 'Cover edge cases for login and token refresh flows.', tags: [{ label: 'Testing', color: '#fb977d' }], priority: 'low', assignees: ['D', 'E'], dueDate: 'Jan 10', comments: 0, attachments: 1 },
    ],
  },
  {
    id: 'inprogress', title: 'In Progress', color: '#0085db',
    cards: [
      { id: 'c4', title: 'API integration for payment gateway', description: 'Connect Stripe API with order processing flow.', tags: [{ label: 'Backend', color: '#46caeb' }, { label: 'Payments', color: '#39b69a' }], priority: 'high', assignees: ['A', 'C', 'F'], dueDate: 'Dec 30', comments: 5, attachments: 3 },
      { id: 'c5', title: 'Mobile responsive tables', description: 'Make data tables scroll horizontally on small screens.', tags: [{ label: 'Frontend', color: '#0085db' }], priority: 'medium', assignees: ['B'], dueDate: 'Jan 3', comments: 2, attachments: 0 },
    ],
  },
  {
    id: 'review', title: 'In Review', color: '#f0c040',
    cards: [
      { id: 'c6', title: 'Dashboard analytics charts', description: 'ApexCharts integration for KPI visualization.', tags: [{ label: 'Charts', color: '#f0c040' }, { label: 'Frontend', color: '#0085db' }], priority: 'medium', assignees: ['D', 'E'], dueDate: 'Dec 26', comments: 4, attachments: 2 },
      { id: 'c7', title: 'Dark mode implementation', description: 'Theme toggle with CSS variable switching.', tags: [{ label: 'UI', color: '#0085db' }], priority: 'low', assignees: ['A'], dueDate: 'Dec 25', comments: 1, attachments: 0 },
    ],
  },
  {
    id: 'done', title: 'Done', color: '#39b69a',
    cards: [
      { id: 'c8', title: 'User authentication system', description: 'NextAuth v5 with JWT and credential provider.', tags: [{ label: 'Auth', color: '#7C3AED' }, { label: 'Security', color: '#f44336' }], priority: 'high', assignees: ['C', 'D'], dueDate: 'Dec 20', comments: 6, attachments: 4 },
      { id: 'c9', title: 'Database schema design', description: 'ERD and Prisma schema for core entities.', tags: [{ label: 'Backend', color: '#46caeb' }], priority: 'medium', assignees: ['B', 'F'], dueDate: 'Dec 18', comments: 3, attachments: 1 },
      { id: 'c10', title: 'Project setup and scaffolding', description: 'Next.js 15, MUI v6, TypeScript, monorepo config.', tags: [{ label: 'Setup', color: '#39b69a' }], priority: 'low', assignees: ['A'], dueDate: 'Dec 15', comments: 2, attachments: 0 },
    ],
  },
];

function KanbanCardComp({ card, index }: { card: KanbanCard; index: number }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 'var(--radius-md)',
            p: 2,
            mb: 1.5,
            boxShadow: snapshot.isDragging
              ? '0 8px 24px rgba(0,0,0,0.18)'
              : '0 1px 4px rgba(0,0,0,0.06)',
            cursor: 'grab',
            transition: 'box-shadow 0.2s',
            '&:active': { cursor: 'grabbing' },
            border: '1px solid',
            borderColor: snapshot.isDragging ? 'primary.main' : 'divider',
          }}
        >
          {/* Tags */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.25 }}>
            {card.tags.map((t) => (
              <Chip key={t.label} label={t.label} size="small"
                sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, bgcolor: t.color + '20', color: t.color, border: 'none' }} />
            ))}
          </Box>

          {/* Title */}
          <Typography variant="body2" fontWeight={600} mb={0.75} sx={{ lineHeight: 1.4 }}>
            {card.title}
          </Typography>

          {/* Description */}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
            {card.description}
          </Typography>

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Priority */}
              <Tooltip title={`${card.priority} priority`}>
                <FlagOutlined sx={{ fontSize: 14, color: PRIORITY_COLOR[card.priority] }} />
              </Tooltip>
              {/* Due date */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <CalendarToday sx={{ fontSize: 11, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled" fontSize="0.65rem">{card.dueDate}</Typography>
              </Box>
              {/* Comments */}
              {card.comments > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <ChatBubbleOutline sx={{ fontSize: 11, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.disabled" fontSize="0.65rem">{card.comments}</Typography>
                </Box>
              )}
              {/* Attachments */}
              {card.attachments > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <AttachFile sx={{ fontSize: 11, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.disabled" fontSize="0.65rem">{card.attachments}</Typography>
                </Box>
              )}
            </Box>

            {/* Assignees */}
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 22, height: 22, fontSize: '0.6rem', border: '1.5px solid', borderColor: 'background.paper' } }}>
              {card.assignees.map((a) => (
                <Avatar key={a} sx={{ bgcolor: AVATAR_COLORS[AVATARS.indexOf(a) % AVATAR_COLORS.length], width: 22, height: 22, fontSize: '0.6rem' }}>
                  {a}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [addOpen, setAddOpen] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const cols = columns.map((c) => ({ ...c, cards: [...c.cards] }));
    const srcCol = cols.find((c) => c.id === source.droppableId)!;
    const dstCol = cols.find((c) => c.id === destination.droppableId)!;
    const [moved] = srcCol.cards.splice(source.index, 1);
    dstCol.cards.splice(destination.index, 0, moved);
    setColumns(cols);
  };

  const addCard = (colId: string) => {
    if (!newTitle.trim()) return;
    const cols = columns.map((c) => {
      if (c.id !== colId) return c;
      return {
        ...c,
        cards: [{
          id: `c${Date.now()}`,
          title: newTitle.trim(),
          description: '',
          tags: [],
          priority: newPriority,
          assignees: ['A'],
          dueDate: 'TBD',
          comments: 0,
          attachments: 0,
        }, ...c.cards],
      };
    });
    setColumns(cols);
    setNewTitle('');
    setAddOpen(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Kanban Board</Typography>
          <Typography variant="body2" color="text.secondary">Drag cards between columns to update status</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} size="small">Add List</Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2.5, overflowX: 'auto', pb: 2, alignItems: 'flex-start' }}>
          {columns.map((col) => (
            <Box key={col.id} sx={{ minWidth: 280, maxWidth: 280, flexShrink: 0 }}>
              {/* Column Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, px: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: col.color }} />
                  <Typography variant="body2" fontWeight={700}>{col.title}</Typography>
                  <Chip label={col.cards.length} size="small"
                    sx={{ height: 18, fontSize: '0.65rem', bgcolor: col.color + '20', color: col.color, fontWeight: 700 }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setAddOpen(col.id)}>
                    <Add fontSize="small" />
                  </IconButton>
                  <IconButton size="small"><MoreHoriz fontSize="small" /></IconButton>
                </Box>
              </Box>

              {/* Drop Zone */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 80,
                      borderRadius: 'var(--radius-md)',
                      bgcolor: snapshot.isDraggingOver
                        ? col.color + '10'
                        : 'transparent',
                      transition: 'background-color 0.2s',
                      p: snapshot.isDraggingOver ? 0.5 : 0,
                    }}
                  >
                    {col.cards.map((card, i) => (
                      <KanbanCardComp key={card.id} card={card} index={i} />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>

              {/* Add card shortcut */}
              <Button
                fullWidth size="small" startIcon={<Add />}
                onClick={() => setAddOpen(col.id)}
                sx={{ mt: 0.5, color: 'text.disabled', justifyContent: 'flex-start', '&:hover': { color: 'primary.main' } }}
              >
                Add card
              </Button>
            </Box>
          ))}
        </Box>
      </DragDropContext>

      {/* Add Card Dialog */}
      <Dialog open={!!addOpen} onClose={() => setAddOpen(null)} maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 'var(--radius-lg)' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Card
          <IconButton size="small" onClick={() => setAddOpen(null)}><Close fontSize="small" /></IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Card Title" value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCard(addOpen!)}
            sx={{ mb: 2, mt: 0.5 }} size="small" />
          <TextField select fullWidth label="Priority" value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)} size="small">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <MenuItem key={p} value={p} sx={{ textTransform: 'capitalize' }}>{p}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(null)}>Cancel</Button>
          <Button variant="contained" onClick={() => addCard(addOpen!)}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
