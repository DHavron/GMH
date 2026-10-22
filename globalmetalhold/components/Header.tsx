"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { SiteStrings } from "@/lib/i18n/en";
import { LogoIcon, PhoneIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";

interface HeaderProps {
  locale: Locale;
  otherLocalePath: string; // путь для переключения языка ('/ru' | '/en')
  strings: SiteStrings;
  phoneHref: string;
}

const NAV_SECTIONS = [
  { key: "about", anchor: "#about" },
  { key: "services", anchor: "#services" },
  { key: "equipment", anchor: "#equipment" },
  { key: "advantages", anchor: "#advantages" },
  { key: "portfolio", anchor: "#portfolio" },
  { key: "process", anchor: "#process" },
  { key: "contact", anchor: "#contacts" },
] as const;

export default function Header({ locale, otherLocalePath, strings, phoneHref }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрываем мобильное меню при навигации
  useEffect(() => setMenuOpen(false), [pathname]);

  // Блокировка прокрутки body при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const nav = (
    <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0.5">
      {NAV_SECTIONS.map((s) => (
        <li key={s.key}>
          <a
            href={`/${locale}${s.anchor}`}
            className="block rounded-md px-3 py-2.5 text-sm font-medium text-graphite-800 transition-colors hover:bg-gold-400/10 hover:text-graphite-900 lg:py-2 lg:text-[13px]"
          >
            {strings.nav[s.key]}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-lg shadow-black/5 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      } border-b border-graphite-900/5`}
    >
      {/* Skip-link для доступности */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-graphite-900 focus:px-4 focus:py-2 focus:text-gold-400"
      >
        Перейти к содержимому / Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px] lg:px-8">
        {/* Логотип (placeholder — TODO: заменить на реальное изображение логотипа) */}
        <Link
          href={`/${locale}`}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${strings.meta.title} — на главную`}
        >
          <span className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-graphite-800 to-graphite-950 text-gold-400 shadow-inner ring-1 ring-gold-600/40 transition-transform group-hover:scale-105">
            <LogoIcon className="size-6" />
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold uppercase tracking-tight text-graphite-900 sm:text-base">
              Глобал<span className="gold-gradient-text">МеталлХолд</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-graphite-400 sm:block">
              Metalworking · Logoysk
            </span>
          </span>
        </Link>

        {/* Десктопная навигация */}
        <nav aria-label={strings.nav.services} className="hidden xl:block">
          {nav}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Переключатель RU/EN */}
          <div
            className="flex items-center rounded-md border border-graphite-900/15 p-0.5 text-xs font-bold"
            role="group"
            aria-label="Language switcher"
          >
            <Link
              href={`/${locale}`}
              aria-current={locale === "ru" ? "page" : undefined}
              className={`rounded px-2 py-1 transition-colors ${
                locale === "ru"
                  ? "bg-graphite-900 text-gold-400"
                  : "text-graphite-600 hover:text-graphite-900"
              }`}
              lang="ru"
            >
              RU
            </Link>
            <Link
              href={otherLocalePath}
              aria-current={locale === "en" ? "page" : undefined}
              className={`rounded px-2 py-1 transition-colors ${
                locale === "en"
                  ? "bg-graphite-900 text-gold-400"
                  : "text-graphite-600 hover:text-graphite-900"
              }`}
              lang="en"
            >
              EN
            </Link>
          </div>

          {/* Телефон */}
          <a
            href={phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-graphite-800 transition-colors hover:text-gold-600 md:flex"
          >
            <PhoneIcon className="size-4 text-gold-600" />
            {strings.nav.phone}
          </a>

          {/* CTA */}
          <a
            href={`/${locale}#lead-form`}
            className="hidden rounded-md bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2.5 text-sm font-bold text-graphite-950 shadow-md shadow-gold-600/25 transition-all hover:shadow-lg hover:shadow-gold-600/40 hover:brightness-105 active:scale-[0.98] sm:block"
          >
            {strings.nav.cta}
          </a>

          {/* Бургер (мобильные) */}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-graphite-900/15 text-graphite-900 xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-graphite-900/10 bg-white px-4 pb-6 pt-2 shadow-xl xl:hidden"
        >
          <nav aria-label="Main">{nav}</nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-graphite-900/10 pt-4">
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-graphite-800"
            >
              <PhoneIcon className="size-4 text-gold-600" />
              {strings.nav.phone}
            </a>
            <a
              href={`/${locale}#lead-form`}
              className="rounded-md bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-3 text-center text-sm font-bold text-graphite-950 shadow-md"
            >
              {strings.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
