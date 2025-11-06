import { Request, Response } from 'express';
import { generateAuthToken } from '../services/auth.service';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export const googleCallback = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect(`${CLIENT_URL}/login-error`);
  }

  const token = generateAuthToken(req.user as any);

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
  });

  res.redirect(`${CLIENT_URL}/dashboard`);
};

export const getMe = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.status(200).json(req.user);
};

export const logout = (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  res.status(200).json({ message: 'Logout successful' });
};