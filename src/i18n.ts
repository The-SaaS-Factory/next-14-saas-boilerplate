import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {Pathnames} from 'next-intl/navigation';
 
// Can be imported from a shared config
export const locales = ['en', 'es', 'pt'];
export const defaultLocale = 'en' as const;
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});


export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;


export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    es: '/nombres-de-ruta',
    pt: '/pathnames'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;


