import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import VendorItemsManagement from "../model/vendor-items-management";
import { VendorItemDto } from "../dtos/vendor-item.dto";

@Injectable()
export class VendorRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async getVendorItems(userEmail: string, vendorId: string){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")

        const doc = await VendorItemsManagement.findOne({ userEmail }).lean().exec()
        if (!doc || !Array.isArray((doc as any).vendors)) return []

        const vendors: any[] = (doc as any).vendors
        const vendor = vendors.find(v => v.vendorId === vendorId)
        if (!vendor) return []
        return vendor.items || []
    }

    async addVendorItem(userEmail: string, vendorId: string, item: VendorItemDto){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")

        // ensure vendor exists
        const updated = await VendorItemsManagement.findOneAndUpdate(
            { userEmail, "vendors.vendorId": vendorId },
            { $push: { "vendors.$.items": { ...item, itemId: item.itemId || Date.now().toString(), lastUpdated: item.lastUpdated || new Date().toISOString() } } },
            { new: true }
        ).exec()

        if (updated) return updated

        // create vendor and push
        const created = await VendorItemsManagement.findOneAndUpdate(
            { userEmail },
            { $push: { vendors: { vendorId, items: [{ ...item, itemId: item.itemId || Date.now().toString(), lastUpdated: item.lastUpdated || new Date().toISOString() }] } }, $setOnInsert: { userEmail } },
            { upsert: true, new: true }
        ).exec()

        return created
    }

    async updateVendorItemPrice(userEmail: string, vendorId: string, itemId: string, price: number){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")

        const doc = await VendorItemsManagement.findOne({ userEmail }).exec()
        if (!doc || !Array.isArray((doc as any).vendors)) throw new Error("Vendor data not found for user")

        const vendors: any[] = (doc as any).vendors
        const vIdx = vendors.findIndex(v => v.vendorId === vendorId)
        if (vIdx === -1) throw new Error("Vendor not found")

        const items: any[] = vendors[vIdx].items || []
        const iIdx = items.findIndex(i => i.itemId === itemId)
        if (iIdx === -1) throw new Error("Item not found")

        const updateObj: any = {}
        updateObj[`vendors.${vIdx}.items.${iIdx}.price`] = price
        updateObj[`vendors.${vIdx}.items.${iIdx}.lastUpdated`] = new Date().toISOString()

        const updated = await VendorItemsManagement.findOneAndUpdate(
            { userEmail },
            { $set: updateObj },
            { new: true }
        ).exec()

        return updated
    }

    async getAllVendors(userEmail: string){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")
        const doc = await VendorItemsManagement.findOne({ userEmail }).lean().exec()
        if (!doc) return []
        return (doc as any).vendors || []
    }
}
