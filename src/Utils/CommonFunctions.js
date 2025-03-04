import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const HandleError = (req, res, error = {}, status = 500, message) => {
    res.status(status).send({ message: message || "internal server Error...", success: false, severity: 'error' })
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1hr',
    });
};
