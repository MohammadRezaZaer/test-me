'use server';

import { logoutUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export async function logoutAction() {
    logoutUser();
    redirect(ROUTES.AUTH);
}
