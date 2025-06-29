'use server';
import { setLoginCookie } from '@/lib/auth';
import { OtpInputInfer, otpSchema, PhoneInputInfer, phoneSchema } from '@/schema/schemas';






export async function sendOtpAction( data: PhoneInputInfer) {

    const result = phoneSchema.safeParse(data)

     console.log({data,result})

    // Mock sending SMS here


    if (result.success) {
        // console.log(`Sending OTP to ${result?.data.mobileNumber}`);

        return { success: true, data: result.data }
    }

    if (result.error) {
        return { success: false, error: result.error.format() }
    }



}

export async function verifyOtpAction( formData: OtpInputInfer) {

    const parsed = otpSchema.safeParse(formData);
    console.log({formData,parsed})
    if (!parsed.success) {
        return { success: false, error: parsed.error.flatten().fieldErrors };
    }
    const isOtpCorrect = formData.otp === '123456'; // demo

    if (!isOtpCorrect) {
        return { success: false, error: { otp: ['کد اشتباه است'] } };
    }
    setLoginCookie(parsed.data.mobile);
    return { success: true };
}