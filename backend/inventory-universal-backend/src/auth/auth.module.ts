import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { OtpRepository } from './repository/otp.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OtpRepository]
})
export class AuthModule {}
