import { Controller, Get, Param, Query, HttpException, HttpStatus } from "@nestjs/common";
import { VendorRepository } from "../repository/vendor.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";

@Controller('reports')
export class ReportsController {
    constructor(private vendorRepository: VendorRepository){}

    @Get('daily-vendors/:userEmail')
    async getDailyVendors(@Param('userEmail') userEmail: string, @Query('date') dateIso?: string){
        try {
            const vendors = await this.vendorRepository.getAllVendors(userEmail)
            if (!dateIso) return new ResponseDto(true, 'Daily vendors', vendors)

            const target = new Date(dateIso).toISOString().slice(0,10)
            // filter vendor items updated on that day
            const filtered = vendors.map(v => ({ vendorId: v.vendorId, vendorName: v.vendorName, items: (v.items || []).filter(i => i.lastUpdated && i.lastUpdated.slice(0,10) === target) })).filter(v => (v.items||[]).length>0)
            return new ResponseDto(true, 'Daily vendors for date', filtered)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch daily vendors', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get('monthly-vendors/:userEmail')
    async getMonthlyVendors(@Param('userEmail') userEmail: string, @Query('year') year?: string, @Query('month') month?: string){
        try {
            const y = parseInt(year || '')
            const m = parseInt(month || '')
            const vendors = await this.vendorRepository.getAllVendors(userEmail)
            if (!y || !m) return new ResponseDto(true, 'Monthly vendors', vendors)

            const filtered = vendors.map(v => ({ vendorId: v.vendorId, vendorName: v.vendorName, items: (v.items || []).filter(i => {
                if (!i.lastUpdated) return false
                const d = new Date(i.lastUpdated)
                return d.getFullYear() === y && (d.getMonth()+1) === m
            }) })).filter(v => (v.items||[]).length>0)

            return new ResponseDto(true, 'Monthly vendor report', filtered)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch monthly vendors', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
