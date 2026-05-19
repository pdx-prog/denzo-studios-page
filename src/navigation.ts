import { createNavigation } from "next-intl/navigation";
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';
export const localePrefix = 'always';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
    locales,
    localePrefix,
    defaultLocale,
});