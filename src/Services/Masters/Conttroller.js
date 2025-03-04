import { AddAndUpdateforMasters, handleDelete, MasterModalListing } from './Modal.js'
import { HandleError } from "../../Utils/CommonFunctions.js";

export const addAndUpdateMasters = async (req, res) => {
    try {
        const { modalname, ...data } = req.body
        if (!modalname) {
            return res.status(404).send({ message: "invalid model!", success: false });
        }
        let updatedData = await AddAndUpdateforMasters(modalname, data)
        if (!updatedData) {
            return res.status(404).send({ message: "Data not found", success: false });
        }
        if (data?._id) {
            return res.status(200).send({ message: "Data updated successfully", success: true, data: updatedData });
        } else {
            return res.status(200).send({ message: "Data added successfully", success: true, data: updatedData });
        }
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}

export const deleteEntry = async (req, res) => {
    const { modalname, _id } = req.query;

    if (!modalname || !_id) {
        return res.status(400).send({
            message: 'Model name and ID are required.',
            success: false
        });
    }

    try {
        const result = await handleDelete(modalname, _id);

        if (result.success) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({
                message: result.message,
                success: false
            });
        }
    } catch (error) {
        console.error("Error in deleteEntry:", error);
        return res.status(500).send({
            message: 'Internal Server Error.',
            success: false
        });
    }
};


export const getMasterModalData = async (req, res) => {
    const { page, limit, filter, search, modalname } = req.query;
    try {
        if (!modalname) {
            return res.status(400).send({ message: 'Invalid modal name', success: false });
        }
        const result = await MasterModalListing(modalname, { page, limit, filter, search });
        return res.status(200).send({
            message: `${modalname} data fetched successfully`,
            success: true,
            ...result
        });
    } catch (error) {
        console.error('Error in getMasterModalData:', error);
        return HandleError(req, res, error, 500, 'Internal Server Error');
    }
};
