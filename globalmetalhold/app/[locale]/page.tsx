import type { Locale } from "@/lib/i18n";
import { allLocales, getDictionary } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Equipment from "@/components/sections/Equipment";
import Advantages from "@/components/sections/Advantages";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import LeadForm from "@/components/sections/LeadForm";
import Contacts from "@/components/sections/Contacts";

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

/** Одностраничный сайт-визитка: все секции на одной странице */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (allLocales as readonly string[]).includes(raw) ? (raw as Locale) : "ru";
  const strings = getDictionary(locale);

  return (
    <>
      <Hero strings={strings} locale={locale} />
      <About strings={strings} />
      <Services strings={strings} />
      <Equipment strings={strings} />
      <Advantages strings={strings} />
      <Portfolio strings={strings} />
      <Process strings={strings} />
      {/* Секция заявки — ключевой элемент: форма + контакты/карта */}
      <LeadForm strings={strings} locale={locale} />
      <Contacts strings={strings} locale={locale} />
    </>
  );
}
