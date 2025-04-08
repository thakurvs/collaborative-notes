import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { NoteUpdatePayload } from '../../client/notes-app/src/types/noteTypes';

let io: Server;

export const initializeSocket = (server: HttpServer): void => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a note room for real-time collaboration
    socket.on('join-note', (noteId: string) => {
      socket.join(noteId);
      console.log(`User joined note ${noteId}`);
    });

    // Handle note updates
    socket.on('update-note', ({ noteId, updates }: NoteUpdatePayload) => {
      socket.to(noteId).emit('note-updated', updates);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};