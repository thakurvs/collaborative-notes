import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectSharedNotes } from '../../features/notes/notesSlice';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const SharedNotes: React.FC = () => {
  const sharedNotes = useAppSelector(selectSharedNotes) as Array<{
    _id: string;
    title: string;
    owner: {
      displayName?: string;
      email: string;
    };
  }>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Shared With Me</Typography>
      {sharedNotes.length === 0 ? (
        <Typography>No notes shared with you yet</Typography>
      ) : (
        <List>
          {sharedNotes.map((note) => (
            <React.Fragment key={note._id}>
              <ListItem component={Link} to={`/notes/${note._id}`}>
                <ListItemText
                  primary={note.title}
                  secondary={`Shared by: ${note.owner.displayName || note.owner.email}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SharedNotes;