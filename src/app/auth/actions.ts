'use server';
import { setLoginCookie } from '@/lib/auth';
import { FIELDS, OtpInputInfer, otpSchema, PhoneInputInfer, phoneSchema } from '@/schema/schemas';






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


export async function verifyOtpAction(formData: OtpInputInfer) {
    // 1. validate the formData
    const parsed = otpSchema.safeParse(formData)
    console.log({ formData, parsed })
    if (!parsed.success) {
        return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    // 2. check OTP (demo)
    const isOtpCorrect = parsed.data[FIELDS.OTP] === '12345'
    if (!isOtpCorrect) {
        return { success: false, error: { otp: ['کد اشتباه است'] } }
    }

    // 3. fetch a random user
    let user: any = null
    try {
        const res = await fetch('https://randomuser.me/api/?results=1&nat=us')
        if (!res.ok) {
            throw new Error(`randomuser fetch failed: ${res.status}`)
        }
        const json = await res.json()
        // randomuser.me returns { results: [ ...userData ] }
        user = json.results?.[0] ?? null
    } catch (err) {
        console.error('Failed to fetch random user', err)
        return {
            success: false,
            error: { fetch: ['خطا در دریافت اطلاعات کاربر'] },
        }
    }

    // 4. set the login cookie and return the user object
    setLoginCookie(parsed.data[FIELDS.MOBILE])

    return {
        success: true,
        user,
    }
}