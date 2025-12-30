import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { UserManagementDto } from "../dtos/user-management.dto";
import UserManagement from "../model/user-management";
import { IndustryName } from "src/interface/industry";

@Injectable()
export class UserRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async updateIndustry(userEmail: string, industry: IndustryName){
        await connectDB(this.dbPassword)

        const userInstance = await User.findOne({ email: userEmail })

        if (!userInstance){
            throw new Error("User not found")
        }

        try {
            const updated = await User.findOneAndUpdate(
                { email: userEmail },
                { industry },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addUser(userEmail: string, user: UserManagementDto){
        await connectDB(this.dbPassword)

        const userInstance = await User.findOne({ email: userEmail })

        if (!userInstance){
            throw new Error("User not found")
        }

        try {
            const updated = await UserManagement.findOneAndUpdate(
                { userEmail },
                { $push: { users: user }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getUsers(userEmail: string){
        await connectDB(this.dbPassword)

        const userInstance = await User.findOne({ email: userEmail })

        if (!userInstance){
            throw new Error("User not found")
        }

        const doc = await UserManagement.findOne({ userEmail }).lean().exec()
        // return (doc && doc.users) || []
        if (doc && !Array.isArray(doc) && 'users' in doc) {
            return doc.users || []
        }
    }

    async deleteUser(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const userInstance = await User.findOne({ email: userEmail })

        if (!userInstance){
            throw new Error("User not found")
        }

        try {
            const unsetObj: any = {}
            unsetObj[`users.${itemIndex}`] = 1
            
            await UserManagement.findOneAndUpdate(
                { userEmail },
                { $unset: unsetObj },
                { new: true }
            ).exec()

            const updated = await UserManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { users: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }
}