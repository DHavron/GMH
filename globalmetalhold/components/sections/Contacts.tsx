import type { Locale } from "@/lib/i18n/config";
import type { SiteStrings } from "@/lib/i18n/en";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "@/components/ui/icons";

export default function Contacts({ strings, locale }: { strings: SiteStrings; locale: Locale }) {
  const c = strings.contacts;
  // TODO: заменить на реальную Яндекс.Карты/Google Maps ссылку с точным адресом
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${SITE.geo.lng}%2C${SITE.geo.lat}&z=12&text=${encodeURIComponent("Логойск")}`;

  const items = [
    { icon: PinIcon, label: c.addressLabel, value: c.address },
    { icon: PhoneIcon, label: c.phoneLabel, value: strings.nav.phone, href: `tel:${SITE.phone}` },
    { icon: MailIcon, label: c.emailLabel, value: c.email, href: `mailto:${c.email}` },
    { icon: ClockIcon, label: c.hoursLabel, value: c.hours },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">{c.heading}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="contacts-title" className="mt-3 text-3xl font-extrabold tracking-tight text-graphite-900 sm:text-4xl">
            {c.heading} — {locale === "ru" ? "Логойск, Беларусь" : "Logoysk, Belarus"}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <dl className="lg:col-span-2 space-y-6">
            {items.map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div className="flex gap-4 rounded-xl border border-graphite-900/10 bg-gradient-to-b from-white to-gold-400/[0.05] p-5 shadow-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-graphite-900 text-gold-400">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-graphite-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-graphite-900">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-gold-600">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          {/* Карта — TODO: заменить iframe на актуальную карту с меткой предприятия */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="hairline-top h-full overflow-hidden rounded-xl border border-graphite-900/10 shadow-lg">
              <iframe
                title={locale === "ru" ? "Карта: г. Логойск, Беларусь" : "Map: Logoysk, Belarus"}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full sm:h-[420px]"
              />
              <p className="bg-graphite-950 px-4 py-2.5 text-[11px] italic text-white/40">{c.mapNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
