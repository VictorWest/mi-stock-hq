import { IsIn, IsNumber, IsString } from "class-validator";

export class ProcurementDto {
    @IsString()
    readonly requestID: string

    @IsString()
    readonly department: string

    @IsNumber()
    readonly itemNumber: number

    @IsNumber()
    readonly totalValue: number

    @IsString()
    readonly requestDate: string

    @IsString()
    @IsIn(["accepted", "pending", "rejected"])
    readonly status: string
}