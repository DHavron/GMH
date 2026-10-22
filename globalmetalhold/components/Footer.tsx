import type { Locale } from "@/lib/i18n/config";
import type { SiteStrings } from "@/lib/i18n/en";
import { SITE } from "@/lib/site";
import { LogoIcon, PhoneIcon, MailIcon, PinIcon } from "@/components/ui/icons";

const SECTIONS = [
  { key: "about", anchor: "#about" },
  { key: "services", anchor: "#services" },
  { key: "equipment", anchor: "#equipment" },
  { key: "advantages", anchor: "#advantages" },
  { key: "portfolio", anchor: "#portfolio" },
  { key: "process", anchor: "#process" },
  { key: "contact", anchor: "#contacts" },
] as const;

export default function Footer({ strings, locale }: { strings: SiteStrings; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-top bg-graphite-950 text-white" aria-label={strings.footer.contactsTitle}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-graphite-800 to-graphite-950 text-gold-400 ring-1 ring-gold-600/40">
                <LogoIcon className="size-6" />
              </span>
              <span className="text-sm font-extrabold uppercase tracking-tight">
                Глобал<span className="gold-gradient-text">МеталлХолд</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{strings.footer.about}</p>
          </div>

          {/* Разделы */}
          <nav aria-label={strings.footer.sectionsTitle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
              {strings.footer.sectionsTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <a
                    href={`/${locale}${s.anchor}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold-400"
                  >
                    {strings.nav[s.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакты */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
              {strings.footer.contactsTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                {strings.contacts.address}
              </li>
              <li className="flex gap-2.5">
                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <a href={`tel:${SITE.phone}`} className="hover:text-gold-400">
                  {strings.nav.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MailIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <a href={`mailto:${strings.contacts.email}`} className="hover:text-gold-400">
                  {strings.contacts.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Реквизиты + язык */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
              {strings.footer.requisitesTitle}
            </h2>
            {/* TODO: разместить полные реквизиты: УНП, адрес, банк, расчётный счёт */}
            <p className="mt-4 text-sm leading-relaxed text-white/55">{strings.footer.requisites}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/40">
              {locale === "ru" ? "Язык версии" : "Language"}:{" "}
              <a href="/ru" className="text-gold-400 hover:underline" lang="ru">Русский</a>
              {" / "}
              <a href="/en" className="text-gold-400 hover:underline" lang="en">English</a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. {strings.footer.rights}
          </p>
          <p>{strings.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
