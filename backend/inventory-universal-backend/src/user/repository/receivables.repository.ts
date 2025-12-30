import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { ReceivablesDto } from "../dtos/receivables-management.dto";
import { ReceivablePaymentDto } from "../dtos/receivables-management.dto";
import ReceivablesManagement from "../model/receivables-management";

@Injectable()
export class ReceivablesRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async addReceivable(userEmail: string, receivable: ReceivablesDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await ReceivablesManagement.findOneAndUpdate(
                { userEmail },
                { $push: { receivables: receivable }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getReceivables(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await ReceivablesManagement.findOne({ userEmail }).lean().exec()
        // return (doc && doc.receivables) || []
        if (doc && !Array.isArray(doc) && 'receivables' in doc) {
            return doc.receivables || []
        }
    }

    async deleteReceivable(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const unsetObj: any = {}
            unsetObj[`receivables.${itemIndex}`] = 1
            
            await ReceivablesManagement.findOneAndUpdate(
                { userEmail },
                { $unset: unsetObj },
                { new: true }
            ).exec()

            const updated = await ReceivablesManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { receivables: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async updateReceivablePayment(userEmail: string, customerName: string, cashierName: string, payment: ReceivablePaymentDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await ReceivablesManagement.findOne({ userEmail }).exec()

        
        if (!doc || !Array.isArray((doc as any).receivables)){
            throw new Error("Receivables not found for user")
        }
        
        const receivables: any[] = (doc as any).receivables

        console.log(receivables)

        const idx = receivables.findIndex(r => r.customerName === customerName && r.cashierName === cashierName)

        if (idx === -1) {
            throw new Error("Receivable entry not found for provided customer and cashier")
        }

        const item = receivables[idx]
        const newRemaining = Math.max(0, (item.remainingBalance || 0) - payment.amount)
        const newStatus = newRemaining === 0 ? 'settled' : 'partially paid'

        try {
            // push payment into paymentHistory and update remainingBalance and status
            const unsetObj: any = {}
            // Using positional index to update specific array element
            const updated = await ReceivablesManagement.findOneAndUpdate(
                { userEmail },
                { 
                    $push: { [`receivables.${idx}.paymentHistory`]: { amount: payment.amount, date: payment.date, note: payment.note || '', cashier: cashierName } },
                    $set: { [`receivables.${idx}.remainingBalance`]: newRemaining, [`receivables.${idx}.status`]: newStatus }
                },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getPaymentHistory(userEmail: string, customerName: string, cashierName: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await ReceivablesManagement.findOne({ userEmail }).lean().exec()

        if (!doc || !Array.isArray((doc as any).receivables)){
            throw new Error("Receivables not found for user")
        }

        const receivables: any[] = (doc as any).receivables
        const receivable = receivables.find(r => r.customerName === customerName && r.cashierName === cashierName)

        if (!receivable) {
            throw new Error("Receivable entry not found for provided customer and cashier")
        }

        return receivable.paymentHistory || []
    }
}