import mongoose from 'mongoose';
import env from '../utils/env';

const connectDB = async () => {
  try {
    if (!env.mongodbUri) {
      throw new Error('MongoDB URI is not defined in the environment variables');
    }
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
