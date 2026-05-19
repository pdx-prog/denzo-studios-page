"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

// Parche de compatibilidad para React 19 + next-themes en desarrollo
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const origError = console.error;
    console.error = (...args: any[]) => {
        if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
            return;
        }
        origError.apply(console, args);
    };
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            {children}
        </ThemeProvider>
    );
}
