declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URI: string;
      CLIENT_URL: string;
      JWT_SECRET: string;
      FIREBASE_SERVICE_ACCOUNT_PATH: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }