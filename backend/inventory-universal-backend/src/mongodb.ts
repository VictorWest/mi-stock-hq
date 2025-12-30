import mongoose from "mongoose";

export async function connectDB(password: string) {
    const uri = `mongodb+srv://mywondervic_db_user:${password}@cluster0.abimafm.mongodb.net/?appName=Cluster0/inventory-universal`;
    await mongoose.connect(uri)
    console.log("Mongoose connected")
}
