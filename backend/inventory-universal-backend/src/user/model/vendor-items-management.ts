import mongoose from "mongoose";

const vendorItemSchema = new mongoose.Schema({
    itemId: String,
    name: String,
    location: String,
    price: Number,
    lastUpdated: String
})

const vendorSchema = new mongoose.Schema({
    vendorId: String,
    vendorName: String,
    items: [vendorItemSchema]
})

const vendorItemsManagementSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    vendors: [vendorSchema]
}, { timestamps: true })

const VendorItemsManagement = mongoose.models.VendorItemsManagement || mongoose.model("VendorItemsManagement", vendorItemsManagementSchema)

export default VendorItemsManagement
