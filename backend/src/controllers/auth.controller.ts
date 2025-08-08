import { Request, Response } from 'express';
import prisma from '../db/prisma';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

class AuthController {
  constructor() {}

  public signup = async (req: Request, res: Response) => {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;

      if (!fullName || !username || !password || !confirmPassword || !gender) {
        return res.status(400).json({ error: 'Please fill all the fields' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // https://i.pravatar.cc/300
      const avatar = `https://i.pravatar.cc/300?u=${username}`;

      const newUser = await prisma.user.create({
        data: {
          fullname: fullName,
          username,
          password: hashedPassword,
          gender,
          profilePic: avatar,
        },
      });

      if (newUser) {
        // generate token in sec
        generateToken(newUser.id, res);

        res.status(201).json({
          id: newUser.id,
          fullName: newUser.fullname,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ error: 'Invalid User data' });
      }
    } catch (error: any) {
      console.error('Error in signup controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      generateToken(user.id, res);

      res.status(200).json({
        id: user.id,
        fullName: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      console.error('Error in login controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public logout = async (req: Request, res: Response) => {
    try {
      res.cookie('jwt', '', { maxAge: 0 });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error: any) {
      console.log('Error in logout controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public getMe = async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });

      if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({
        id: user.id,
        fullName: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      console.log('Error in getMe controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export const authController = new AuthController();
