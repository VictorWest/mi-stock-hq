import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import VendorItems from "../model/vendor-items";
import { isSuperAdmin, isVendor } from "../utils/role.util";

@Injectable()
export class VendorItemsGlobalRepository {
    private readonly dbPassword: string;

    constructor(private configService: ConfigService){
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    private async ensureDB(){
        await connectDB(this.dbPassword)
    }

    async getItems(vendorId: string){
        await this.ensureDB()
        const doc = await VendorItems.findOne({ vendorId }).lean().exec()
        if (!doc) return []
        return (doc as any).items || []
    }

    async addItem(requestorEmail: string, vendorId: string, item: any){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword) || await isVendor(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const newItem = { ...item, itemId: item.itemId || Date.now().toString(), lastUpdated: item.lastUpdated || new Date().toISOString() }
        const updated = await VendorItems.findOneAndUpdate(
            { vendorId },
            { $push: { items: newItem }, $setOnInsert: { vendorId } },
            { upsert: true, new: true }
        ).exec()

        return updated
    }

    async updateItemPrice(requestorEmail: string, vendorId: string, itemId: string, price: number){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword) || await isVendor(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const doc = await VendorItems.findOne({ vendorId }).exec()
        if (!doc) throw new Error('Vendor items not found')

        const items: any[] = (doc as any).items || []
        const idx = items.findIndex(i => i.itemId === itemId)
        if (idx === -1) throw new Error('Item not found')

        const updateObj: any = {}
        updateObj[`items.${idx}.price`] = price
        updateObj[`items.${idx}.lastUpdated`] = new Date().toISOString()

        const updated = await VendorItems.findOneAndUpdate({ vendorId }, { $set: updateObj }, { new: true }).exec()
        return updated
    }

    async deleteItem(requestorEmail: string, vendorId: string, itemId: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword) || await isVendor(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const updated = await VendorItems.findOneAndUpdate({ vendorId }, { $pull: { items: { itemId } } }, { new: true }).exec()
        return updated
    }
}
