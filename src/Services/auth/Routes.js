import express from 'express';
import { changePassword, Login, Register } from './Conttroller.js';
import { verifyJWT } from '../../Utils/Middelware.js';
import passport from 'passport';

const authRoutes = express.Router()

authRoutes.post('/login', Login)
authRoutes.post('/register', Register)

authRoutes.put('/change-password', verifyJWT, changePassword)

authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoutes.get("/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
);

authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
authRoutes.get("/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    async (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
);

export default authRoutes