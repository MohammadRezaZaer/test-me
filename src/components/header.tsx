import React from "react";
import {ProfileComponent} from "@/components/profileComponent";
import {Navbar} from "@/components/Navbar";
import {cn} from "@/lib/utils";
import { NotificationComponent } from '@/components/ui/notificationComponent';
import { LoginButton } from '@/components/LoginButton';
import { ROUTES } from '@/lib/constants';

import { Menu } from 'lucide-react';

export function Header({

                                setMobSidebarOpen,
                           isAuthenticated



}) {




    return (<div
        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 lg:pl-8">
        <button type="button" className="text-gray-700 -m-2.5 p-2.5 lg:hidden"
                onClick={() => setMobSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Menu  className="h-6 w-6" aria-hidden="true"/>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

        <div className="flex flex-1 justify-between gap-x-4 self-stretch lg:flex-row-reverse lg:gap-x-6">


            <div className="flex w-full items-center gap-x-4 lg:gap-x-6">

                <Navbar/>
                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>
                {/* Show NotificationComponent if authenticated */}
                {isAuthenticated && <NotificationComponent />}

                {/* Show ProfileComponent if authenticated, else show LoginButton */}
                {isAuthenticated ? <ProfileComponent /> : <LoginButton className="bg-brand rounded-full [&_*]:text-white" href={ROUTES.AUTH} text="ورود | ثبت نام" />}

            </div>
            <div className={cn("flex h-16 shrink-0 items-center justify-center", {"max-xl:hidden":isAuthenticated})}>
                <img
                    className="h-8 w-auto"
                    src="/images/logo.svg"
                    alt="Your Company"
                />
                <span className="lg:flex lg:px-4">تست می</span>
            </div>
        </div>
    </div>)



}