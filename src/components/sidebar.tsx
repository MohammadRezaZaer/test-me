import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import {cn} from "@/lib/utils";
import { X } from 'lucide-react';
import { LoginButton } from '@/components/LoginButton';
import { ROUTES } from '@/lib/constants';
import LogoutForm from '@/components/logout-form';

export function Sidebar(props: {
    show: boolean,
    isAuthenticated: boolean,
    onClose: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onClick: () => void,
items:[]
}) {
    return <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={props.onClose}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-900/80"/>
            </Transition.Child>

            <div className="fixed inset-0 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-16 flex w-full max-w-xs flex-1">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 right-full flex w-16 justify-center pt-5">
                                <button type="button" className="-m-2.5 p-2.5" onClick={props.onClick}>
                                    <span className="sr-only">Close sidebar</span>
                                    <X className="h-6 w-6 text-white" aria-hidden="true"/>
                                 
                                </button>
                            </div>
                        </Transition.Child>

                        <div
                            className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="/images/logo.svg"
                                    alt="Your Company"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="-mx-2 flex-1 space-y-1">
                                    {props.items.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    item.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >

                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {props.isAuthenticated ? <LogoutForm className="justify-center"/>:
                                <LoginButton className="mx-auto flex" href={ROUTES.AUTH} text="ورود | ثبت نام"/>}

                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>;
}