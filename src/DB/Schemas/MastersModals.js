import mongoose, { model, Schema } from "mongoose";

let mastersSchema = new Schema({


});

const commonSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    zipCode: {
        type: String,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    website: {
        type: String,
        trim: true,
    },
    whatsapp: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    linkedIn: {
        type: String,
        trim: true,
    },
    yearEstablished: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear(),
    },
    specialization: {
        type: String,
        trim: true,
    },
    popularDestinations: {
        type: String,
        trim: true,
    },
    servicesOffered: [{ type: String }], // e.g., ['Catering', 'Cooking Classes']
    certifications: [{ type: String }],
    specialization: [{ type: String }], // e.g., ['Italian Cuisine', 'Vegan Dishes']
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });


const Sports = model('Sports', commonSchema)
const Culinary = model('Culinary', commonSchema)
const Travel = model('Travel', commonSchema)
const Interests = model('InterestsAndHobbies', mastersSchema)
const Character = model('CharacterAndProperties', mastersSchema)

export default {
    Sports,
    Culinary,
    Travel,
    Interests,
    Character
};