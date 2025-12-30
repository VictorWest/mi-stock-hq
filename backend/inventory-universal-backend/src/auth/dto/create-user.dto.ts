import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class UserAccountDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly fullName: string

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly businessName: string

    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(8)
    readonly password: string
}