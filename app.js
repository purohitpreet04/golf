import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';

import connectDB from './src/DB/Connection.js';
import authRoutes from './src/Services/auth/Routes.js';
import userRoutes from './src/Services/User/Routes.js';
import "./src/config/passport.js";
import passport from 'passport';
import session from 'express-session';
import router from './src/AppRoutes.js';

const app = express();
config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// ✅ Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router)

connectDB();

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running', PORT);
})