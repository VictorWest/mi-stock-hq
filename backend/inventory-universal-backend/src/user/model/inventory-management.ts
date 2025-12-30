import mongoose from "mongoose";

const inventoryManagementSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    inventoryItems: {
        type: Array<{
            sku: String, 
            name: String, 
            category: String, 
            supplier: String, 
            department: String, 
            price: Number, 
            stock: Number, 
            status: {
                type: String,
                required: true,
                enum: ['in-stock', 'out-of-stock', 'low-stock']
            }
        }>
    },
    thresholdSettings: {
        type: Array<{
            itemName: Number, 
            currentStock: Number, 
            reorderLevel: Number, 
            minStock: Number, 
            maxStock: Number, 
            autoAlerts: Boolean, 
            status: String
        }>
    },
    unitOfMesurement: {
        type: Array<{
            name: String, 
            abbreviation: String, 
            category: String, 
            conversion: String, 
            description: String
        }>
    },
    writeOffRequests: {
        type: Array<{
            name: String, 
            quantity: Number, 
            reason: String, 
            requestedBy: String, 
            requestDate: String, 
            status: String
        }>
    },
    categories: {
        type: Array<{
            category: {
                type: String,
                enum: ["inventory", "supplier"]
            },
            name: String,
            description: String,
            typeOfProduct: {
                type: String,
                default: "Default"
            }
        }>
    },
    currency: Array<{
        name: String, 
        symbol: String
    }>
}, {timestamps: true})

const InventoryManagement = mongoose.models.InventoryManagement || mongoose.model("InventoryManagement", inventoryManagementSchema)

export default InventoryManagement