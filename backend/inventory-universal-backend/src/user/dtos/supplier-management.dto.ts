import { IsBoolean, IsIn, IsString } from "class-validator";

export class SupplierDto {
    @IsString()
    readonly supplierName: string
    
    @IsString()
    readonly contactPerson: string

    @IsString()
    readonly phone: string

    @IsBoolean()
    readonly email: boolean

    @IsString()
    readonly address: string

    @IsString()
    @IsIn(["electronics", "raw materials", "furniture", "stationery", "food"])
    readonly category: string
}