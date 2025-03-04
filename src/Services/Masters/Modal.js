import MasterModal from "../../DB/Schemas/MastersModals.js";

export const AddAndUpdateforMasters = async (modalname, body) => {
    let Model = MasterModal[modalname]
    let { _id, ...data } = body
    if (!Model) {
        return null
    }
    try {
        if (_id) {
            const updatedData = await Model.findByIdAndUpdate(_id, { $set: data }, { new: true });
            if (!updatedData) {
                return null
            }
            return updatedData;
        } else {
            const newData = new Model(data);
            const savedData = await newData.save();
            if (!savedData) {
                return null
            }
            return savedData;
        }
    } catch (error) {
        console.log('error in AddAndUpdateforMasters');
    }
}

export const handleDelete = async (modalname, _id) => {
    try {
        let Model = MasterModal[modalname];
        if (!Model) {
            throw new Error("Model not found");
        }

        if (!_id) {
            throw new Error("ID is required for deletion");
        }

        const deletedData = await Model.findByIdAndUpdate(
            _id,
            { $set: { isDeleted: 1 } },
            { new: true }
        );

        if (!deletedData) {
            throw new Error("Data not found or already deleted");
        }

        return { success: true, message: "Data soft deleted successfully", data: deletedData };
    } catch (error) {
        console.log("Error in handleDelete:", error.message);
        return { success: false, message: error.message };
    }
};


export const MasterModalListing = async (modalname, { page = 1, limit = 10, filter = {}, search = '' }) => {
    const Model = MasterModal[modalname];

    if (!Model) {
        throw new Error(`Model with name ${modalname} not found`);
    }

    let query = {};

    if (filter?.status !== undefined) {
        query.isDeleted = filter.status;
    }

    // Search logic
    if (search) {
        query.$or = [
            { companyName: { $regex: search, $options: "i" } },
            // { Eng_name: { $regex: search, $options: "i" } }
        ];
    }

    try {
        const data = await Model.find(query, { password: 0 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const totalData = await Model.countDocuments(query);
       
        let modifideData = data.map((obj) => {
            return {
                ...obj,
                servicesOffered: obj?.servicesOffered.length > 0 ? obj?.servicesOffered.toString() : '',
                certifications: obj?.certifications.length > 0 ? obj?.certifications.toString() : '',
                specialization: obj?.specialization.length > 0 ? obj?.specialization.toString() : '',
            }
        })
        return {
            data: modifideData,
            page,
            limit,
            totalData,
            totalPages: Math.ceil(totalData / limit)
        };
    } catch (error) {
        console.error('Error fetching data from model:', error);
        throw new Error('Error fetching data');
    }
};
