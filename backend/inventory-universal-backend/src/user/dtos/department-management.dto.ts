import { Type } from "class-transformer";
import { IsBoolean, IsObject, IsString } from "class-validator";

class LinkToStoreDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly location: string
}

export class DepartmentDto {
    @IsString()
    readonly type: string
    
    @IsString()
    readonly description: string

    @IsString()
    readonly headOfDept: string

    @IsBoolean()
    readonly customerFacing: boolean

    @IsObject()
    @Type(() => LinkToStoreDto)
    readonly linkToStores: LinkToStoreDto[]
}