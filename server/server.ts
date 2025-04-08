import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import connectDB from './config/db';
import env from './utils/env';
import authRoutes from './routes/authRoutes';
// import noteRoutes from './routes/noteRoutes';
// import userRoutes from './routes/userRoutes';
import { initializeSocket } from './services/socketService';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.clientUrl,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
// app.use('/api/users', userRoutes);

// Socket.io
initializeSocket(io);

// Database connection
connectDB();

server.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});