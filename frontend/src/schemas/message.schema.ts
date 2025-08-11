import { z } from 'zod';

export const messageSchema = z.object({
  message: z.string().min(1, 'Message should at least contain 1 character'),
});

export type MessageData = z.infer<typeof messageSchema>;
