import { Body, Controller, HttpException, HttpStatus, Param, Post, Query, Get, Delete, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { InventoryItemDto, ThresholdSettingDto, UnitOfMeasurementDto, WriteOffRequestDto, CategoryDto, CurrencyDto } from '../dtos/inventory-mangement.dto';
import { ResponseDto } from 'src/dtos/response.dto';
import { ErrorDto } from 'src/dtos/error.dto';
import { DepartmentDto } from '../dtos/department-management.dto';
import { SupplierDto } from '../dtos/supplier-management.dto';
import { ReceivablesDto, ReceivablePaymentDto } from '../dtos/receivables-management.dto';
import { VendorItemDto } from '../dtos/vendor-item.dto';
import { CreditorsDto } from '../dtos/creditors-management.dto';
import { ProcurementDto } from '../dtos/procurement-management.dto';
import { UserManagementDto } from '../dtos/user-management.dto';
import { PaymentDto } from '../dtos/payment.dto';
import { CustomerDto } from '../dtos/customer.dto';
import type { IndustryName } from 'src/interface/industry';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('add-inventory/:userEmail')
    async addInventory(@Param('userEmail') userEmail: string, @Body() inventoryItem: InventoryItemDto){
        try {
            const inventory = await this.userService.addInventory(userEmail, inventoryItem)
            return new ResponseDto(true, "Inventory item added successfully", inventory)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add inventory item", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-threshold-setting/:userEmail')
    async addThresholdSetting(@Param('userEmail') userEmail: string, @Body() thresholdSetting: ThresholdSettingDto){
        try {
            const threshold = await this.userService.addThresholdSetting(userEmail, thresholdSetting)
            return new ResponseDto(true, "Threshold setting added successfully", threshold)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add threshold setting", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-measurement/:userEmail')
    async addUnitOfMesurement(@Param('userEmail') userEmail: string, @Body() unitOfMesurement: UnitOfMeasurementDto){
        try {
            const measurement = await this.userService.addUnitOfMesurement(userEmail, unitOfMesurement)
            return new ResponseDto(true, "Unit of measurement added successfully", measurement)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add unit of measurement", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-write-off-request/:userEmail')
    async addWriteOffRequests(@Param('userEmail') userEmail: string, @Body() writeOffRequest: WriteOffRequestDto){
        try {
            const writeOff = await this.userService.addWriteOffRequests(userEmail, writeOffRequest)
            return new ResponseDto(true, "Write-off request added successfully", writeOff)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add write-off request", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-category/:userEmail')
    async addCategories(@Param('userEmail') userEmail: string, @Body() category: CategoryDto){
        try {
            const categories = await this.userService.addCategories(userEmail, category)
            return new ResponseDto(true, "Category added successfully", categories)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add category", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-currency/:userEmail')
    async addCurrency(@Param('userEmail') userEmail: string, @Body() currency: CurrencyDto){
        try {
            const currencies = await this.userService.addCurrency(userEmail, currency)
            return new ResponseDto(true, "Currency added successfully", currencies)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add currency", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-department/:userEmail')
    async addDepartment(@Param('userEmail') userEmail: string, @Body() department: DepartmentDto){
        try {
            const departments = await this.userService.addDepartment(userEmail, department)
            return new ResponseDto(true, "Department added successfully", departments)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add department", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-supplier/:userEmail')
    async addSupplier(@Param('userEmail') userEmail: string, @Body() supplier: SupplierDto){
        try {
            const suppliers = await this.userService.addSupplier(userEmail, supplier)
            return new ResponseDto(true, "Supplier added successfully", suppliers)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add supplier", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-receivable/:userEmail')
    async addReceivable(@Param('userEmail') userEmail: string, @Body() receivable: ReceivablesDto){
        try {
            const receivables = await this.userService.addReceivable(userEmail, receivable)
            return new ResponseDto(true, "Receivable added successfully", receivables)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add receivable", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('vendor-items/:userEmail/:vendorId')
    async getVendorItems(@Param('userEmail') userEmail: string, @Param('vendorId') vendorId: string){
        try {
            const items = await this.userService.getVendorItems(userEmail, vendorId)
            return new ResponseDto(true, 'Vendor items fetched successfully', items)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to fetch vendor items', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post('vendor-items/:userEmail/:vendorId')
    async addVendorItem(@Param('userEmail') userEmail: string, @Param('vendorId') vendorId: string, @Body() item: VendorItemDto){
        try {
            const res = await this.userService.addVendorItem(userEmail, vendorId, item)
            return new ResponseDto(true, 'Vendor item added', res)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to add vendor item', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Patch('vendor-items/:userEmail/:vendorId/:itemId')
    async updateVendorItemPrice(@Param('userEmail') userEmail: string, @Param('vendorId') vendorId: string, @Param('itemId') itemId: string, @Body() body: { price: number }){
        try {
            const res = await this.userService.updateVendorItemPrice(userEmail, vendorId, itemId, body.price)
            return new ResponseDto(true, 'Vendor item price updated', res)
        } catch (error) {
            throw new HttpException(new ErrorDto(error.message || 'Failed to update vendor item price', error), error.status || HttpStatus.BAD_REQUEST)
        }
    }

    @Post('add-creditor/:userEmail')
    async addCreditor(@Param('userEmail') userEmail: string, @Body() creditor: CreditorsDto){
        try {
            const creditors = await this.userService.addCreditor(userEmail, creditor)
            return new ResponseDto(true, "Creditor added successfully", creditors)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add creditor", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-procurement/:userEmail')
    async addProcurement(@Param('userEmail') userEmail: string, @Body() procurement: ProcurementDto){
        try {
            const procurements = await this.userService.addProcurement(userEmail, procurement)
            return new ResponseDto(true, "Procurement added successfully", procurements)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add procurement", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('update-industry/:userEmail')
    async updateIndustry(@Param('userEmail') userEmail: string, @Query('industry') industry: IndustryName){
        try {
            const users = await this.userService.updateIndustry(userEmail, industry)
            return new ResponseDto(true, "Industry updated successfully", users)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to update industry", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-user/:userEmail')
    async addUser(@Param('userEmail') userEmail: string, @Body() user: UserManagementDto){
        try {
            const users = await this.userService.addUser(userEmail, user)
            return new ResponseDto(true, "User added successfully", users)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add user", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-payment/:userEmail')
    async addPayment(@Param('userEmail') userEmail: string, @Body() payment: PaymentDto){
        try {
            const payments = await this.userService.addPayment(userEmail, payment)
            return new ResponseDto(true, "Payment added successfully", payments)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add payment", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post('add-customer/:userEmail')
    async addCustomer(@Param('userEmail') userEmail: string, @Body() customer: CustomerDto){
        try {
            const customers = await this.userService.addCustomer(userEmail, customer)
            return new ResponseDto(true, "Customer added successfully", customers)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to add customer", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('inventory/:userEmail')
    async getInventory(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getInventory(userEmail)
            return new ResponseDto(true, "Inventory fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch inventory", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('thresholds/:userEmail')
    async getThresholdSettings(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getThresholdSettings(userEmail)
            return new ResponseDto(true, "Threshold settings fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch threshold settings", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('measurements/:userEmail')
    async getUnitOfMesurement(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getUnitOfMesurement(userEmail)
            return new ResponseDto(true, "Unit of measurements fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch unit of measurements", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('write-offs/:userEmail')
    async getWriteOffRequests(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getWriteOffRequests(userEmail)
            return new ResponseDto(true, "Write-off requests fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch write-off requests", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('categories/:userEmail')
    async getCategories(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getCategories(userEmail)
            return new ResponseDto(true, "Categories fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch categories", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('currencies/:userEmail')
    async getCurrency(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getCurrency(userEmail)
            return new ResponseDto(true, "Currencies fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch currencies", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('departments/:userEmail')
    async getDepartments(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getDepartments(userEmail)
            return new ResponseDto(true, "Departments fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch departments", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('suppliers/:userEmail')
    async getSuppliers(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getSuppliers(userEmail)
            return new ResponseDto(true, "Suppliers fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch suppliers", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('receivables/:userEmail')
    async getReceivables(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getReceivables(userEmail)
            return new ResponseDto(true, "Receivables fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch receivables", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Patch('receivables/payment/:userEmail')
    async updateReceivablePayment(@Param('userEmail') userEmail: string, @Body() paymentDto: ReceivablePaymentDto){
        try {
            const updated = await this.userService.updateReceivablePayment(userEmail, paymentDto.customerName, paymentDto.cashierName, paymentDto)
            return new ResponseDto(true, "Payment applied successfully", updated)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to apply payment to receivable", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('receivables/payment/history/:userEmail')
    async getPaymentHistory(
        @Param('userEmail') userEmail: string,
        @Query('customerName') customerName: string,
        @Query('cashierName') cashierName: string
    ){
        try {
            const paymentHistory = await this.userService.getPaymentHistory(userEmail, customerName, cashierName)
            return new ResponseDto(true, "Payment history fetched successfully", paymentHistory)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch payment history", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('creditors/:userEmail')
    async getCreditors(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getCreditors(userEmail)
            return new ResponseDto(true, "Creditors fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch creditors", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Patch('creditors/:userEmail/:supplierName')
    async updateCreditor(@Param('userEmail') userEmail: string, @Param('supplierName') supplierName: string, @Body() updates: Partial<CreditorsDto>){
        try {
            const updated = await this.userService.updateCreditor(userEmail, supplierName, updates)
            return new ResponseDto(true, "Creditor updated successfully", updated)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to update creditor", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('procurements/:userEmail')
    async getProcurements(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getProcurementRequests(userEmail)
            return new ResponseDto(true, "Procurements fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch procurements", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('users/:userEmail')
    async getUsers(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getUsers(userEmail)
            return new ResponseDto(true, "Users fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch users", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('payments/:userEmail')
    async getPayments(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getPayments(userEmail)
            return new ResponseDto(true, "Payments fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch payments", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('customers/:userEmail')
    async getCustomers(@Param('userEmail') userEmail: string){
        try {
            const data = await this.userService.getCustomers(userEmail)
            return new ResponseDto(true, "Customers fetched successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to fetch customers", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('inventory/:userEmail/:index')
    async deleteInventoryItem(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteInventoryItem(userEmail, parseInt(index))
            return new ResponseDto(true, "Inventory item deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete inventory item", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('thresholds/:userEmail/:index')
    async deleteThresholdSetting(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteThresholdSetting(userEmail, parseInt(index))
            return new ResponseDto(true, "Threshold setting deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete threshold setting", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('measurements/:userEmail/:index')
    async deleteUnitOfMeasurement(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteUnitOfMeasurement(userEmail, parseInt(index))
            return new ResponseDto(true, "Unit of measurement deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete unit of measurement", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('write-offs/:userEmail/:index')
    async deleteWriteOffRequest(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteWriteOffRequest(userEmail, parseInt(index))
            return new ResponseDto(true, "Write-off request deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete write-off request", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('categories/:userEmail/:index')
    async deleteCategory(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteCategory(userEmail, parseInt(index))
            return new ResponseDto(true, "Category deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete category", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('currencies/:userEmail/:index')
    async deleteCurrency(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteCurrency(userEmail, parseInt(index))
            return new ResponseDto(true, "Currency deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete currency", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('departments/:userEmail/:index')
    async deleteDepartment(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteDepartment(userEmail, parseInt(index))
            return new ResponseDto(true, "Department deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete department", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('suppliers/:userEmail/:index')
    async deleteSupplier(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteSupplier(userEmail, parseInt(index))
            return new ResponseDto(true, "Supplier deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete supplier", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('receivables/:userEmail/:index')
    async deleteReceivable(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteReceivable(userEmail, parseInt(index))
            return new ResponseDto(true, "Receivable deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete receivable", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('creditors/:userEmail/:index')
    async deleteCreditor(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteCreditor(userEmail, parseInt(index))
            return new ResponseDto(true, "Creditor deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete creditor", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    // @Patch('creditors/:userEmail/:supplierName')
    // async updateCreditor(
    //     @Param('userEmail') userEmail: string,
    //     @Param('supplierName') supplierName: string,
    //     @Body() updates: Partial<CreditorsDto>
    // ){
    //     try {
    //         const data = await this.userService.updateCreditor(userEmail, supplierName, updates)
    //         return new ResponseDto(true, "Creditor updated successfully", data)
    //     } catch (error) {
    //             throw new HttpException(
    //             new ErrorDto(error.message || "Failed to update creditor", error),
    //             error.status || HttpStatus.BAD_REQUEST
    //         )
    //     }
    // }

    @Delete('procurements/:userEmail/:index')
    async deleteProcurementRequest(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteProcurementRequest(userEmail, parseInt(index))
            return new ResponseDto(true, "Procurement request deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete procurement request", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('users/:userEmail/:index')
    async deleteUser(@Param('userEmail') userEmail: string, @Param('index') index: string){
        try {
            const data = await this.userService.deleteUser(userEmail, parseInt(index))
            return new ResponseDto(true, "User deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete user", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('payments/:userEmail/:paymentId')
    async deletePayment(@Param('userEmail') userEmail: string, @Param('paymentId') paymentId: string){
        try {
            const data = await this.userService.deletePayment(userEmail, paymentId)
            return new ResponseDto(true, "Payment deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete payment", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete('customers/:userEmail/:customerId')
    async deleteCustomer(@Param('userEmail') userEmail: string, @Param('customerId') customerId: string){
        try {
            const data = await this.userService.deleteCustomer(userEmail, customerId)
            return new ResponseDto(true, "Customer deleted successfully", data)
        } catch (error) {
                throw new HttpException(
                new ErrorDto(error.message || "Failed to delete customer", error),
                error.status || HttpStatus.BAD_REQUEST
            )
        }
    }
}
