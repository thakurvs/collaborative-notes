import { Server } from 'socket.io';
import Note from '../models/Note';

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join-note', async (noteId: string) => {
      socket.join(noteId);
      const note = await Note.findById(noteId);
      if (note) {
        socket.emit('note-data', note);
      }
    });

    socket.on('update-note', async ({ noteId, updates }) => {
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
      io.to(noteId).emit('note-updated', updatedNote);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};