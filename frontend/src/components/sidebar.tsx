"use client";
import {
    Bell,
    LayoutDashboard,
    ClipboardMinus,
    HeartPulse,
    // Settings,
} from "lucide-react";
import H2 from "./typography/H2";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    console.log("Pathname", pathname);
    return (
        <div className="bg-sidebar-background flex h-full w-full max-w-64 flex-col justify-between py-4">
            <div className="w-full">
                <H2 className="text-primary px-6">Organa</H2>
                <nav className="flex flex-col">
                    {sidebarLinks.map(({ icon, text, path }) => (
                        <SidebarLink
                            key={text}
                            text={text}
                            path={path}
                            icon={React.createElement(icon, {
                                size: 20,
                                className: `${
                                    path === pathname
                                        ? "text-white"
                                        : "text-primary"
                                }`,
                            })}
                        ></SidebarLink>
                    ))}
                </nav>
            </div>
            <div className="flex flex-col gap-4 px-8">
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
    const pathName = usePathname();
    return (
        <Link
            href={path ? path : "/"}
            className={`flex w-full gap-2 px-8 py-4 text-left text-sm font-semibold ${
                path === pathName ? "bg-primary text-white" : ""
            }`}
        >
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
    // {
    //     icon: Settings,
    //     text: "Settings",
    //     path: "/settings",
    // },
];

/*
Top - Logo & Name
Middle - Navigation (Dashboard, Organ, matches, patient, settings)
Bottom - Logout
*/
