import { Injectable } from "@nestjs/common";
import { CategoryDto, CurrencyDto, InventoryItemDto, ThresholdSettingDto, UnitOfMeasurementDto, WriteOffRequestDto } from '../dtos/inventory-mangement.dto';
import InventoryManagement from '../model/inventory-management';
import User from 'src/auth/model/user';
import { ConfigService } from "@nestjs/config";
import { connectDB } from "src/mongodb";

@Injectable()
export class InventoryRepository {
    private readonly dbPassword: string;

    constructor (private configService: ConfigService) {
        this.dbPassword = this.configService.get<string>("DB_PASSWORD") || ""
    }

    async addInventory(userEmail: string, inventoryItem: InventoryItemDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { inventoryItems: inventoryItem }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addThresholdSetting(userEmail: string, thresholdSetting: ThresholdSettingDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { thresholdSettings: thresholdSetting }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addUnitOfMesurement(userEmail: string, unitOfMesurement: UnitOfMeasurementDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { unitOfMesurement }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addWriteOffRequests(userEmail: string, writeOffRequest: WriteOffRequestDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { writeOffRequests: writeOffRequest }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addCategories(userEmail: string, category: CategoryDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { categories: category }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async addCurrency(userEmail: string, currency: CurrencyDto){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $push: { currency }, $setOnInsert: { userEmail } },
                { upsert: true, new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async getInventory(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'inventoryItems' in doc) {
            return doc.inventoryItems || []
        }
        return []
    }

    async getThresholdSettings(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'thresholdSettings' in doc) {
            return doc.thresholdSettings || []
        }
        return []
    }

    async getUnitOfMesurement(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'unitOfMesurement' in doc) {
            return doc.unitOfMesurement || []
        }
        return []
    }

    async getWriteOffRequests(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'writeOffRequests' in doc) {
            return doc.writeOffRequests || []
        }
        return []
    }

    async getCategories(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'categories' in doc) {
            return doc.categories || []
        }
        return []
    }

    async getCurrency(userEmail: string){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        const doc = await InventoryManagement.findOne({ userEmail }).lean().exec()
        if (doc && !Array.isArray(doc) && 'currency' in doc) {
            return doc.currency || []
        }
        return []
    }

    async deleteInventoryItem(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`inventoryItems.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { inventoryItems: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteThresholdSetting(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`thresholdSettings.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { thresholdSettings: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteUnitOfMeasurement(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`unitOfMesurement.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { unitOfMesurement: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteWriteOffRequest(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`writeOffRequests.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { writeOffRequests: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteCategory(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`categories.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { categories: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }

    async deleteCurrency(userEmail: string, itemIndex: number){
        await connectDB(this.dbPassword)

        const user = await User.findOne({ email: userEmail })

        if (!user){
            throw new Error("User not found")
        }

        try {
            await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $unset: { [`currency.${itemIndex}`]: 1 } },
                { new: true }
            ).exec()

            const updated = await InventoryManagement.findOneAndUpdate(
                { userEmail },
                { $pull: { currency: null } },
                { new: true }
            ).exec()

            return updated
        } catch (err) {
            throw err
        }
    }
}