import User from "../../DB/Schemas/UserSchema.js";
import { AddNewUser, GetAllUsers, GetUser, UpdateProfile } from "./Modal.js";
import { HandleError } from "../../Utils/CommonFunctions.js";

export const getUser = async (req, res) => {
    try {
        let { _id } = req.query;
        let userId = req.headers['user']
        let user = await GetUser({ _id: userId });
        if (user) {
            return res.status(200).send({ message: "User Found", user, success: true });
        } else {
            return res.status(409).send({ message: "User not Found", success: false });
        }
    } catch (error) {
        console.log(error);

        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}

export const changeStatus = async (req, res) => {
    try {
        const { _id, status, userRole } = req.query;
        if (['admin'].includes(userRole)) {
            let user = await User.findByIdAndUpdate(_id, { isActive: parseInt(status) })
            if (user) {
                return res.status(200).send({ message: 'Status Updated Successfully', success: true })
            } else {
                return res.status(200).send({ message: 'User not found', success: true })
            }
        } else {
            return res.send({ message: 'access denied!', success: false })
        }
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}


export const addOrUpdateUser = async (req, res) => {
    let { _id, email, ...data } = req.body;
    try {
        if (_id) {
            let updateuser = await UpdateProfile({ _id, ...data });
            if (!updateuser) {
                return res.status(404).send({ message: "User not Found", success: false });
            }
            return res.status(200).send({ message: "Profile Updated Successfully", success: true, user: updateuser });

        } else {
            let newuser = await AddNewUser({data, email});
            if (!newuser?._id) {
                return res.status(400).send({
                    message: "Failed to add profile. Please try again.",
                    success: false
                });
            }
            return res.status(201).send({
                message: "Profile added successfully.",
                success: true
            });
        }
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}


export const getallusers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        let filter = {};
        if (req.query.filter) {
            try {
                filter = JSON.parse(req.query.filter);
            } catch (error) {
                return res.status(400).send({
                    message: "Invalid filter format",
                    success: false
                });
            }
        }

        const userdata = await GetAllUsers(page, limit, filter, search);

        if (!userdata?.users.length) {
            return res.status(404).send({
                message: "No users found matching the criteria",
                success: false
            });
        }

        return res.status(200).send(userdata);
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
};


export const fetchUserDetails = async () => {
    try {

    } catch (error) {

    }
}