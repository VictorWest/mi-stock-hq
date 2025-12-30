import { Injectable } from "@nestjs/common";
import { OtpDto } from "../dto/otp.dto"
import { connectDB } from "src/mongodb";
import { ConfigService } from "@nestjs/config";
import OTP from "../model/otp";

@Injectable()
export class OtpRepository {
    private readonly dbPassword: string;
    
    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async create(otp: OtpDto, resend?: boolean){
        await connectDB(this.dbPassword)

        if (resend) {
            await OTP.deleteOne({ userEmail: otp.userEmail })
        }
        
        try {
            return await OTP.create(otp)
        } catch (error) {
            throw new Error(`Failed to create OTP: ${error.message}`);
        }
    }

    async findOne(otp: OtpDto){
        await connectDB(this.dbPassword)

        try {
            const data = await OTP.findOne({ userEmail: otp.userEmail })

            if (!data){
                throw new Error(`OTP has expired. Please request a new one.`);
            }

            if (data.otp === otp.otp){
                return data
            } else {
                throw new Error("Incorrect OTP.");
            }
        } catch (error) {
            throw new Error(`Failed to create OTP: ${error.message}`);
        }
    }
}