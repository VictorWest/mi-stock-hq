import { Body, Controller, Get, Param, Post, Patch, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { WorkerRepository } from "../repository/worker.repository";
import { ResponseDto } from "src/dtos/response.dto";
import { ErrorDto } from "src/dtos/error.dto";

@Controller('workers')
export class WorkerController {
    constructor(private workerRepo: WorkerRepository){}

    @Post('add/:employerEmail')
    async addWorker(@Param('employerEmail') employerEmail: string, @Body() worker: any){
        try {
            const created = await this.workerRepo.addWorker(employerEmail, worker)
            return new ResponseDto(true, 'Worker added', created)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to add worker', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get('list/:employerEmail')
    async list(@Param('employerEmail') employerEmail: string){
        try {
            const docs = await this.workerRepo.getWorkers(employerEmail)
            return new ResponseDto(true, 'Workers fetched', docs)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch workers', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Get(':employerEmail/:workerId')
    async getOne(@Param('employerEmail') employerEmail: string, @Param('workerId') workerId: string){
        try {
            const doc = await this.workerRepo.getWorker(employerEmail, workerId)
            return new ResponseDto(true, 'Worker fetched', doc)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch worker', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':employerEmail/:workerId')
    async update(@Param('employerEmail') employerEmail: string, @Param('workerId') workerId: string, @Body() updates: any){
        try {
            const updated = await this.workerRepo.updateWorker(employerEmail, workerId, updates)
            return new ResponseDto(true, 'Worker updated', updated)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to update worker', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':employerEmail/:workerId')
    async remove(@Param('employerEmail') employerEmail: string, @Param('workerId') workerId: string){
        try {
            const deleted = await this.workerRepo.deleteWorker(employerEmail, workerId)
            return new ResponseDto(true, 'Worker deleted', deleted)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to delete worker', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }
}
