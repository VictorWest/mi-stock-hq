import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    cashierName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["POS", "cash", "transfer"],
        required: true
    },
    reference: String
}, { timestamps: true })

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema)

export default Payment