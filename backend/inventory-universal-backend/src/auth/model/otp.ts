import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Expires in 5 minutes
    }
})

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema)

export default OTP