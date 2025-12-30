import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import OrdersManagement from "../model/orders-management";
import { OrderConnectionDto, ChargePartiesDto } from "../dtos/order.dto";

@Injectable()
export class OrdersRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async createConnection(userEmail: string, connection: OrderConnectionDto){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")

        const orderId = Date.now().toString()
        const entry = { orderId, ...connection, status: 'pending', createdAtIso: new Date().toISOString(), charged: false }

        const updated = await OrdersManagement.findOneAndUpdate(
            { userEmail },
            { $push: { orders: entry }, $setOnInsert: { userEmail } },
            { upsert: true, new: true }
        ).exec()

        return { orderId, doc: updated }
    }

    async chargeParties(userEmail: string, charge: ChargePartiesDto){
        await connectDB(this.dbPassword)
        const user = await User.findOne({ email: userEmail })
        if (!user) throw new Error("User not found")

        const doc = await OrdersManagement.findOne({ userEmail }).exec()
        if (!doc || !Array.isArray((doc as any).orders)) throw new Error("Orders not found for user")

        const orders: any[] = (doc as any).orders
        const idx = orders.findIndex(o => o.orderId === charge.orderId)
        if (idx === -1) throw new Error("Order not found")

        const updated = await OrdersManagement.findOneAndUpdate(
            { userEmail },
            { $push: { [`orders.${idx}.charges`]: { vendorCharge: charge.vendorCharge, customerCharge: charge.customerCharge, chargedAt: new Date().toISOString() } }, $set: { [`orders.${idx}.charged`]: true, [`orders.${idx}.status`]: 'charged' } },
            { new: true }
        ).exec()

        return updated
    }
}
