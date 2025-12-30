import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    workerId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    designation: { type: String },
    biodata: { type: Object, default: {} },
    employerEmail: { type: String, required: true }
}, { timestamps: true })

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema)
export default Worker
