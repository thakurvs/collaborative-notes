import React from 'react';
import { useAppSelector } from '../store/store';
import { selectAllNotes } from '../features/notes/notesSlice';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const NotesList: React.FC = () => {
  const notes = useAppSelector(selectAllNotes);

  if (notes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <NoteAddIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          No notes yet. Create your first note!
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notes.map((note) => (
        <React.Fragment key={note._id}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" component={Link} to={`/notes/${note._id}`}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={note.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block' }}
                  >
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                  </Typography>
                  {note.tags?.length > 0 && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      Tags: {note.tags.join(', ')}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotesList;