import { Body, Controller, Get, Param, Post, Patch, Delete, Query, HttpException, HttpStatus } from "@nestjs/common";
import { VendorGlobalRepository } from "../repository/vendor.global.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";

@Controller('vendors')
export class VendorController {
    constructor(private vendorRepo: VendorGlobalRepository){}

    @Get('public')
    async listPublic(@Query('category') category?: string){
        try {
            const query = category ? { category } : {}
            const vendors = await this.vendorRepo.listPublic(query)
            return new ResponseDto(true, 'Vendors fetched (public)', vendors)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch vendors', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post('create/:requestorEmail')
    async create(@Param('requestorEmail') requestorEmail: string, @Body() vendor: any){
        try {
            const created = await this.vendorRepo.createVendor(requestorEmail, vendor)
            return new ResponseDto(true, 'Vendor created', created)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to create vendor', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':vendorId/:requestorEmail')
    async update(@Param('vendorId') vendorId: string, @Param('requestorEmail') requestorEmail: string, @Body() updates: any){
        try {
            const updated = await this.vendorRepo.updateVendor(requestorEmail, vendorId, updates)
            return new ResponseDto(true, 'Vendor updated', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to update vendor', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':vendorId/:requestorEmail')
    async remove(@Param('vendorId') vendorId: string, @Param('requestorEmail') requestorEmail: string){
        try {
            const deleted = await this.vendorRepo.deleteVendor(requestorEmail, vendorId)
            return new ResponseDto(true, 'Vendor deleted', deleted)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to delete vendor', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get('full/:vendorId/:requestorEmail')
    async getFull(@Param('vendorId') vendorId: string, @Param('requestorEmail') requestorEmail: string){
        try {
            const vendor = await this.vendorRepo.getVendorFull(requestorEmail, vendorId)
            return new ResponseDto(true, 'Vendor fetched', vendor)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch vendor', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
