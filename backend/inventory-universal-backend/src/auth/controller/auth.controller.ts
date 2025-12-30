import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserAccountDto } from '../dto/create-user.dto';
import { ResponseDto } from 'src/dtos/response.dto';
import { ErrorDto } from 'src/dtos/error.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    async create(@Body() userAccountDto: UserAccountDto){
        try {
            const user = await this.authService.create(userAccountDto)
            return new ResponseDto(true, "User created successfully", user)
        } catch (error) {
            throw new HttpException(
                new ErrorDto(error.message || "Failed to create user", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    } 

    @Post("login")
    async login(@Body() loginDto: LoginDto){
        try {
            const user = await this.authService.login(loginDto)
            return new ResponseDto(true, "User found successfully", user)
        } catch (error) {
             throw new HttpException(
                new ErrorDto(error.message || "Failed to find user", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get("send-otp/:userEmail")
    async sendOtp(
        @Param('userEmail') userEmail: string,
        @Query('resend') resend?: boolean
    ){
        try {
            const otpResponse = await this.authService.sendOtp(userEmail, resend)
            return new ResponseDto(true, "OTP sent successfully", otpResponse)
        } catch (error) {
             throw new HttpException(
                new ErrorDto(error.message || "Failed to send otp", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post("verify-otp/:userEmail/:otp")
    async verifyOtp(
        @Param('userEmail') userEmail: string, 
        @Param('otp') otp: string,
        @Body() userAccountInfo: UserAccountDto
    ){
        try {
            const otpResponse = await this.authService.verifyOtp({ userEmail, otp }, userAccountInfo)
            return new ResponseDto(true, "OTP verified successfully", otpResponse)
        } catch (error) {
             throw new HttpException(
                new ErrorDto(error.message || "Failed to verify otp", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }
}
