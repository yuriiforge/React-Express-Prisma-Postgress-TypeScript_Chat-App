import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.ts';
import messageRoutes from './routes/message.route.ts';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// TODO Add socket.io to the server
// TODO Configure this server for the deployment
