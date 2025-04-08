import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectAllNotes } from '../../features/notes/notesSlice';
import { List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const NotesList: React.FC = () => {
  const notes = useAppSelector(selectAllNotes);

  return (
    <List>
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
              secondary={`Last updated: ${new Date(note.updatedAt).toLocaleString()}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotesList;