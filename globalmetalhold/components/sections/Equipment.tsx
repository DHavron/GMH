import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/icons";

export default function Equipment({ strings }: { strings: SiteStrings }) {
  return (
    <section id="equipment" aria-labelledby="equipment-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
            {strings.nav.equipment}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="equipment-title"
            className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-graphite-900 sm:text-4xl"
          >
            {strings.equipment.heading}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 max-w-2xl text-base text-graphite-600">{strings.equipment.subheading}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {strings.equipment.groups.map((group, i) => (
            <Reveal key={group.name} delay={(i % 3) * 120}>
              <div className="hairline-top h-full rounded-xl border border-graphite-900/10 bg-gradient-to-b from-graphite-900 to-graphite-950 p-7 shadow-lg">
                <h3 className="flex items-center gap-3 text-base font-bold uppercase tracking-wide text-gold-400">
                  <span className="size-2 rotate-45 bg-gold-500" aria-hidden="true" />
                  {group.name}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* TODO-плашка с примечанием для разработчика/контент-менеджера */}
          <Reveal delay={240}>
            <aside className="flex h-full items-start gap-3 rounded-xl border border-dashed border-gold-600/50 bg-gold-400/5 p-7 text-sm text-graphite-600">
              <span aria-hidden="true" className="mt-0.5 text-gold-600">⚙</span>
              <p>{strings.equipment.note}</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
