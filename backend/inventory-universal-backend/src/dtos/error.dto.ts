import { AnyARecord } from "dns";

export class ErrorDto {
    success: boolean;
    message: string;
    errors?: any;

    constructor(message: string, errors?: any){
        this.success = false
        this.message = message;
        if (errors !== undefined){
            this.errors = errors
        }
    }
}