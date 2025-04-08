import { Request, Response } from 'express';
import { auth } from '../config/firebase';
import User from '../models/User';
import { generateToken } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email, displayName: name });
    }

    const token = generateToken(user._id as string);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};