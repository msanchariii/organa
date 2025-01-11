"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    console.log("Theme", theme);

    return (
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon /> : <Sun />}
        </Button>
    );
}
