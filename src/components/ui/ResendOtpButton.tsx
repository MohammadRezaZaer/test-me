'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { atom, useAtom } from 'jotai'
import {countdownAtom} from "@/components/PhoneForm";



interface ResendOtpButtonProps {
    duration?: number // countdown seconds
    onResend: () => void
    className?: string
    label?: string
    resendLabel?: string
}

export function ResendOtpButton({
                                    duration = 150,
                                    onResend,
                                    className,
                                    label = 'ارسال مجدد کد تا',
                                    resendLabel = 'ارسال مجدد کد'
                                }: ResendOtpButtonProps) {
    // استفاده از atom برای گرفتن مقدار شمارنده
    const [secondsLeft, setSecondsLeft] = useAtom(countdownAtom)

    useEffect(() => {
        if (secondsLeft === 0) return

        const interval = setInterval(() => {
            setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(interval)
    }, []) // شمارش معکوس از ابتدا شروع می‌شود، اما وضعیت از atom می‌آید

    const handleClick = useCallback(() => {
        onResend()
        setSecondsLeft(duration) // زمانی که کاربر دکمه ارسال مجدد را بزند، شمارنده دوباره شروع می‌شود
    }, [onResend, duration, setSecondsLeft])

    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const secs = String(secondsLeft % 60).padStart(2, '0')



    return (
        <div className={`space-y-1 text-center ${className ?? ''}`}>
            <Button
                variant="link"
                size="sm"
                onClick={handleClick}
                disabled={secondsLeft > 0}
            >
                {resendLabel}
            </Button>
            {secondsLeft > 0 && (
                <div className="text-sm text-muted-foreground">
                    {label} {mins}:{secs}
                </div>
            )}
        </div>
    )
}
