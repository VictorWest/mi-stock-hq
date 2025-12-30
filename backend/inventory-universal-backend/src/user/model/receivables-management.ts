import mongoose from "mongoose";

const receivablesManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    receivables: {
        type: Array<{
            cashierName: String, 
            customerName: String, 
            amount: Number, 
            creationDate: String, 
            remainingBalance: Number, 
            status: {
                type: String,
                enum: ["partially paid", "unsettled", "settled"]
            },
            paymentHistory: {
                type: Array<{
                    amount: Number,
                    date: String,
                    note: String,
                    cashier: String
                }>,
                default: []
            }
        }>
    }
}, { timestamps: true })

const ReceivablesManagement = mongoose.models.ReceivablesManagement || mongoose.model("ReceivablesManagement", receivablesManagementSchema)

export default ReceivablesManagement