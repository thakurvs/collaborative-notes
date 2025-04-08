import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getNoteById, saveNote, updateCurrentNoteContent } from '../../features/notes/notesSlice';
import { selectCurrentNote } from '../../features/notes/notesSlice';
import useAutoSave from '../../hooks/useAutoSave';
import io  from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { Box, TextField, Typography, Button } from '@mui/material';

const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector(selectCurrentNote);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_BASE_URL || '');
    setSocket(newSocket);
    return () => { newSocket.disconnect(); };
  }, []);

  useEffect(() => {
    if (socket && id) {
      socket.emit('join-note', id);
      socket.on('note-updated', (updates: { content: string }) => {
        if (updates.content && updates.content !== content) {
          setContent(updates.content);
          dispatch(updateCurrentNoteContent(updates.content));
        }
      });
      return () => { socket.off('note-updated'); };
    }
  }, [socket, id, dispatch, content]);

  useEffect(() => {
    if (id) dispatch(getNoteById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentNote) setContent(currentNote.content);
  }, [currentNote]);

  useAutoSave(id, content);

  if (!currentNote) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">{currentNote.title}</Typography>
        <Button onClick={() => navigate('/notes')} variant="outlined">
          Back to Notes
        </Button>
      </Box>
      <TextField
        fullWidth
        multiline
        minRows={20}
        variant="outlined"
        value={content}
        onChange={(e) => {
          const newContent = e.target.value;
          setContent(newContent);
          dispatch(updateCurrentNoteContent(newContent));
          if (socket && id) socket.emit('update-note', { noteId: id, updates: { content: newContent } });
        }}
      />
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        Last updated: {new Date(currentNote.updatedAt).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default NoteEditor;