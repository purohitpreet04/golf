import express from 'express';
import { verifyJWT } from '../../Utils/Middelware.js';
import { addHotelEmineties, getHotelById, getHotels } from './Conttroller.js';
import { uploadAndProcessFiles } from '../../Utils/uploadimage.js';

const hotelRoutes = express.Router()

hotelRoutes.post('/add-update-hotels', verifyJWT, addHotelEmineties)
// hotelRoutes.get('/get-hotel-list', verifyJWT, getMasterModalData)
hotelRoutes.get('/get-hotel', verifyJWT, getHotelById)
hotelRoutes.get('/get-hotel-list', verifyJWT, getHotels)

export default hotelRoutes;