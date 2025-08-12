import { z } from 'zod';
import { Gender } from '@prisma/client';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters length')
    .max(50, 'Username must be at most 50 characters length'),
  password: z.string().min(6, 'Password must be at least 6 characters length'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
    gender: z.enum(Gender),
  })
  .refine((data) => data.password === data.confirmPassword, {})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });
export type SignupInput = z.infer<typeof signupSchema>;
