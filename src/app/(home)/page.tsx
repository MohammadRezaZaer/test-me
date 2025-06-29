"use client";

import React from "react";
import NextImage from "@/components/NextImage";
import Link from "next/link";
import {

  Globe,

  LifeBuoy, User, LogInIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { ROUTES } from '@/lib/constants';

type Category = "public" | "rescuer";

interface MenuItem {
    href: string;
    icon: JSX.Element;
    label: string;
    soon?: boolean;
    category: Category;
}

const ICON_SIZE = "w-[clamp(48px,5vw,72px)] h-[clamp(48px,5vw,72px)]";

const menuItems: MenuItem[] = [
    // خدمات به عموم
    {
        href: ROUTES.AUTH,
        icon: <LogInIcon className={cn(ICON_SIZE)} />,
        label: "ورود",
        category: "public",
    },
    {
        href: ROUTES.DASHBOARD.default,
        icon: <User className={cn(ICON_SIZE)} />,
        label: "داشبورد",
        category: "public",
    },


];

export default function Page() {
    const publicItems = menuItems.filter((i) => i.category === "public");
    const rescuerItems = menuItems.filter((i) => i.category === "rescuer");

    return (
        <div className="px-4 py-8 max-w-[1366px] mx-auto">
            <HeroSection />

            <CategorySection
                title="خدمات"
                items={publicItems}
                accent="brand"
                SectionIcon={Globe}
            />


        </div>
    );
}

function HeroSection() {
    return (
        <section className="text-center mb-12">
            <div className="inline-flex items-center gap-3">
                <NextImage
                    src="/images/logo.svg"
                    alt="تست می"
                    width={88}
                    height={88}
                />
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800">
                    تست می
                </h1>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                معتبرترین پلتفرم تستی
            </p>

        </section>
    );
}

type Accent = "brand" | "blue";
interface CategorySectionProps {
    title: string;
    items: MenuItem[];
    accent?: Accent;
    SectionIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
function CategorySection({
                             title,
                             items,
                             accent = "brand",
                             SectionIcon,
                         }: CategorySectionProps) {
    const headingColor = accent === "blue" ? "text-blue-600" : "text-brand";
    const lineGradient = accent === "blue"
        ? "from-blue-600/50 to-transparent"
        : "from-brand/50 to-transparent";

    return (
        <section className="mb-12">
            <div className="flex items-center justify-center mb-6">
                <SectionIcon className={cn("w-6 h-6 ml-2", headingColor)} />
                <h3 className={cn("text-2xl font-bold", headingColor)}>{title}</h3>
                <div
                    className={cn(
                        "flex-1 h-px ml-4",
                        `bg-gradient-to-r ${lineGradient}`
                    )}
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(({ href, icon, label, soon }) => (
                    <Link
                        key={label}
                        href={href}
                        className="relative flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 group"
                        aria-label={label}
                    >
                        {soon && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded">
                به زودی
              </span>
                        )}
                        <div className="relative flex items-center justify-center">
                            <svg
                                className="absolute aspect-square text-brand"
                                viewBox="0 0 857 857"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M428.5 0L731.495 125.505L857 428.5L731.495 731.495L428.5 857L125.505 731.495L0 428.5L125.505 125.505L428.5 0Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <div className="relative p-6 text-white">{icon}</div>
                        </div>
                        <span className="mt-3 text-base font-medium text-gray-800 group-hover:text-brand transition-colors">
              {label}
            </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}