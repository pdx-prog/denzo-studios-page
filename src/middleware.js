import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from '@/navigation';

export default createMiddleware({
    locales: locales,
    defaultLocale: 'en',
    localePrefix: localePrefix,
    localeDetection: false,
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
