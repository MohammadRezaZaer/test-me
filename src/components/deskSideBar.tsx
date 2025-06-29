import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {SIDEBAR_WIDTH} from "@/lib/constants";
import Avatar from '~/svg/avatar.svg';
import EditPen from '~/svg/edit.svg';

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DeskSideBarProps {
    sidebarOpen: boolean;
    onClick: () => void;
    navigationItems: NavigationItem[];
}

/**
 * A responsive desktop sidebar for navigation.
 * @param sidebarOpen - Whether the sidebar is expanded.
 * @param onClick - Callback to toggle sidebar state.
 * @param navigationItems - Array of navigation items with name, href, and icon.
 */
export function DeskSideBar({ sidebarOpen, onClick, navigationItems }: DeskSideBarProps) {
    const pathname = usePathname();
    const currentSegment = pathname.split('/').filter(Boolean).pop();

    const getLinkClasses = (isActive: boolean) =>
        cn(
            isActive ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
            'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
        );

    const navItems = useMemo(() => {
        // console.log({navigationItems})
        if (!navigationItems.length) {
            return <div className="p-4 text-gray-500">No navigation items available</div>;
        }

        return navigationItems.map((item) => {
            const itemSegment = item.href && typeof item.href === 'string'
                ? item.href.split('/').filter(Boolean).pop()
                : '';
            const isActive = currentSegment === itemSegment;

            return (
                <li key={item.name} className="w-full min-w-12">
                    <Link
                        href={item.href}
                        className={getLinkClasses(isActive)}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <span className={cn({ 'sr-only': !sidebarOpen })}>{item.name}</span>
                    </Link>
                </li>
            );
        });
    }, [navigationItems, currentSegment, sidebarOpen]);

    return (
        <div
            className={cn(
                'hidden lg:inset-y-0 lg:end-0 lg:z-30 lg:block bg-white lg:overflow-y-auto shadow-sm border-l border-gray-200 lg:pb-4 transition-all duration-500 lg:min-h-[calc(100vh-64px)]',
                SIDEBAR_WIDTH.collapsed,
                {[SIDEBAR_WIDTH.expanded]: sidebarOpen}
            )}
        >

            <section
                className={cn("transition-all bg-[url('/images/rec-bg-dash.svg')] bg-[length:211px_211px] bg-[left_-1rem_top_0rem] bg-no-repeat flex  flex-col items-center border-b border-solid border-[#CCE0F9] dark:bg-[#33373d]",{"h-[173px]":sidebarOpen})}>

                <Avatar className="my-4 aspect-square w-12 text-brand"/>
                {sidebarOpen &&
                    <>
                        <section className="mt-3"><span className="ltr ml-[14px] dark:text-white">09148925258</span>
                            <button>

                                <EditPen className="aspect-square w-3 text-brand"/>
                            </button>
                        </section>
                        <span className="mt-5 block font-bold text-[14px]">به داشبورد بیمه امداد خوش آمدید</span>
                    </>}
            </section>


            <nav>
                <ul role="list" className="flex flex-col items-center px-4 space-y-1 min-w-12">
                    <button
                        onClick={onClick}
                        className={cn('w-full min-w-12 active:scale-95 transition self-start', {
                            'rotate-180': sidebarOpen,
                        })}
                        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        type="button"
                    >
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="24" height="24" rx="4" transform="matrix(-1 0 0 1 36 12)" fill="#EBE7FF"/>
                            <path d="M17 24H31" stroke="#6E21FF" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M22 29L17 24" stroke="#6E21FF" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M22 19L17 24" stroke="#6E21FF" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {navItems}
                </ul>
            </nav>
        </div>
    );
}