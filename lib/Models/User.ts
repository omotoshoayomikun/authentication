import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    matric_no: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model('User', UserSchema);