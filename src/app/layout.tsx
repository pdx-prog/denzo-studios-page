import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "Denzo Studios | %s",
    default: "Denzo Studios",
  },
  description: "A cinematic AI digital platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased bg-black text-white relative min-h-screen")}>
        <Providers>
          <div className="hero-glow" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
