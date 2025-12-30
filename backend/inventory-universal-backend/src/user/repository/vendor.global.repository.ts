import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import Vendor from "../model/vendor";
import { isSuperAdmin } from "../utils/role.util";

@Injectable()
export class VendorGlobalRepository {
    private readonly dbPassword: string;

    constructor(private configService: ConfigService){
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    private async ensureDB(){
        await connectDB(this.dbPassword)
    }

    // Public listing returns limited fields
    async listPublic(query?: any){
        await this.ensureDB()
        const docs = await Vendor.find(query || {}).select('vendorId vendorName category description images').lean().exec()
        return docs || []
    }

    // Admin-only: create vendor
    async createVendor(requestorEmail: string, vendor: any){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const vendorId = vendor.vendorId || Date.now().toString()
        const created = await Vendor.create({ ...vendor, vendorId })
        return created
    }

    async updateVendor(requestorEmail: string, vendorId: string, updates: Partial<any>){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const updated = await Vendor.findOneAndUpdate({ vendorId }, { $set: updates }, { new: true }).exec()
        if (!updated) throw new Error('Vendor not found')
        return updated
    }

    async deleteVendor(requestorEmail: string, vendorId: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const deleted = await Vendor.findOneAndDelete({ vendorId }).exec()
        return deleted
    }

    // Admin fetch full
    async getVendorFull(requestorEmail: string, vendorId: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const vendor = await Vendor.findOne({ vendorId }).lean().exec()
        if (!vendor) throw new Error('Vendor not found')
        return vendor
    }
}
