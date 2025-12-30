import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class InventoryItemDto {
    @IsString()
    @IsOptional()
    readonly sku: string

    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly category: string

    @IsString()
    @IsOptional()
    readonly supplier: string

    @IsString()
    @IsOptional()
    readonly department: string

    @IsNumber()
    @IsOptional()
    readonly price: number

    @IsNumber()
    @IsOptional()
    readonly stock: number

    @IsString()
    @IsIn(["In Stock", "Low Stock", "Out of Stock"])
    readonly status: string
}

export class ThresholdSettingDto {
    @IsNumber()
    @IsOptional()
    readonly itemName: number

    @IsNumber()
    @IsOptional()
    readonly currentStock: number

    @IsNumber()
    @IsOptional()
    readonly reorderLevel: number

    @IsNumber()
    @IsOptional()
    readonly stock: number

    @IsNumber()
    @IsOptional()
    readonly minStock: number

    @IsNumber()
    @IsOptional()
    readonly maxStock: number

    @IsBoolean()
    readonly autoAlerts: boolean

    @IsString()
    readonly status: string
}

export class UnitOfMeasurementDto {
    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly abbreviation: string

    @IsString()
    @IsOptional()
    readonly category: string

    @IsString()
    @IsOptional()
    readonly conversion: string

    @IsString()
    @IsOptional()
    readonly description: string
}

export class WriteOffRequestDto {
    @IsString()
    @IsOptional()
    readonly name: string

    @IsNumber()
    @IsOptional()
    readonly quantity: number

    @IsString()
    @IsOptional()
    readonly reason: string

    @IsString()
    @IsOptional()
    readonly requestedBy: string

    @IsString()
    @IsOptional()
    readonly requestDate: string

    @IsString()
    readonly status: string
}

export class CategoryDto {
    @IsString()
    @IsIn(["inventory", "supplier"])
    readonly category: string

    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly description: string

    @IsString()
    @IsOptional()
    readonly typeOfProduct: string
}

export class CurrencyDto {
    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly symbol: string
}

export class InventoryManagementDTO {
    @IsEmail()
    readonly userEmail: string

    @ValidateNested({ each: true})
    @Type(() => InventoryItemDto)
    readonly inventoryItems: InventoryItemDto[]

    @ValidateNested({ each: true})
    @Type(() => ThresholdSettingDto)
    readonly thresholdSettings: ThresholdSettingDto[]

    @ValidateNested({ each: true})
    @Type(() => UnitOfMeasurementDto)
    readonly unitOfMesurement: UnitOfMeasurementDto[]

    @ValidateNested({ each: true})
    @Type(() => WriteOffRequestDto)
    readonly writeOffRequests: WriteOffRequestDto[]

    @ValidateNested({ each: true})
    @Type(() => CategoryDto)
    readonly categories: CategoryDto[]

    @ValidateNested({ each: true})
    @Type(() => CurrencyDto)
    readonly currency: CurrencyDto[]
}