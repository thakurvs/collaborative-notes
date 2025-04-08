import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../utils/env';
import User from '../models/User';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    if (!env.jwtSecret) throw new Error('JWT secret is not defined');
    const decoded = jwt.verify(token, env.jwtSecret) as unknown as { _id: string };
    const user = await User.findById(decoded._id);
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};