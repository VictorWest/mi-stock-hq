import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ReportsController } from './controller/reports.controller';
import { OrdersController } from './controller/orders.controller';
import { VendorController } from './controller/vendor.controller';
import { WorkerController } from './controller/worker.controller';
import { ComplaintController } from './controller/complaint.controller';
import { UserService } from './service/user.service';
import { InventoryRepository } from './repository/inventory.repository';
import { DepartmentRepository } from './repository/department.repository';
import { SupplierRepository } from './repository/supplier.repository';
import { ReceivablesRepository } from './repository/receivables.repository';
import { CreditorsRepository } from './repository/creditors.repository';
import { ProcurementRepository } from './repository/procurement.repository';
import { UserRepository } from './repository/user.repository';
import { PaymentRepository } from './repository/payment.repository';
import { CustomerRepository } from './repository/customer.repository';
import { VendorRepository } from './repository/vendor.repository';
import { OrdersRepository } from './repository/orders.repository';
import { VendorGlobalRepository } from './repository/vendor.global.repository';
import { WorkerRepository } from './repository/worker.repository';
import { ComplaintRepository } from './repository/complaint.repository';
import { VendorItemsGlobalRepository } from './repository/vendor-items.global.repository';
import { OrdersAdminRepository } from './repository/orders.admin.repository';

@Module({
  controllers: [UserController, ReportsController, OrdersController, VendorController, WorkerController, ComplaintController],
  providers: [
    UserService, 
    InventoryRepository, 
    DepartmentRepository, 
    SupplierRepository,
    ReceivablesRepository,
    CreditorsRepository,
    ProcurementRepository,
    UserRepository,
    PaymentRepository,
    CustomerRepository
    ,
    VendorRepository,
    VendorGlobalRepository,
    VendorItemsGlobalRepository,
    OrdersRepository
    ,
    OrdersAdminRepository,
    WorkerRepository,
    ComplaintRepository
  ]
})
export class UserModule {}