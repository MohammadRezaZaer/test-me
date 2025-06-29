'use client';

import Link from 'next/link';
import { ChevronRight} from 'lucide-react';
import { cn } from '@/lib/utils'; // optional, for conditional classes

type BackLinkProps = {
    href: string;
    label?: string;
    className?: string;
};

export function BackLink({ href, label = 'بازگشت', className }: BackLinkProps) {
    return (
        <Link
            href={href}
            className={cn('text-blue text-[12px] flex items-center w-fit gap-1 mb-2', className)}
        >
            <ChevronRight className="size-3" />
            <span>{label}</span>
        </Link>
    );
}
