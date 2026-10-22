import type { Locale } from "@/lib/i18n/config";
import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

export default function Hero({ strings, locale }: { strings: SiteStrings; locale: Locale }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-graphite-950 text-white"
    >
      {/* TODO: заменить на реальное фото производства (/public/images/hero-workshop.jpg) */}
      <div
        role="img"
        aria-label={locale === "ru" ? "Фотография цеха металлообработки" : "Metalworking shop floor photo"}
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,175,55,0.14),transparent_55%),linear-gradient(160deg,#2b2b2b_0%,#141414_70%)]"
      />
      <div className="diagonal-hatch absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      {/* Декоративная золотая линия снизу */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />

      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 md:pt-36 lg:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-gold-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            <span className="size-1.5 animate-pulse rounded-full bg-gold-400" aria-hidden="true" />
            {strings.hero.badge}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1
            id="hero-title"
            className="mt-6 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {strings.hero.title.split("—")[0]}
            {strings.hero.title.includes("—") && (
              <>
                —{" "}
                <span className="gold-gradient-text">
                  {strings.hero.title.split("—").slice(1).join("—").trim()}
                </span>
              </>
            )}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {strings.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`/${locale}#lead-form`}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-4 text-base font-bold text-graphite-950 shadow-xl shadow-gold-600/25 transition-all hover:shadow-2xl hover:shadow-gold-600/40 hover:brightness-105 active:scale-[0.98]"
            >
              {strings.hero.ctaPrimary}
              <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`/${locale}#services`}
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              {strings.hero.ctaSecondary}
            </a>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
            <CheckIcon className="size-4 text-gold-400" />
            {strings.hero.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
