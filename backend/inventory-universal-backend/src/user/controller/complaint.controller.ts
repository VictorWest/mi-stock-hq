import { Body, Controller, Get, Param, Post, Patch, HttpException, HttpStatus } from "@nestjs/common";
import { ComplaintRepository } from "../repository/complaint.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";

@Controller('complaints')
export class ComplaintController {
    constructor(private repo: ComplaintRepository){}

    @Post('file/:reporterEmail')
    async file(@Param('reporterEmail') reporterEmail: string, @Body() body: any){
        try {
            const created = await this.repo.fileComplaint(reporterEmail, body)
            return new ResponseDto(true, 'Complaint filed', created)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to file complaint', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get('vendor/:vendorId')
    async forVendor(@Param('vendorId') vendorId: string){
        try {
            const docs = await this.repo.getComplaintsForVendor(vendorId)
            return new ResponseDto(true, 'Complaints fetched', docs)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch complaints', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get('all/:requestorEmail')
    async listAll(@Param('requestorEmail') requestorEmail: string){
        try {
            const docs = await this.repo.listAll(requestorEmail)
            return new ResponseDto(true, 'All complaints', docs)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch complaints', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':complaintId/:requestorEmail')
    async updateStatus(@Param('complaintId') complaintId: string, @Param('requestorEmail') requestorEmail: string, @Body() body: { status: string }){
        try {
            const updated = await this.repo.updateStatus(requestorEmail, complaintId, body.status)
            return new ResponseDto(true, 'Complaint updated', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to update complaint', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
