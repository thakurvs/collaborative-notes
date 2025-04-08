import admin from 'firebase-admin';
import env from '../utils/env';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const auth = admin.auth();
export default admin;