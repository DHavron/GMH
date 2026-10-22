import { notFound } from "next/navigation";
import { locales, isLocale, type Locale, defaultLocale } from "./config";
import { ru } from "./ru";
import { en, type SiteStrings } from "./en";

export type { SiteStrings };
export { locales, isLocale, defaultLocale, otherLocale } from "./config";
export type { Locale } from "./config";

const dictionaries: Record<Locale, SiteStrings> = { ru, en };

/**
 * Возвращает словарь для локали.
 * Вызывается из Server Components — для неизвестной локали отдаёт 404.
 */
export function getDictionary(locale: string): SiteStrings {
  if (!isLocale(locale)) notFound();
  return dictionaries[locale];
}

/** Безопасный резолвинг параметра [locale] из dynamic routes */
export function resolveLocale(param: string | string[] | undefined): Locale {
  const value = Array.isArray(param) ? param[0] : param;
  if (value && isLocale(value)) return value;
  return defaultLocale;
}

export const allLocales = locales;
