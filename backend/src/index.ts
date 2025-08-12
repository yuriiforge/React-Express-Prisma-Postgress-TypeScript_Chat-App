import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import { initSocket } from './socket/socket';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Serve frontend in production
const __dirnamePath = path.resolve();
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirnamePath, '/frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirnamePath, 'frontend', 'dist', 'index.html'));
  });
}

// Start socket.io
initSocket(server);

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
