import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";

// TODO: заменить плейсхолдерные цифры на фактические показатели предприятия
const STATS = [
  { value: "3 500", suffix: "", key: "area" },
  { value: "40+", suffix: "", key: "machines" },
  { value: "120", suffix: "", key: "tonsPerMonth" },
  { value: "90+", suffix: "", key: "clients" },
] as const;

export default function About({ strings }: { strings: SiteStrings }) {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
                {strings.nav.about}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2
                id="about-title"
                className="mt-3 text-3xl font-extrabold tracking-tight text-graphite-900 sm:text-4xl"
              >
                {strings.stats.heading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-graphite-600 sm:text-lg">
                {strings.stats.lead}
              </p>
            </Reveal>
            {/* TODO: заменить на реальное фото производства */}
            <Reveal delay={300}>
              <div
                role="img"
                aria-label="CNC machining center at work"
                className="metal-panel mt-10 grid aspect-[16/9] place-items-center rounded-xl shadow-xl ring-1 ring-graphite-900/10"
              >
                <span className="px-6 text-center text-sm font-medium uppercase tracking-widest text-gold-500/80">
                  // TODO: photo — CNC machining center
                </span>
              </div>
            </Reveal>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14">
            {STATS.map((s, i) => (
              <Reveal key={s.key} delay={i * 120}>
                <div className="hairline-top group h-full rounded-xl bg-gradient-to-b from-graphite-900 to-graphite-950 p-7 shadow-lg transition-transform hover:-translate-y-1">
                  <dt className="sr-only">{strings.stats[s.key]}</dt>
                  <dd>
                    <span className="block text-4xl font-extrabold tabular-nums gold-gradient-text sm:text-5xl">
                      {s.value}
                      {s.suffix}
                    </span>
                    <span className="mt-3 block text-sm leading-snug text-white/60">
                      {strings.stats[s.key]}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
