import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    complaintId: { type: String, required: true, unique: true },
    vendorId: { type: String, required: true },
    reporterEmail: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['open','investigating','resolved'], default: 'open' },
    metadata: { type: Object, default: {} }
}, { timestamps: true })

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema)
export default Complaint
