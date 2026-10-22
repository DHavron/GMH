import type { SiteStrings } from "@/lib/i18n/en";
import Reveal from "@/components/ui/Reveal";

// Градиентные «заглушки» вместо реальных фото — TODO: заменить на next/image с реальными снимками работ
const TILES = [
  "from-graphite-700 via-graphite-800 to-graphite-950",
  "from-[#3d3218] via-graphite-800 to-graphite-950",
  "from-graphite-800 via-[#2e2a20] to-graphite-950",
  "from-[#333] via-graphite-800 to-[#191919]",
];

export default function Portfolio({ strings }: { strings: SiteStrings }) {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="bg-graphite-950 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
            {strings.nav.portfolio}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="portfolio-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {strings.portfolio.heading}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 max-w-2xl text-base text-white/60">{strings.portfolio.subheading}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strings.portfolio.items.map((caption, i) => (
            <Reveal as="li" key={caption} delay={(i % 4) * 100}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10">
                {/* TODO: заменить div на <Image src="/images/work-XX.jpg" .../> */}
                <div
                  role="img"
                  aria-label={caption}
                  className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 ${TILES[i % TILES.length]}`}
                />
                <div className="diagonal-hatch absolute inset-0 opacity-60" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-12 text-sm font-semibold leading-snug text-white">
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-8 text-xs italic text-white/40">{strings.portfolio.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
