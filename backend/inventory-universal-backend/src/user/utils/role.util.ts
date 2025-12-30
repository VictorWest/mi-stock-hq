import { connectDB } from "src/mongodb";
import User from "src/auth/model/user";
import { ConfigService } from "@nestjs/config";

export async function isSuperAdmin(email: string, dbPassword?: string){
    if (!email) return false
    if (dbPassword) await connectDB(dbPassword)
    const user = await User.findOne({ email })
    if (!user) return false
    return user.designation === 'super'
}

export async function isVendor(email: string, dbPassword?: string){
    if (!email) return false
    if (dbPassword) await connectDB(dbPassword)
    const user = await User.findOne({ email })
    if (!user) return false
    return user.designation === 'vendor'
}
