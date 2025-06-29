'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {SubmitHandler,useForm} from "react-hook-form";
import OtpInput from 'react-otp-input';
import {toast} from "sonner";
import * as z from "zod";

import { ROUTES } from '@/lib/constants';

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { ResendOtpButton } from '@/components/ui/ResendOtpButton';

import { verifyOtpAction } from '@/app/auth/actions';
import { FIELDS, OtpInputInfer, otpSchema } from '@/schema/schemas';


export default function OtpForm({mobile, onBack, onSuccess}: {
  mobile: string,
  onBack: () => void,
  onSuccess?: () => void
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      [FIELDS.OTP]: '',
      [FIELDS.MOBILE]: mobile,
    },
  });

  const {mutate: verifyOtp, isPending} = useMutation({
    mutationFn: verifyOtpAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('با موفقیت وارد شدید!');
        onSuccess?.(); // Optional external callback
        router.push(ROUTES.DASHBOARD.default);
      } else if (result.error) {
        toast.error('کد وارد شده معتبر نیست.');
        Object.entries(result.error).forEach(([key, messages]) => {
          form.setError(key as keyof OtpInputInfer, {
            message: messages?.[0] || 'خطا',
            type: 'manual'
          });
        });
      }
    },
    onError: () => {
      toast.error('خطایی در ارتباط با سرور رخ داد.');
    },
  });

  const handleSubmit: SubmitHandler<OtpInputInfer> = data => {
    verifyOtp(data);
  };

  return (
    <>
      <button onClick={onBack} className="mr-auto flex justify-center text-black">
        <span>بازگشت</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.5 6L9.5 12L15.5 18"/>
        </svg>
      </button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center gap-y-4 py-4"
        >
          <h2 className="text-[16px]">کد فعال‌سازی را وارد نمایید</h2>

          <FormField
            control={form.control}
            name={FIELDS.OTP}
            render={({field}) => (
              <FormItem className="flex flex-col items-center justify-center direction-ltr">
                <FormControl>


                  <OtpInput
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value.length === 5) {
                        form.handleSubmit(handleSubmit)();
                      }
                    }}

                    numInputs={5}
                    renderSeparator={<span className="text-transparent">-</span>}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input   {...props} type="number" className="!w-12 aspect-square" />}
                  />


                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <input type="hidden" {...form.register(FIELDS.MOBILE)} value={mobile}/>

          <Button
            isLoading={isPending}
            type="submit"
            className="mt-4 w-full"
            disabled={isPending}
          >
            ورود
          </Button>
        </form>
      </Form>

      <ResendOtpButton
        duration={150}
        onResend={() => {
          // Optional: handle resend logic
          toast.success('کد فعال‌سازی مجدداً ارسال شد.');
        }}
      />
    </>
  );
}
