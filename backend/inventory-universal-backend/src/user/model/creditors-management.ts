import mongoose from "mongoose";

const creditorsManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    creditors: {
        type: Array<{
            supplierName: String, 
            originalAmount: Number, 
            remainingBalance: Number, 
            creationDate: String, 
            status: {
                type: String,
                enum: ["partially paid", "paid"]
            }
        }>
    }
}, { timestamps: true })

const CreditorsManagement = mongoose.models.CreditorsManagement || mongoose.model("CreditorsManagement", creditorsManagementSchema)

export default CreditorsManagement