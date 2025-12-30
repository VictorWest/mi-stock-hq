import mongoose from "mongoose";

const departmentManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    departments: {
        type: Array<{
            type: String, 
            name: String,
            description: String, 
            location: String;
            headId: String;
            headName: String;
            isCustomerFacing: Boolean;
            linkToStores: Array<{
                name: String, 
                location: String
            }>;
            lastActivity: String;
        }>
    }
}, { timestamps: true })

const DepartmentManagement = mongoose.models.DepartmentManagement || mongoose.model("DepartmentManagement", departmentManagementSchema)

export default DepartmentManagement