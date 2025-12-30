import { Type } from "class-transformer";
import { IsDate, IsIn, IsNumber, IsObject, IsString } from "class-validator";

class AddressDto {
    @IsString()
    readonly street: string

    @IsString()
    readonly city: string

    @IsString()
    readonly state: string

    @IsString()
    readonly country: string

    @IsString()
    readonly postalCode: string
}

export class CustomerDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly email: string

    @IsString()
    readonly phoneNumber: string

    @IsObject()
    @Type(() => AddressDto)
    readonly address: AddressDto

    @IsString()
    @IsIn(["active", "inactive", "blocked"])
    readonly accountStatus: string

    @IsString()
    @IsIn(["regular", "vip", "corporate"])
    readonly customerType: string

    @IsDate()
    readonly lastPurchaseDate: Date

    @IsNumber()
    readonly totalSpend: number

    @IsNumber()
    readonly balance: number
}