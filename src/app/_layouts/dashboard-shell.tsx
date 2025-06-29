'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { DeskSideBar } from '@/components/deskSideBar';
import {BackLink} from "@/components/Back-Link";
import {DashboardNavigationItems, navigation} from "@/lib/navigations-and_other_sets";

type Props = {
    children: React.ReactNode;
    isAuthenticated: boolean;
};
export default function DashboardShell({ children ,isAuthenticated }: Props) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
    const [SidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div>
            <Sidebar
                show={mobSidebarOpen}
                isAuthenticated={isAuthenticated}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}
items={navigation}
            />

            <Header setMobSidebarOpen={setMobSidebarOpen} isAuthenticated={isAuthenticated} />

            <main className="bg-[#F0F1F1]">
                <div className="flex overflow-x-hidden min-h-[93vh]">
                    <DeskSideBar
                        sidebarOpen={SidebarOpen}
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        navigationItems={DashboardNavigationItems}
                    />
                    <section className="w-full rounded-xl bg-white p-1 xl:m-4 xl:px-12 xl:py-10">
                        <BackLink href="../" />
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
}
