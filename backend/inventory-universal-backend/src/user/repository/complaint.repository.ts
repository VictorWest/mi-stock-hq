import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import Complaint from "../model/complaint";
import { isSuperAdmin } from "../utils/role.util";

@Injectable()
export class ComplaintRepository {
    private readonly dbPassword: string;

    constructor(private configService: ConfigService){
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    private async ensureDB(){
        await connectDB(this.dbPassword)
    }

    async fileComplaint(reporterEmail: string, complaint: any){
        await this.ensureDB()
        const complaintId = complaint.complaintId || Date.now().toString()
        const created = await Complaint.create({ ...complaint, complaintId, reporterEmail })
        return created
    }

    async getComplaintsForVendor(vendorId: string){
        await this.ensureDB()
        const docs = await Complaint.find({ vendorId }).lean().exec()
        return docs || []
    }

    async listAll(requestorEmail: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')
        const docs = await Complaint.find({}).lean().exec()
        return docs || []
    }

    async updateStatus(requestorEmail: string, complaintId: string, status: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')
        const updated = await Complaint.findOneAndUpdate({ complaintId }, { $set: { status } }, { new: true }).exec()
        if (!updated) throw new Error('Complaint not found')
        return updated
    }
}
