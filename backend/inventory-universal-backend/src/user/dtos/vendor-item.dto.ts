import { IsNumber, IsOptional, IsString } from "class-validator";

export class VendorItemDto {
    @IsString()
    readonly itemId?: string

    @IsString()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly location?: string

    @IsNumber()
    readonly price: number

    @IsString()
    @IsOptional()
    readonly lastUpdated?: string
}
