import User from "../../DB/Schemas/UserSchema.js";
import bcrypt from 'bcryptjs';
import { generateToken, HandleError } from "../../Utils/CommonFunctions.js";


export const Login = async (req, res) => {

    try {
        let { email, password } = req.body;

        let ExistingUser = await User.findOne({ email: email },);
        if (ExistingUser) {
            let isMatch = bcrypt.compare(password, ExistingUser.password);
            let token = generateToken(ExistingUser?._id);
            if (isMatch) {
                return res.status(200).send({ message: "Login Success", user: { _id: ExistingUser?._id, token: token } });
            } else {
                return res.status(409).send({ message: "Password not Matched" });
            }
        } else {
            return res.status(409).send({ message: "User not Found" });
        }
    } catch (error) {
        console.log(error);

        return HandleError(req, res, error, 500, "Internal Server Error");
    }

}

export const Register = async (req, res) => {
    try {
        let { email, password, ...data } = req.body;
        let ExistingUser = await User.findOne({ email: email });
        if (ExistingUser) {
            return res.status(409).send({ message: "User Already Exist" });
        } else {
            let hash = await bcrypt.hash(password, 10);
            let newUser = new User({ email, password: hash, data });
            await newUser.save();
            let token = await generateToken(newUser?._id)
            return res.status(200).send({ message: "User Registered Successfully", token, user: { _id: newUser?._id } });
        }
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}




export const changePassword = async (req, res) => {
    try {
        let { _id, oldPassword, newPassword } = req.body;
        let user = await User.findOne({ _id: _id });
        let isMatch = bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            let hash = await bcrypt.hash(newPassword, 10);
            let updatedUser = await User.findOneAndUpdate({ _id: _id }, { password: hash }, { new: true });
            if (updatedUser) {
                return res.status(409).send({ message: "User not Found", success: false });
            }
            return res.status(200).send({ message: "Password Updated Successfully", success: true });

        } else {
            return res.status(409).send({ message: "Old Password not Matched", success: false });
        }
    } catch (error) {
        return HandleError(req, res, error, 500, "Internal Server Error");
    }
}




