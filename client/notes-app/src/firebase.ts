import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import env from './utils/env';

const firebaseConfig: FirebaseOptions = {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId
};
  
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);