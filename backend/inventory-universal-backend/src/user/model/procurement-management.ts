import mongoose from "mongoose";

const procurementManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    requests: {
        type: Array<{
            requestID: String, 
            department: String, 
            itemNumber: Number, 
            totalValue: Number, 
            requestDate: String,
            status: {
                type: String,
                enum: ["accepted", "pending", "rejected"]
            }
        }>
    }
}, { timestamps: true })

const ProcurementManagement = mongoose.models.ProcurementManagement || mongoose.model("ProcurementManagement", procurementManagementSchema)

export default ProcurementManagement