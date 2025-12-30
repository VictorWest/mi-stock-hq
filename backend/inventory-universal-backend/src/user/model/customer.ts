import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    customerType: {
      type: String,
      enum: ["regular", "vip", "corporate"],
      default: "regular",
    },
    lastPurchaseDate: { type: Date },
    totalSpend: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
}, { timestamps: true })

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema)

export default Customer