import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route.ts';
import messageRoutes from './routes/message.route.ts';

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
