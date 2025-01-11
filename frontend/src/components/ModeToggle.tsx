"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    console.log("Theme", theme);

    return (
        <Button
            variant="outline"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? (
                <>
                    <Moon /> Dark
                </>
            ) : (
                <>
                    <Sun /> Light
                </>
            )}
        </Button>
    );
}
