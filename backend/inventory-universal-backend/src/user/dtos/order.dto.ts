import { IsNumber, IsOptional, IsString } from "class-validator";

export class OrderConnectionDto {
    @IsString()
    readonly customerId: string

    @IsString()
    readonly vendorId: string

    @IsString()
    readonly itemId: string

    @IsNumber()
    readonly price: number

    @IsString()
    @IsOptional()
    readonly note?: string
}

export class ChargePartiesDto {
    @IsString()
    readonly orderId: string

    @IsNumber()
    readonly vendorCharge: number

    @IsNumber()
    readonly customerCharge: number
}