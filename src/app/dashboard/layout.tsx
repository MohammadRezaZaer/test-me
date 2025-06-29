
import { Metadata } from 'next';
import * as React from 'react';



export const metadata: Metadata = {
  title: 'داشبورد',
  description: 'Pre-built components with awesome default',
};

import {isAuthenticated} from "@/lib/auth";
import DashboardShell from '@/app/_layouts/dashboard-shell';

export default function DashboardLayout(props: {
    children: React.ReactNode;

}) {

    const auth_token = isAuthenticated();

    return <DashboardShell isAuthenticated={auth_token}>

        {props.children}


    </DashboardShell>;
}




