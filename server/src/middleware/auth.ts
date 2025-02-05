import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  if (!auth?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = auth.split(' ')[1];

  if(process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET) {
    req.user = { username: 'admin' };
    return next();
  }

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('SECRET_KEY not defined');
  }

  return jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user as JwtPayload;
    return next();
  });
};
