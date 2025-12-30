import mongoose from "mongoose"
import { industryNameOptions, userDesignationOptions } from "src/interface/industry"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: [...userDesignationOptions],
        default: "user"
    },
    industry: {
        type: String,
        enum: [...industryNameOptions],
        default: "general"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User