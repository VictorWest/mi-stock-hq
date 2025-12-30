import mongoose from "mongoose";

const chargeSchema = new mongoose.Schema({
    vendorCharge: Number,
    customerCharge: Number,
    chargedAt: String
})

const orderSchema = new mongoose.Schema({
    orderId: String,
    customerId: String,
    vendorId: String,
    itemId: String,
    price: Number,
    note: String,
    status: String,
    createdAtIso: String,
    charged: { type: Boolean, default: false },
    charges: [chargeSchema]
})

const ordersManagementSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    orders: [orderSchema]
}, { timestamps: true })

const OrdersManagement = mongoose.models.OrdersManagement || mongoose.model("OrdersManagement", ordersManagementSchema)

export default OrdersManagement
