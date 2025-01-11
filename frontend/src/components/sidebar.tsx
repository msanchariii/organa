import {
    Bell,
    LayoutDashboard,
    ClipboardMinus,
    HeartPulse,
    Settings,
} from "lucide-react";
import H2 from "./typography/H2";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const Sidebar = () => {
    return (
        <div className="bg-sidebar-background flex h-full w-full max-w-64 flex-col justify-between p-8">
            <div className="w-full space-y-8">
                <H2 className="text-primary">Organa</H2>
                <nav className="flex flex-col gap-8">
                    {sidebarLinks.map(({ icon, text, path }) => (
                        <SidebarLink
                            key={text}
                            text={text}
                            path={path}
                            icon={React.createElement(icon)}
                        ></SidebarLink>
                    ))}
                </nav>
            </div>
            <div className="flex flex-col gap-4">
                <ModeToggle />
                <Button>Logout</Button>
            </div>
        </div>
    );
};

export default Sidebar;

const SidebarLink = ({
    icon,
    text,
    path,
}: {
    icon?: React.ReactNode;
    text: string;
    path: string;
}) => {
    return (
        <Link href={path ? path : "/"} className="flex w-full gap-2 text-left">
            {icon}
            {text}
        </Link>
    );
};

const sidebarLinks = [
    {
        icon: LayoutDashboard,
        text: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: HeartPulse,
        text: "Organ",
        path: "/organ",
    },
    {
        icon: Bell,
        text: "Matches",
        path: "/matches",
    },
    {
        icon: ClipboardMinus,
        text: "Patient",
        path: "/patient",
    },
    {
        icon: Settings,
        text: "Settings",
        path: "/settings",
    },
];

/*
Top - Logo & Name
Middle - Navigation (Dashboard, Organ, matches, patient, settings)
Bottom - Logout
*/
