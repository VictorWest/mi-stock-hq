import { IsEmail, IsString, Length, Matches } from "class-validator";

export class OtpDto {
    @IsEmail()
    readonly userEmail: string

    @IsString()
    @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
    readonly otp: string
}