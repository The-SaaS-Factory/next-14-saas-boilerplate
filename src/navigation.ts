import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {locales, pathnames, localePrefix} from './i18n';

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  });