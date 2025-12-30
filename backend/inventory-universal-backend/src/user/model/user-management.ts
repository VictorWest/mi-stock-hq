// For super user only

import mongoose from "mongoose";

const userManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    users: {
        type: Array<{
            username: String, 
            password: String, 
            designation: String, 
            department: String, 
            permissions: String[] | String,
            status: {
                type: String,
                enum: ["active", "inactive"]
            }
        }>
    }
}, { timestamps: true })

const UserManagement = mongoose.models.UserManagement || mongoose.model("UserManagement", userManagementSchema)

export default UserManagement