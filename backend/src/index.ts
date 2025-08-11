import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import { app, server } from './socket/socket';
import dotenv from 'dotenv';

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

const port = process.env.PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
