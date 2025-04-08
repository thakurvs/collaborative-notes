import jwt from 'jsonwebtoken';
import env from '../utils/env';
import User from '../models/User';
import { auth } from '../config/firebase';
import { IUser } from '../models/User';

// Generate JWT token
export const generateToken = (userId: string): string => {
  if (!env.jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign({ _id: userId }, env.jwtSecret, { expiresIn: '7d' });
};

// Verify Firebase ID token and get user
export const verifyFirebaseToken = async (idToken: string): Promise<IUser> => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Find or create user in database
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ 
        uid, 
        email, 
        displayName: name || email?.split('@')[0] 
      });
    }

    return user;
  } catch (error) {
    throw new Error('Invalid or expired Firebase token');
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId).select('-__v');
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: { displayName?: string }
): Promise<IUser> => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-__v');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Validate email and password (for traditional auth if needed)
export const validateEmailPassword = async (
  email: string,
  password: string
): Promise<IUser> => {
  // This is a placeholder for traditional auth
  // In your case, you're using Firebase Auth, so this might not be needed
  throw new Error('Email/password auth not implemented - use Firebase Auth');
};

// Generate password reset token
export const generateResetToken = (email: string): string => {
  if (!env.jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign({ email }, env.jwtSecret, { expiresIn: '1h' });
};

// Verify password reset token
export const verifyResetToken = (token: string): { email: string } => {
  if (!env.jwtSecret) {
    throw new Error('JWT secret is not defined');
  }

  const decoded = jwt.verify(token, env.jwtSecret);
  if (typeof decoded === 'object' && decoded !== null && 'email' in decoded) {
    return { email: decoded.email as string };
  }

  throw new Error('Invalid token: email not found');
};