import React from "react";
import { Bell } from 'lucide-react';


export function NotificationComponent() {

    return <button type="button" className="text-gray-400 -m-2.5 p-2.5 hover:text-gray-500">
        <span className="sr-only">View notifications</span>
        <Bell className="h-6 w-6" aria-hidden="true"/>
    </button>;
}