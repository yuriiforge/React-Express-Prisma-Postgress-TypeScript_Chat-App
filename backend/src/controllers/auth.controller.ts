import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { HashService, hashService } from '../services/hash.service';
import generateToken from '../utils/generateToken';
import { User } from '../../generated/prisma';
import { loginSchema, signupSchema } from '../schemas/authSchemas';

class AuthController {
  constructor(private readonly hashService: HashService) {}

  public signup = async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword, gender } =
      signupSchema.parse(req.body);

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'Please fill all the fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await this.hashService.hash(password);
    const avatar = this.generateAvatar(username);

    const newUser = await prisma.user.create({
      data: {
        fullname: fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: avatar,
      },
    });

    // generate token in sec
    generateToken(newUser.id, res);

    res.status(201).json(this.serializeUser(newUser));
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    generateToken(user.id, res);

    res.status(200).json(this.serializeUser(user));
  };

  public logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  };

  public getMe = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      const error = new Error('Invalid credentials');
      (error as any).status = 404;
      throw error;
    }

    res.status(200).json(this.serializeUser(user));
  };

  private generateAvatar(username: string): string {
    return `https://i.pravatar.cc/300?u=${username}`;
  }

  private serializeUser(user: User) {
    return {
      id: user.id,
      fullName: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    };
  }
}

export const authController = new AuthController(hashService);
