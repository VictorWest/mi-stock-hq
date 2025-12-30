import { IsIn, IsNumber, IsString } from "class-validator";

export class PaymentDto {
    @IsString()
    readonly customerName: string

    @IsString()
    readonly reference: string

    @IsString()
    readonly cashierName: string

    @IsNumber()
    readonly amount: number

    @IsString()
    @IsIn(["POS", "cash", "transfer"])
    readonly paymentMethod: string
}