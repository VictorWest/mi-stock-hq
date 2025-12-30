import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";
import Worker from "../model/worker";
import User from "src/auth/model/user";

@Injectable()
export class WorkerRepository {
    private readonly dbPassword: string;

    constructor(private configService: ConfigService){
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    private async ensureDB(){
        await connectDB(this.dbPassword)
    }

    async addWorker(employerEmail: string, worker: any){
        await this.ensureDB()
        const user = await User.findOne({ email: employerEmail })
        if (!user) throw new Error('Employer not found')
        const workerId = worker.workerId || Date.now().toString()
        const created = await Worker.create({ ...worker, workerId, employerEmail })
        return created
    }

    async getWorkers(employerEmail: string){
        await this.ensureDB()
        const docs = await Worker.find({ employerEmail }).lean().exec()
        return docs || []
    }

    async getWorker(employerEmail: string, workerId: string){
        await this.ensureDB()
        const doc = await Worker.findOne({ employerEmail, workerId }).lean().exec()
        if (!doc) throw new Error('Worker not found')
        return doc
    }

    async updateWorker(employerEmail: string, workerId: string, updates: Partial<any>){
        await this.ensureDB()
        const updated = await Worker.findOneAndUpdate({ employerEmail, workerId }, { $set: updates }, { new: true }).exec()
        if (!updated) throw new Error('Worker not found')
        return updated
    }

    async deleteWorker(employerEmail: string, workerId: string){
        await this.ensureDB()
        const deleted = await Worker.findOneAndDelete({ employerEmail, workerId }).exec()
        return deleted
    }
}
