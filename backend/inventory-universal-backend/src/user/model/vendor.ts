import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true },
    category: { type: String, default: "general" },
    description: { type: String },
    images: { type: [String], default: [] },
    // contact details are stored but should not be returned in public endpoints
    contact: {
        phone: String,
        email: String,
        address: String
    },
    metadata: { type: Object, default: {} }
}, { timestamps: true })

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema)
export default Vendor
