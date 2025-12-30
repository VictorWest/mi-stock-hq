import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { SupplierDto } from "../dtos/supplier-management.dto";
import SupplierManagement from "../model/supplier-management";

@Injectable()
export class SupplierRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async addSupplier(userEmail: string, supplier: SupplierDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await SupplierManagement.findOneAndUpdate(
                { userEmail },
                { $push: { suppliers: supplier }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getSuppliers(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await SupplierManagement.findOne({ userEmail }).lean().exec()
        // return (doc && doc.suppliers) || []
        if (doc && !Array.isArray(doc) && 'suppliers' in doc) {
            return doc.suppliers || []
        }
    }

    async deleteSupplier(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const unsetObj: any = {}
            unsetObj[`suppliers.${itemIndex}`] = 1
            
            await SupplierManagement.findOneAndUpdate(
                { userEmail },
                { $unset: unsetObj },
                { new: true }
            ).exec()

            const updated = await SupplierManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { suppliers: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }
}