import { IsIn, IsNumber, IsString } from "class-validator";

export class ReceivablesDto {
    @IsString()
    readonly cashierName: string

    @IsString()
    readonly customerName: string

    @IsNumber()
    readonly amount: number

    @IsString()
    readonly creationDate: string

    @IsNumber()
    readonly remainingBalance: number

    @IsString()
    @IsIn(["partially paid", "unsettled", "settled"])
    readonly status: string
}

export class ReceivablePaymentDto {
    @IsString()
    readonly customerName: string

    @IsString()
    readonly cashierName: string

    @IsNumber()
    readonly amount: number

    @IsString()
    readonly date: string

    @IsString()
    readonly note?: string
}