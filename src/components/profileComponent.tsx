import {Menu, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import { cn, userAtom } from '@/lib/utils';
import { ROUTES, TextBucket } from '@/lib/constants';
import { ChevronDownIcon } from 'lucide-react';
import LogoutForm from '@/components/logout-form';
import { useAtom } from 'jotai'

const userNavigation = [
    {name: 'داشبورد', href: ROUTES.DASHBOARD.default},
    {name: 'حساب کاربری', href: ROUTES.DASHBOARD.EditAccount},
    {name: TextBucket.Sign_out, href: '#'},
]

export function ProfileComponent() {

  const [user] = useAtom(userAtom)


  return <>
        {/* Profile dropdown */}
        <Menu as="div" className="relative">
            <Menu.Button className="ml-4 flex w-full items-center min-w-[28px] p-1.5" >
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src={user?.picture?.thumbnail}
                    alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                      <span className="mr-4 whitespace-nowrap text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        {[user?.name?.title, user?.name?.first, user?.name?.last]
                          .filter(Boolean)
                          .join(' ')
                          .trim()}
                      </span>
                      <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute rtl:left-0 z-10 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 mt-2.5 focus:outline-none">
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) =>
                                item.name === TextBucket.Sign_out ? (
                                    <LogoutForm />
                                ) : (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )
                            }
                        </Menu.Item>
                    ))}

                </Menu.Items>
            </Transition>
        </Menu>
    </>;
}