import express from 'express';
import { verifyJWT } from '../../Utils/Middelware.js';
import { addAndUpdateMasters, getMasterModalData } from './Conttroller.js';

const masterRoutes = express.Router()

masterRoutes.post('/add-update-masters', verifyJWT, addAndUpdateMasters)
masterRoutes.get('/get-masters-list', verifyJWT, getMasterModalData)

export default masterRoutes;