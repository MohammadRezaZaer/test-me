"use client"

import React, {Fragment, useState} from 'react'


const cards = [
    { title: "خوش آمدید", value: 98 },

];
export default function Page() {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false)
    const [SidebarOpen, setSidebarOpen] = useState(false)


    return (<>


            {/*<div className="grid gap-4 mx-[24px] md:w-[80%] md:mx-auto xl:w-full xl:grid-cols-3 xl:gap-6">*/}


            {/*    <DashboardCard*/}
            {/*        href="/dashboard/Inquiry/violation"*/}
            {/*        title="استعلام خلافی"*/}
            {/*        Icon={Car}*/}
            {/*    />*/}
            {/*    <DashboardCard*/}
            {/*        href="/dashboard/Inquiry/plates"*/}
            {/*        title="پلاک های من"*/}
            {/*        Icon={BadgeCheck}*/}
            {/*    />*/}


            {/*</div>*/}


            <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-3/4 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className=" bg-[url('/images/rec-bg.svg')] bg-[length:333px_333px] bg-[left_0rem_top_-3.5rem] bg-no-repeat border-2 border-brand/80 gap-y-8 flex rounded-lg p-4 shadow hover:shadow-md transition flex-col items-center justify-center"
                    >
                        <p className="mb-2 text-sm text-gray-700">{card.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                ))}
            </div>

        </>

    );
}


