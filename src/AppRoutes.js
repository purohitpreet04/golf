import express from 'express';
import userRoutes from './Services/User/Routes.js';
import authRoutes from './Services/auth/Routes.js';
import masterRoutes from './Services/Masters/Routes.js';
import hotelRoutes from './Services/Hotels/Routes.js';

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/masters', masterRoutes)
router.use('/hotel', hotelRoutes)

export default router