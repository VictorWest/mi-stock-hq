import { Controller, Get, Param, Post, Body, Patch, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { VendorItemsGlobalRepository } from "../repository/vendor-items.global.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";

@Controller('vendor-items')
export class VendorItemsController {
    constructor(private repo: VendorItemsGlobalRepository){}

    @Get(':vendorId')
    async list(@Param('vendorId') vendorId: string){
        try {
            const items = await this.repo.getItems(vendorId)
            return new ResponseDto(true, 'Vendor items fetched', items)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch vendor items', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':vendorId/:requestorEmail')
    async add(@Param('vendorId') vendorId: string, @Param('requestorEmail') requestorEmail: string, @Body() item: any){
        try {
            const updated = await this.repo.addItem(requestorEmail, vendorId, item)
            return new ResponseDto(true, 'Item added', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to add item', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':vendorId/:itemId/:requestorEmail')
    async updatePrice(@Param('vendorId') vendorId: string, @Param('itemId') itemId: string, @Param('requestorEmail') requestorEmail: string, @Body() body: { price: number }){
        try {
            const updated = await this.repo.updateItemPrice(requestorEmail, vendorId, itemId, body.price)
            return new ResponseDto(true, 'Item price updated', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to update item price', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':vendorId/:itemId/:requestorEmail')
    async remove(@Param('vendorId') vendorId: string, @Param('itemId') itemId: string, @Param('requestorEmail') requestorEmail: string){
        try {
            const updated = await this.repo.deleteItem(requestorEmail, vendorId, itemId)
            return new ResponseDto(true, 'Item removed', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to remove item', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
