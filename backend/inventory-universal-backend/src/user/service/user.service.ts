import { Injectable } from '@nestjs/common';
import { CategoryDto, CurrencyDto, InventoryItemDto, ThresholdSettingDto, UnitOfMeasurementDto, WriteOffRequestDto } from '../dtos/inventory-mangement.dto';
import { InventoryRepository } from '../repository/inventory.repository';
import { DepartmentDto } from '../dtos/department-management.dto';
import { DepartmentRepository } from '../repository/department.repository';
import { SupplierRepository } from '../repository/supplier.repository';
import { SupplierDto } from '../dtos/supplier-management.dto';
import { ReceivablesRepository } from '../repository/receivables.repository';
import { ReceivablesDto, ReceivablePaymentDto } from '../dtos/receivables-management.dto';
import { CreditorsRepository } from '../repository/creditors.repository';
import { CreditorsDto } from '../dtos/creditors-management.dto';
import { ProcurementDto } from '../dtos/procurement-management.dto';
import { ProcurementRepository } from '../repository/procurement.repository';
import { UserRepository } from '../repository/user.repository';
import { UserManagementDto } from '../dtos/user-management.dto';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentDto } from '../dtos/payment.dto';
import { CustomerRepository } from '../repository/customer.repository';
import { CustomerDto } from '../dtos/customer.dto';
import { IndustryName } from 'src/interface/industry';
import { VendorRepository } from '../repository/vendor.repository';
import { OrdersRepository } from '../repository/orders.repository';

@Injectable()
export class UserService {
    constructor (
        private inventoryRepository: InventoryRepository,
        private departmentRepository: DepartmentRepository,
        private supplierRepository: SupplierRepository,
        private reveivablesRepository: ReceivablesRepository,
        private creditorsRepository: CreditorsRepository,
        private procurementRepository: ProcurementRepository,
        private userRepository: UserRepository,
        private paymentRepository: PaymentRepository,
        private customerRepository: CustomerRepository
        ,
        private vendorRepository: VendorRepository,
        private ordersRepository: OrdersRepository
    ) {}

    // Inventory repositories
    async addInventory(userEmail: string, inventoryItem: InventoryItemDto){
        return this.inventoryRepository.addInventory(userEmail, inventoryItem)
    }

    async addThresholdSetting(userEmail: string, thresholdSetting: ThresholdSettingDto){
        return this.inventoryRepository.addThresholdSetting(userEmail, thresholdSetting)
    }

    async addUnitOfMesurement(userEmail: string, unitOfMesurement: UnitOfMeasurementDto){
        return this.inventoryRepository.addUnitOfMesurement(userEmail, unitOfMesurement)
    }

    async addWriteOffRequests(userEmail: string, writeOffRequest: WriteOffRequestDto){
        return this.inventoryRepository.addWriteOffRequests(userEmail, writeOffRequest)
    }

    async addCategories(userEmail: string, category: CategoryDto){
        return this.inventoryRepository.addCategories(userEmail, category)
    }

    async addCurrency(userEmail: string, currency: CurrencyDto){
        return this.inventoryRepository.addCurrency(userEmail, currency)
    }

    async getInventory(userEmail: string){
        return this.inventoryRepository.getInventory(userEmail)
    }

    async getThresholdSettings(userEmail: string){
        return this.inventoryRepository.getThresholdSettings(userEmail)
    }

    async getUnitOfMesurement(userEmail: string){
        return this.inventoryRepository.getUnitOfMesurement(userEmail)
    }

    async getWriteOffRequests(userEmail: string){
        return this.inventoryRepository.getWriteOffRequests(userEmail)
    }

    async getCategories(userEmail: string){
        return this.inventoryRepository.getCategories(userEmail)
    }

    async getCurrency(userEmail: string){
        return this.inventoryRepository.getCurrency(userEmail)
    }

    async deleteInventoryItem(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteInventoryItem(userEmail, itemIndex)
    }

    async deleteThresholdSetting(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteThresholdSetting(userEmail, itemIndex)
    }

    async deleteUnitOfMeasurement(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteUnitOfMeasurement(userEmail, itemIndex)
    }

    async deleteWriteOffRequest(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteWriteOffRequest(userEmail, itemIndex)
    }

    async deleteCategory(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteCategory(userEmail, itemIndex)
    }

    async deleteCurrency(userEmail: string, itemIndex: number){
        return this.inventoryRepository.deleteCurrency(userEmail, itemIndex)
    }

    // Department repositories
    async addDepartment(userEmail: string, department: DepartmentDto){
        return this.departmentRepository.addDepartment(userEmail, department)
    }

    async getDepartments(userEmail: string){
        return this.departmentRepository.getDepartments(userEmail)
    }

    async deleteDepartment(userEmail: string, itemIndex: number){
        return this.departmentRepository.deleteDepartment(userEmail, itemIndex)
    }

    // Supplier repositories
    async addSupplier(userEmail: string, supplier: SupplierDto){
        return this.supplierRepository.addSupplier(userEmail, supplier)
    }

    async getSuppliers(userEmail: string){
        return this.supplierRepository.getSuppliers(userEmail)
    }

    async deleteSupplier(userEmail: string, itemIndex: number){
        return this.supplierRepository.deleteSupplier(userEmail, itemIndex)
    }

    // Receivables repositories
    async addReceivable(userEmail: string, receivable: ReceivablesDto){
        return this.reveivablesRepository.addReceivable(userEmail, receivable)
    }

    async getReceivables(userEmail: string){
        return this.reveivablesRepository.getReceivables(userEmail)
    }

    async deleteReceivable(userEmail: string, itemIndex: number){
        return this.reveivablesRepository.deleteReceivable(userEmail, itemIndex)
    }

    async updateReceivablePayment(userEmail: string, customerName: string, cashierName: string, payment: ReceivablePaymentDto){
        return this.reveivablesRepository.updateReceivablePayment(userEmail, customerName, cashierName, payment)
    }

    async getPaymentHistory(userEmail: string, customerName: string, cashierName: string){
        return this.reveivablesRepository.getPaymentHistory(userEmail, customerName, cashierName)
    }

    // Creditors repositories
    async addCreditor(userEmail: string, creditor: CreditorsDto){
        return this.creditorsRepository.addCreditor(userEmail, creditor)
    }

    async getCreditors(userEmail: string){
        return this.creditorsRepository.getCreditors(userEmail)
    }

    async deleteCreditor(userEmail: string, itemIndex: number){
        return this.creditorsRepository.deleteCreditor(userEmail, itemIndex)
    }

    async updateCreditor(userEmail: string, supplierName: string, updates: Partial<CreditorsDto>){
        return this.creditorsRepository.updateCreditor(userEmail, supplierName, updates)
    }

    // Procurement repositories
    async addProcurement(userEmail: string, procurement: ProcurementDto){
        return this.procurementRepository.addProcurement(userEmail, procurement)
    }

    async getProcurementRequests(userEmail: string){
        return this.procurementRepository.getRequests(userEmail)
    }

    async deleteProcurementRequest(userEmail: string, itemIndex: number){
        return this.procurementRepository.deleteRequest(userEmail, itemIndex)
    }

    // User repositories
    async updateIndustry(userEmail: string, industry: IndustryName){
        return this.userRepository.updateIndustry(userEmail, industry)
    }

    async addUser(userEmail: string, user: UserManagementDto){
        return this.userRepository.addUser(userEmail, user)
    }

    async getUsers(userEmail: string){
        return this.userRepository.getUsers(userEmail)
    }

    async deleteUser(userEmail: string, itemIndex: number){
        return this.userRepository.deleteUser(userEmail, itemIndex)
    }

    // Payment repositories
    async addPayment(userEmail: string, payment: PaymentDto){
        return this.paymentRepository.addPayment(userEmail, payment)
    }

    async getPayments(userEmail: string){
        return this.paymentRepository.getPayments(userEmail)
    }

    async deletePayment(userEmail: string, paymentId: string){
        return this.paymentRepository.deletePayment(userEmail, paymentId)
    }

    // Customer repositories
    async addCustomer(userEmail: string, customer: CustomerDto){
        return this.customerRepository.addCustomer(userEmail, customer)
    }

    async getCustomers(userEmail: string){
        return this.customerRepository.getCustomers(userEmail)
    }

    async deleteCustomer(userEmail: string, customerId: string){
        return this.customerRepository.deleteCustomer(userEmail, customerId)
    }

    // Vendor repositories
    async getVendorItems(userEmail: string, vendorId: string){
        return this.vendorRepository.getVendorItems(userEmail, vendorId)
    }

    async addVendorItem(userEmail: string, vendorId: string, item: any){
        return this.vendorRepository.addVendorItem(userEmail, vendorId, item)
    }

    async updateVendorItemPrice(userEmail: string, vendorId: string, itemId: string, price: number){
        return this.vendorRepository.updateVendorItemPrice(userEmail, vendorId, itemId, price)
    }

    async getAllVendors(userEmail: string){
        return this.vendorRepository.getAllVendors(userEmail)
    }

    // Orders repositories
    async createConnection(userEmail: string, connection: any){
        return this.ordersRepository.createConnection(userEmail, connection)
    }

    async chargeParties(userEmail: string, charge: any){
        return this.ordersRepository.chargeParties(userEmail, charge)
    }
}