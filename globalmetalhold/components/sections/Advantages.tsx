import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";
import {
  TargetIcon,
  ClockIcon,
  AwardIcon,
  DocumentIcon,
  BlueprintIcon,
  TruckIcon,
} from "@/components/ui/icons";

const ICONS = [TargetIcon, ClockIcon, AwardIcon, DocumentIcon, BlueprintIcon, TruckIcon];

export default function Advantages({ strings }: { strings: SiteStrings }) {
  return (
    <section
      id="advantages"
      aria-labelledby="advantages-title"
      className="bg-gradient-to-b from-white via-gold-400/[0.04] to-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
            {strings.nav.advantages}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="advantages-title"
            className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-graphite-900 sm:text-4xl"
          >
            {strings.advantages.heading}
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {strings.advantages.items.map((item, i) => {
            const Icon = ICONS[i] ?? TargetIcon;
            return (
              <Reveal as="li" key={item.title} delay={(i % 3) * 120}>
                <div className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-graphite-900 text-gold-400 shadow-md ring-1 ring-gold-600/30">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-graphite-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-600">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
