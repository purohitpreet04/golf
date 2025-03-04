import mongoose from "mongoose";
import HotelModals from "../../DB/Schemas/HotelModals.js";
import { HandleError } from "../../Utils/CommonFunctions.js";
import { processUploads } from "../../Utils/uploadimage.js";
import { AddHotelEmineties } from "./Modal.js";

export const addHotelEmineties = async (req, res) => {
    try {
        // let data = req.body
        let hoteldata
        const uploadFields = [
            { name: "logo", maxCount: 1 },
            { name: "images", maxCount: 10 }
        ];

        
        // Process uploads
        const uploadedFiles = await processUploads(req, uploadFields);
        console.log(req.files);

        let { _id, ...restData } = req.body;
        hoteldata = await AddHotelEmineties({ _id, ...restData, ...uploadedFiles })
        if (_id) {
            if (!hoteldata) {
                return res.send({ message: 'something went wrong...', success: false })
            }
            return res.send({ message: 'Hotel Updated Successfully...', success: true })
        } else {
            // hoteldata = await AddHotelEmineties(data)
            if (!hoteldata) {
                return res.send({ message: 'something went wrong...', success: false })
            }
            return res.send({ message: 'Hotel Added Successfully...', success: true })
        }

    } catch (error) {
        console.error('Error in AddHotelEmineties:', error);
        return HandleError(req, res, error, 500, 'Internal Server Error');
    }
}

export const getHotelById = async (req, res) => {
    try {
        const { _id } = req.query;
        const hotel = await HotelModals.findById(_id);

        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        res.status(200).json({ success: true, data: hotel });
    } catch (error) {
        console.error("Error fetching hotel data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const getHotels = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "" } = req.query;
        let userId = req.headers['user']
        page = parseInt(page);
        limit = parseInt(limit);

        const query = search
            ? {
                $or: [
                    { hotelname: { $regex: search, $options: "i" } }, // Case-insensitive search
                    { city: { $regex: search, $options: "i" } },
                    { state: { $regex: search, $options: "i" } }
                ]
            }
            : {};
        query.addedBy = new mongoose.Types.ObjectId(userId)
        const totalHotels = await HotelModals.countDocuments(query);

        const hotels = await HotelModals.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: totalHotels,
            currentPage: page,
            totalPages: Math.ceil(totalHotels / limit),
            data: hotels
        });
    } catch (error) {
        console.error("Error fetching hotel list:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};