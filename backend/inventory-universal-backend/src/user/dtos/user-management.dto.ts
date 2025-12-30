import { IsArray, IsIn, IsString } from "class-validator";
import { userDesignationOptions } from "src/interface/industry";

export class UserManagementDto {
    @IsString()
    readonly username: string

    @IsString()
    readonly password: string

    @IsString()
    @IsIn([...userDesignationOptions])
    readonly designation: string

    @IsString()
    readonly department: string

    @IsArray()
    readonly permissions: string[]

    @IsString()
    @IsIn(["active", "inactive"])
    readonly status: string
}