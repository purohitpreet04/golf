import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    email: { type: String },
    username: { type: String, default: "" },
    cellphone:{ type: String, default: "" },
    dateOfBirth: { type: Date, default: Date.now },
    group:{ type: String, default: "" },
    profileImage: { type: String, default: "" },
    password: { type: String, },
    gender: { type: String, default: "" },
    lookingFor: { type: String, default: "" },
    location: { type: String, default: "" },
    age: { type: Number, },
    phone: { type: String, },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postcode: { type: String, default: "" },
    role: { type: String, default: "admin" },
    isActive: { type: Number, default: 0 },
    isDeleted: { type: Number, default: 0 },
    isEmailVerified: { type: Number, default: 0 },
}, { timestamps: true });

let User = mongoose.model("User", AdminUserSchema);

export default User