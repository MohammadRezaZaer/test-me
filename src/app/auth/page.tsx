'use client';


import PhoneForm from "@/components/PhoneForm";
import {useState} from "react";
import OtpForm from "@/components/OtpForm";
import NextImage from '@/components/NextImage';

export default function LoginPage() {


    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [mobile, setMobile] = useState('');

    return (

        <section className="flex h-screen w-full items-center justify-center">
            <section
                className="relative flex justify-between overflow-hidden rounded-xl h-[600px] w-[1000px] md:border md:border-solid">
                
                <section className="flex h-full flex-col items-center justify-center w-[470px]">
                    <a
                        className="cursor-pointer"
                        href="/">
                        <img
                            alt="Picture of the author" loading="lazy" width="56" height="56" decoding="async"
                            data-nimg="1"
                            className="m-auto mt-4 mb-6 logo w-[180px]" src="/images/logo.svg"
                        />
                    </a>

                    <section className="flex overflow-hidden w-[310px]">
                        <section
                            className="flex gap-5 transition-all duration-500 ease-in-out w-[1200px] min-w-[1200px]"
                        >
                            {step === 'phone' ?
                                ( <section
                                className="p-2 text-center transition-all duration-700 ease-in-out h-[325px] w-[300px]"><h2
                                className="text-center font-semibold mb-[20px] text-[30px] text-brand">خوش آمدید!</h2>
                                <section className="flex justify-center gap-1 text-lg mb-[9px]"><span
                                    className="">ورود</span><span>|</span> <span>ثبت نام</span></section>
                               <PhoneForm


                                   onSuccess={(phone: string) => {
                                       setMobile(phone);
                                       setStep('otp');
                                   }}
                               />


                            </section>):(

                            <section className="relative p-2 text-center h-[425px] w-[300px]">
                                <OtpForm

                                    mobile={mobile}
                                    onBack={() => setStep('phone')}
                                    // onSuccess={}
                                />
                            </section>)

                            }
                        </section>
                    </section>
                </section>
                <section className="z-10 hidden h-full items-center w-[600px] relative md:flex"
                style={{ backgroundColor: 'rgb(226 212 254)' }}>
                    <NextImage

                        fill
                         className="w-[555px] min-w-[555px]"
classNames={{image:"object-cover"}}
                         src="/images/login-image.jpg"
                    />
                </section>
            </section>
        </section>
    );
}
