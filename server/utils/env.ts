import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL,
  jwtSecret: process.env.JWT_SECRET,  
  firebaseServiceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate required environment variables
const validateEnv = () => {
  if (!env.mongodbUri) throw new Error('MONGODB_URI is required');
  if (!env.clientUrl) throw new Error('CLIENT_URL is required');
  if (!env.jwtSecret) throw new Error('JWT_SECRET is required');
  if (!env.firebaseServiceAccountPath) throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is required');
  
  if (env.nodeEnv !== 'development' && env.nodeEnv !== 'production') {
    throw new Error('NODE_ENV must be either "development" or "production"');
  }
};

validateEnv();

export default env;