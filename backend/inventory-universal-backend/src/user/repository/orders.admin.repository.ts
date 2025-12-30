import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import OrdersManagement from "../model/orders-management";
import { isSuperAdmin } from "../utils/role.util";

@Injectable()
export class OrdersAdminRepository {
    private readonly dbPassword: string;

    constructor(private configService: ConfigService){
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    private async ensureDB(){
        await connectDB(this.dbPassword)
    }

    async listPending(requestorEmail: string){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        const docs = await OrdersManagement.find({ 'orders.status': 'pending' }).lean().exec()
        const pending: any[] = []
        for (const doc of docs){
            const orders = (doc as any).orders || []
            for (const ord of orders){
                if (ord.status === 'pending') pending.push({ ownerEmail: doc.userEmail, ...ord })
            }
        }
        return pending
    }

    async approveOrder(requestorEmail: string, orderId: string, vendorCharge: number, customerCharge: number){
        await this.ensureDB()
        const ok = await isSuperAdmin(requestorEmail, this.dbPassword)
        if (!ok) throw new Error('Unauthorized')

        // find order across documents
        const doc = await OrdersManagement.findOne({ 'orders.orderId': orderId }).exec()
        if (!doc || !Array.isArray((doc as any).orders)) throw new Error('Order not found')

        const orders: any[] = (doc as any).orders
        const idx = orders.findIndex(o => o.orderId === orderId)
        if (idx === -1) throw new Error('Order not found')

        const updated = await OrdersManagement.findOneAndUpdate(
            { 'orders.orderId': orderId },
            { $push: { [`orders.${idx}.charges`]: { vendorCharge, customerCharge, chargedAt: new Date().toISOString() } }, $set: { [`orders.${idx}.charged`]: true, [`orders.${idx}.status`]: 'charged' } },
            { new: true }
        ).exec()

        return updated
    }
}
