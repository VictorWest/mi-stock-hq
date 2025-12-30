import mongoose from "mongoose";

const vendorItemSchema = new mongoose.Schema({
    itemId: String,
    name: String,
    location: String,
    price: Number,
    lastUpdated: String,
    images: { type: [String], default: [] }
})

const vendorItemsSchema = new mongoose.Schema({
    vendorId: { type: String, required: true, unique: true },
    items: [vendorItemSchema]
}, { timestamps: true })

const VendorItems = mongoose.models.VendorItems || mongoose.model("VendorItems", vendorItemsSchema)
export default VendorItems
