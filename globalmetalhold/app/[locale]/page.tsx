// Серверный режим (npm run dev / npm run build): маршрут /[locale] → /ru, /en.
// В статической деплой-сборке игнорируется (pageExtensions=["deploy.tsx"]).
import type { Locale } from "@/lib/i18n";
import { allLocales } from "@/lib/i18n";
import SitePageContent from "@/lib/site-page";

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function ServerLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = (allLocales as readonly string[]).includes(raw) ? (raw as Locale) : "ru";
  return <SitePageContent locale={locale} />;
}
