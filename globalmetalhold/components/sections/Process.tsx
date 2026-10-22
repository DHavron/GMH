import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";

export default function Process({ strings }: { strings: SiteStrings }) {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
            {strings.nav.process}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="process-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-graphite-900 sm:text-4xl"
          >
            {strings.process.heading}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 max-w-2xl text-base text-graphite-600">{strings.process.subheading}</p>
        </Reveal>

        <ol className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Соединительная линия (десктоп) */}
          <span
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-gold-600/20 via-gold-500 to-gold-600/20 lg:block"
            aria-hidden="true"
          />
          {strings.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 150} className="relative list-none">
              <div className="flex flex-col items-start">
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-lg font-extrabold text-graphite-950 shadow-lg shadow-gold-600/30 ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-bold text-graphite-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
