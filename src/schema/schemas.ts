import {z} from 'zod';


export const FIELDS = {
    AUTH_TOKEN: 'auth_token',
    MOBILE: 'MobileNumber',
    OTP: 'Code',


} as const
function getZodPhoneValidation() {
  return z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        // تبدیل فارسی به انگلیسی و حذف نویسه‌های غیرعددی
        const cleaned = val
          .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
          .replace(/\D/g, '')

        // اگر با 9 شروع بشه، 09 اضافه کن
        if (cleaned.length === 10 && cleaned.startsWith('9')) {
          return '0' + cleaned
        }

        return cleaned
      }
      return val
    },
    z.string({required_error: 'شماره موبایل الزامی است'})
      .nonempty('شماره موبایل را وارد کنید')
      .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
  );
}
export const otpSchema = z.object({
  [FIELDS.MOBILE]: getZodPhoneValidation(),
  [FIELDS.OTP]: z.string({required_error: 'کد ارسالی الزامی است'}).min(4, 'کد کوتاه است').max(6, 'کد بلند است')
    .nonempty('کد ارسالی را وارد کنید')
    .regex(/^\d{6}$/, 'کد ارسالی نامعتبر است')
});
export type OtpInputInfer = z.infer<typeof otpSchema>;



export const phoneSchema = z.object({
  [FIELDS.MOBILE]: getZodPhoneValidation()
})
export type PhoneInputInfer = z.infer<typeof phoneSchema>;



