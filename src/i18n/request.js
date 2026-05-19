import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    const activeLocale = locale || 'en';

    return {
        locale: activeLocale,

        messages: {
            Navbar: (await import(`../../messages/${activeLocale}/NavBar.json`)).default,
            Home: (await import(`../../messages/${activeLocale}/Home.json`)).default,
            AboutUs: (await import(`../../messages/${activeLocale}/About-Us.json`)).default,
            Contact: (await import(`../../messages/${activeLocale}/Contact.json`)).default,
            GAds: (await import(`../../messages/${activeLocale}/GAds.json`)).default,
            MetaAds: (await import(`../../messages/${activeLocale}/MetaAds.json`)).default,
            Seo: (await import(`../../messages/${activeLocale}/Seo.json`)).default,
            IaDev: (await import(`../../messages/${activeLocale}/IaDev.json`)).default,
            GraphicD: (await import(`../../messages/${activeLocale}/GraphicD.json`)).default,
            WebDev: (await import(`../../messages/${activeLocale}/WebDev.json`)).default,
            CallCenter: (await import(`../../messages/${activeLocale}/CallCenter.json`)).default,
        }
    };
});