import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const auth = req.headers['authorization'];
  if (!auth?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = auth.split(' ')[1];

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
