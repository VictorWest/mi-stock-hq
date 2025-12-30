import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAccountDto } from '../dto/create-user.dto';
import bcrypt from "bcrypt"
import { connectDB } from 'src/mongodb';
import User from '../model/user';
import { LoginDto } from '../dto/login.dto';
import { sendEmail } from '../utils/resend';
import { SEND_OTP_EMAIL_CONTENT, SEND_OTP_EMAIL_SUBJECT } from '../utils/data';
import { OtpRepository } from '../repository/otp.repository';
import { OtpDto } from '../dto/otp.dto';

@Injectable()
export class AuthService {
    private readonly dbPassword: string;

    constructor (
        private configService: ConfigService,
        private otpRepository: OtpRepository
    ) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async create(userAccountDto: UserAccountDto){
        const { fullName, businessName, email, password } = userAccountDto

        const hashedPassword  = await bcrypt.hash(password, 10)

        await connectDB(this.dbPassword)
        await User.create({ fullName, businessName, email, password: hashedPassword })
    }

    async login(loginDto: LoginDto){
        const { email, password } = loginDto

        await connectDB(this.dbPassword)
        const user = await User.findOne({ email })

        if (!user){
            throw new Error("User not found")
        }

        if (await bcrypt.compare(password, user.password)){
            return {
                id: user.id,
                fullName: user.fullName,
                businessName: user.businessName,
                email,
                designation: user.designation,
                industry: user.industry
            }
        } 

        throw new Error("Incorrect password")
    }

    async sendOtp(userEmail: string, resend?: boolean){
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
        const response = await sendEmail(userEmail, SEND_OTP_EMAIL_SUBJECT, SEND_OTP_EMAIL_CONTENT(randomOtp))
        
        if (response.success){
            return await this.otpRepository.create({ userEmail, otp: randomOtp }, resend)
        } else {
            throw new Error(response.error?.message || "Email sending failed")
        }
    }

    async verifyOtp(otp: OtpDto, userAccountDto: UserAccountDto){
        const response = await this.otpRepository.findOne(otp)

        if (response){
            return this.create(userAccountDto)
        }
    }
}
