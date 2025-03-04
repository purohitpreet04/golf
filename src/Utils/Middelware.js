import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export function verifyJWT(req, res, next) {
    const token = req.headers['authorization']
    const userId = req.headers['user']
    // console.log('userId', userId)
    try {
        if (token) {
            // console.log(token)
            let tkStr = token.split(' ')[1]
            let decode = jwt.verify(tkStr, process.env.JWT_SECRET)
            // console.log(decode)
            if (userId == decode.id) {
                next()
            } else {
                // console.log('Token not Appropriate');

                return res.status(409).send({ message: "Token not Appropriate" })
            }
        } else {
            // console.log('Token not available');
            return res.status(409).send({ message: "Token not Available" })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).send({ message: 'Token has been expired....please logout' })
    }
}
