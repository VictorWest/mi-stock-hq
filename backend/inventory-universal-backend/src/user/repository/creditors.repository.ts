import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { CreditorsDto } from "../dtos/creditors-management.dto";
import CreditorsManagement from "../model/creditors-management";

@Injectable()
export class CreditorsRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async addCreditor(userEmail: string, creditor: CreditorsDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await CreditorsManagement.findOneAndUpdate(
                { userEmail },
                { $push: { creditors: creditor }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getCreditors(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await CreditorsManagement.findOne({ userEmail }).lean().exec()
        // return (doc && doc.creditors) || []
        if (doc && !Array.isArray(doc) && 'creditors' in doc) {
            return doc.creditors || []
        }
        return []
    }

    async deleteCreditor(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const unsetObj: any = {}
            unsetObj[`creditors.${itemIndex}`] = 1
            
            await CreditorsManagement.findOneAndUpdate(
                { userEmail },
                { $unset: unsetObj },
                { new: true }
            ).exec()

            const updated = await CreditorsManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { creditors: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async updateCreditor(userEmail: string, supplierName: string, updates: Partial<CreditorsDto>){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await CreditorsManagement.findOne({ userEmail }).exec()

        if (!doc || !Array.isArray((doc as any).creditors)){
            throw new Error("Creditors not found for user")
        }

        const creditors: any[] = (doc as any).creditors
        const creditorIndex = creditors.findIndex(c => c.supplierName === supplierName)

        if (creditorIndex === -1){
            throw new Error("Creditor with provided supplier name not found")
        }

        try {
            const updateObj: any = {}
            
            if (updates.originalAmount !== undefined) {
                updateObj[`creditors.${creditorIndex}.originalAmount`] = updates.originalAmount
            }
            if (updates.remainingBalance !== undefined) {
                updateObj[`creditors.${creditorIndex}.remainingBalance`] = updates.remainingBalance
            }
            if (updates.status !== undefined) {
                updateObj[`creditors.${creditorIndex}.status`] = updates.status
            }
            if (updates.creationDate !== undefined) {
                updateObj[`creditors.${creditorIndex}.creationDate`] = updates.creationDate
            }

            const updated = await CreditorsManagement.findOneAndUpdate(
                { userEmail },
                { $set: updateObj },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }
}