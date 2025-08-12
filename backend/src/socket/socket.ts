import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

const userSocketMap: { [key: string]: string } = {};

export const getReceiverSocketId = (receiverId: string) =>
  userSocketMap[receiverId];

export let io: Server | null = null;

export function initSocket(server: HTTPServer) {
  if (io) return io; // return existing instance if already initialized

  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    io?.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      delete userSocketMap[userId];
      io?.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  return io;
}
