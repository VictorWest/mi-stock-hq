import 'dotenv/config'
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_KEY!)

export const sendEmail = async (userEmail: string, subject: string, body: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Mi-Inventory <onboarding@resend.dev>',
            to: [userEmail],
            subject,
            html: body
        });
    
        if (error) {
            return { success: false, error }
        }
    
        return {success: true, data};
        
    } catch (error) {
        return { success: false, error }
    }
}