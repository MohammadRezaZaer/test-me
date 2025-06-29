
import { Metadata } from 'next';
import * as React from 'react';
import { ReactQueryClientProvider } from '@/data/client/ReactQueryClientProvider';


export const metadata: Metadata = {
  title: 'ورود به سامانه',
  description: 'سامانه ی جامع دکاموند',
};



export default function Layout(props: {
    children: React.ReactNode;

}) {


    return (<ReactQueryClientProvider>

    <main className="flex h-screen items-center justify-center bg-gray-100">
        {props.children}

    </main>
    </ReactQueryClientProvider>)


}




