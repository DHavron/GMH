import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";
import {
  LatheIcon,
  MillingIcon,
  LaserIcon,
  WeldingIcon,
  StructureIcon,
  CoatingIcon,
} from "@/components/ui/icons";

const ICONS = [LatheIcon, MillingIcon, LaserIcon, WeldingIcon, StructureIcon, CoatingIcon];

export default function Services({ strings }: { strings: SiteStrings }) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="diagonal-hatch bg-graphite-950 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
            {strings.nav.services}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="services-title"
            className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {strings.services.heading}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 max-w-2xl text-base text-white/60">{strings.services.subheading}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {strings.services.items.map((item, i) => {
            const Icon = ICONS[i] ?? LatheIcon;
            return (
              <Reveal as="li" key={item.title} delay={(i % 3) * 120}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-graphite-800/80 to-graphite-900 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600/50 hover:shadow-2xl hover:shadow-gold-600/10">
                  {/* Золотой уголок сверху */}
                  <span
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="grid size-14 place-items-center rounded-lg bg-gold-600/10 text-gold-400 ring-1 ring-gold-600/30 transition-colors group-hover:bg-gold-500 group-hover:text-graphite-950">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
