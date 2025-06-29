import { NavLink } from "@/components/NavLink";
import { navLinks } from '@/lib/navigations-and_other_sets';


export function Navbar() {
    return (
        <nav className="w-full">
            <ul className="ml-auto hidden flex-col gap-4 md:flex-row md:items-center lg:flex">
                {navLinks.map(({ href, name }) => (
                    <NavLink key={href} href={href} >
                        {name}
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
