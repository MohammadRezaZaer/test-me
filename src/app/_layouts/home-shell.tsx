'use client';

import {useState} from 'react';
import {Sidebar} from '@/components/sidebar';
import {Header} from '@/components/header';
import { navLinks } from '@/lib/navigations-and_other_sets';
import Footer from '@/app/_layouts/Footer';

type Props = {
    children: React.ReactNode;
    isAuthenticated: boolean;
};
export default function HomeShell({children, isAuthenticated}: Props) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);

    return (
        <div className="overflow-x-hidden">
            <Sidebar
                show={mobSidebarOpen}
                isAuthenticated={isAuthenticated}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}
                items={navLinks}
            />

            <Header setMobSidebarOpen={setMobSidebarOpen} isAuthenticated={isAuthenticated}/>

            <main className="bg-[#F0F1F1] ">
                <div className="flex">

                    <section className="w-full rounded-xl bg-white p-1 xl:m-4 xl:px-12 xl:py-10">

                        {children}
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
