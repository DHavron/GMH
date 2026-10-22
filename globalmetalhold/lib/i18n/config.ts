// Конфигурация i18n (RU/EN) для Next.js App Router
export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Переключает текущую локаль на противоположную (для переключателя RU/EN) */
export function otherLocale(locale: Locale): Locale {
  return locale === "ru" ? "en" : "ru";
}
