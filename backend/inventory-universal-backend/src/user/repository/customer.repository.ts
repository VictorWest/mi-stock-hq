import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { CustomerDto } from "../dtos/customer.dto";
import Customer from "../model/customer";

@Injectable()
export class CustomerRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async addCustomer(userEmail: string, customer: CustomerDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const customerInstance = await Customer.create({ userEmail, ...customer })
            return customerInstance
        } catch (err) {
            throw err
        }
    }

    async getCustomers(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const docs = await Customer.find({ userEmail }).lean().exec()
        return docs || []
    }

    async deleteCustomer(userEmail: string, customerId: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const deleted = await Customer.findByIdAndDelete(customerId).exec()
            return deleted
        } catch (err) {
            throw err
        }
    }
}