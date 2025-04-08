import { Router } from 'express';
import authRoutes from './authRoutes';
// import noteRoutes from './noteRoutes';
// import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
// router.use('/notes', noteRoutes);
// router.use('/users', userRoutes);

export default router;