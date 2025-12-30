import mongoose from "mongoose";

const supplierManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    suppliers: {
        type: Array<{
            supplierName: String, 
            contactPerson: String, 
            phone: String, 
            email: Boolean, 
            address: String, 
            category: {
                type: String,
                enum: ["electronics", "raw materials", "furniture", "stationery", "food"]
            }
        }>
    }
}, { timestamps: true })

const SupplierManagement = mongoose.models.SupplierManagement || mongoose.model("SupplierManagement", supplierManagementSchema)

export default SupplierManagement