const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    firebase: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    },
    socketUrl: import.meta.env.VITE_SOCKET_URL
  };
  
  // Validate required environment variables
  const validateEnv = () => {
    if (!env.apiBaseUrl) throw new Error('VITE_API_BASE_URL is required');
    if (!env.firebase.apiKey) throw new Error('VITE_FIREBASE_API_KEY is required');
    if (!env.socketUrl) throw new Error('VITE_SOCKET_URL is required');
  };
  
  validateEnv();
  
  export default env;
  