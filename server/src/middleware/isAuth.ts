import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '../services/auth.service';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const user = verifyAuthToken(token);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  req.user = user;
  next();
};