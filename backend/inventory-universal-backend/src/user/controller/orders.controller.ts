import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from "@nestjs/common";
import { OrdersRepository } from "../repository/orders.repository";
import { OrdersAdminRepository } from "../repository/orders.admin.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";
import { OrderConnectionDto, ChargePartiesDto } from "../dtos/order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private ordersRepository: OrdersRepository, private ordersAdminRepository: OrdersAdminRepository){}

    @Post('create-connection/:userEmail')
    async createConnection(@Param('userEmail') userEmail: string, @Body() body: OrderConnectionDto){
        try {
            const result = await this.ordersRepository.createConnection(userEmail, body)
            return new ResponseDto(true, 'Order connection created', result)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to create connection', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post('charge-parties/:userEmail')
    async chargeParties(@Param('userEmail') userEmail: string, @Body() body: ChargePartiesDto){
        try {
            const result = await this.ordersRepository.chargeParties(userEmail, body)
            return new ResponseDto(true, 'Parties charged', result)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to charge parties', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    // Admin endpoints
    @Get('admin/pending/:requestorEmail')
    async listPending(@Param('requestorEmail') requestorEmail: string){
        try {
            const pending = await this.ordersAdminRepository.listPending(requestorEmail)
            return new ResponseDto(true, 'Pending orders fetched', pending)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch pending orders', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post('admin/approve/:requestorEmail')
    async approveOrder(@Param('requestorEmail') requestorEmail: string, @Body() body: { orderId: string, vendorCharge: number, customerCharge: number }){
        try {
            const updated = await this.ordersAdminRepository.approveOrder(requestorEmail, body.orderId, body.vendorCharge, body.customerCharge)
            return new ResponseDto(true, 'Order approved and charged', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to approve order', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
