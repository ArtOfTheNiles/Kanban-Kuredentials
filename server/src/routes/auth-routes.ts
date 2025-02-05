import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const loginErrorMessage = 'Login failed, please try again!';

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: loginErrorMessage });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(402).json({ message: loginErrorMessage });
  }

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY not defined');
  }

  const token = jwt.sign({ username: user.username }, secret, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
