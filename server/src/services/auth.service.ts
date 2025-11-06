import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env');
}

/**
 * Generates a JWT token for a user.
 * Token expires in 7 days.
 */
export const generateAuthToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Verifies a JWT token and returns the user payload.
 */
export const verifyAuthToken = (token: string): { id: string; email: string; displayName: string } | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: payload.id,
      email: payload.email,
      displayName: payload.displayName
    };
  } catch (error) {
    console.error('Error verifying token:', error instanceof Error ? error.message : error);
    return null;
  }
};