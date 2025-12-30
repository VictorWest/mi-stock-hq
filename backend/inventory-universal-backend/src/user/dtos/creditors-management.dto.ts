import { IsIn, IsNumber, IsString } from "class-validator";

export class CreditorsDto {
    @IsString()
    readonly supplierName: string

    @IsNumber()
    readonly originalAmount: number

    @IsNumber()
    readonly remainingBalance: number

    @IsString()
    readonly creationDate: string

    @IsString()
    @IsIn(["partially paid", "paid"])
    readonly status: string
}