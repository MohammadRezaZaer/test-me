import { FolderIcon, Home, HomeIcon } from 'lucide-react';
import { ROUTES } from './constants';

export const DashboardNavigationItems = [
  {
    name: 'داشبورد',
    href: ROUTES.DASHBOARD.default,
    icon: Home,
  },

];


export const navigation = [
  {name: 'داشبورد', href: ROUTES.DASHBOARD.default, icon: HomeIcon},
]
export const navLinks = [
    {name: "خانه", href: "/", icon: HomeIcon, current: false},
    {name: "تماس با ما", href: "/contact-us", icon: FolderIcon, current: false},
];
