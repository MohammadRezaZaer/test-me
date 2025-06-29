'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { faToEnDigits } from '@/lib/utils'
import { atom, useAtom } from 'jotai';
import { FIELDS, PhoneInputInfer, phoneSchema } from '@/schema/schemas';
import { sendOtpAction } from '@/app/auth/actions';

export const prevPhoneAtom = atom('')
// تعریف atom برای ذخیره مقدار شمارنده و شماره موبایل
export const countdownAtom = atom(150)


export default function PhoneForm({ onSuccess }: any) {
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
  })

  // استفاده از atom برای ذخیره مقدار شمارنده و شماره موبایل قبلی
  const [secondsLeft, setSecondsLeft] = useAtom(countdownAtom)
  const [prevPhone, setPrevPhone] = useAtom(prevPhoneAtom)

  const processForm: SubmitHandler<PhoneInputInfer> = async (data) => {
    console.log({ data })
    const result = await sendOtpAction(data)
    console.log({ result })
    if (!result) {
      console.log('Something went wrong')
      return
    }

    if (result.error) {
      console.log(result.error)
      return
    }
    if (result.success) {
      // مقایسه شماره جدید با شماره قبلی
      if (data.mobile !== prevPhone) {
        // اگر شماره جدید با شماره قبلی متفاوت بود، شمارنده را به مقدار اولیه بازگردانیم
        setSecondsLeft(150)
      }

      // ذخیره شماره موبایل جدید برای مقایسه در دفعات بعدی
      setPrevPhone(data.mobile)
      onSuccess(result?.data.mobile)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)}>
        <h2 className="mb-4 text-center text-xl font-semibold">ورود با شماره موبایل</h2>
        <FormField
          control={form.control}
          name={FIELDS.MOBILE}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>شماره همراه</FormLabel>
              <FormControl className="w-full">
                <Input
                  type="tel"
                  placeholder="09141234567"
                  maxLength={11}
                  {...field}
                  onChange={(e) => {
                    const raw = e.target.value
                    const converted = faToEnDigits(raw).replace(/\D/g, '')
                    field.onChange(converted)

                    if (!converted) {
                      form.clearErrors(FIELDS.MOBILE)
                      return
                    }

                    if (!converted.startsWith('09')) {
                      form.setError(FIELDS.MOBILE, {
                        type: 'manual',
                        message: 'شماره باید با 09 شروع شود.',
                      })
                    } else {
                      form.clearErrors(FIELDS.MOBILE)
                    }

                    if (converted.length === 11) {
                      form.trigger(FIELDS.MOBILE)
                    }
                  }}
                  value={field.value}
                  dir="ltr"
                />
              </FormControl>
              <FormDescription>لطفا شماره همراه خود را وارد نمایید.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'ارسال...' : 'ارسال کد'}
        </Button>
      </form>
    </Form>
  )
}
