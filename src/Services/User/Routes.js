import express from 'express';
import { addOrUpdateUser, changeStatus, getallusers, fetchUserDetails, getUser } from './Conttroller.js';
import { verifyJWT } from '../../Utils/Middelware.js';

const userRoutes = express.Router()

userRoutes.put('/change-status', verifyJWT, changeStatus)

userRoutes.get('/getallusers', verifyJWT, getallusers)

userRoutes.post('/addnewuser', verifyJWT, addOrUpdateUser)

userRoutes.get('/getuserdetails',
    verifyJWT,
    getUser)
export default userRoutes