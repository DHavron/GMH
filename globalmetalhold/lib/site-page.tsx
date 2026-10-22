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

/** Общий контент сайт-визитки. Точки входа: /[locale] (серверный режим) и [[...locale]] (статика) */
export default function SitePageContent({ locale }: { locale?: string }) {
  const raw = locale ?? "ru";
  const loc: Locale = (allLocales as readonly string[]).includes(raw) ? (raw as Locale) : "ru";
  const strings = getDictionary(loc);

  return (
    <>
      <Hero strings={strings} locale={loc} />
      <About strings={strings} />
      <Services strings={strings} />
      <Equipment strings={strings} />
      <Advantages strings={strings} />
      <Portfolio strings={strings} />
      <Process strings={strings} />
      {/* Секция заявки — ключевой элемент: форма + контакты/карта */}
      <LeadForm strings={strings} locale={loc} />
      <Contacts strings={strings} locale={loc} />
    </>
  );
}
