import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "Denzo Studios | %s",
    default: "Denzo Studios",
  },
  description: "A cinematic AI digital platform.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {

  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased bg-black text-white relative min-h-screen")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="hero-glow" />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
