import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { allLocales, defaultLocale, getDictionary, isLocale, otherLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "cyrillic"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1e1e",
};

// В деплой-сборке layout применяется и к корню (""), где locale отсутствует.
type LayoutContext = { params?: Promise<{ locale?: string }> };

/** Метаданные страницы (title/description/OG/hreflang) из словаря локали */
export async function generateMetadata({ params }: LayoutContext): Promise<Metadata> {
  const p1 = await params; const raw: string = (p1 && p1.locale) || "ru";
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const strings = getDictionary(locale);
  const url = `${SITE.url}/${locale}`;

  return {
    metadataBase: new URL(SITE.url),
    title: strings.meta.title,
    description: strings.meta.description,
    alternates: {
      canonical: `/${locale}`,
      // hreflang для RU/EN + x-default → основная локаль
      languages: {
        ru: "/ru",
        en: "/en",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url,
      siteName: SITE.name,
      title: strings.meta.ogTitle,
      description: strings.meta.ogDescription,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }], // TODO: реальное OG-изображение /public/og-cover.jpg
    },
    twitter: {
      card: "summary_large_image",
      title: strings.meta.ogTitle,
      description: strings.meta.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

/** Микроразметка Organization (schema.org) */
function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ru" ? SITE.name : SITE.nameEn,
    alternateName: SITE.shortName,
    url: `${SITE.url}/${locale}`,
    logo: `${SITE.url}/logo.svg`, // TODO: реальный логотип в /public
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.country,
      streetAddress: SITE.address, // TODO: точный адрес
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: ["BY", "International"],
    knowsAbout: [
      "metalworking",
      "CNC turning",
      "CNC milling",
      "laser cutting",
      "welding",
      "metal structures",
      "powder coating",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  const p1 = await params; const raw: string = (p1 && p1.locale) || "ru";
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const strings = getDictionary(locale);
  const other = otherLocale(locale);

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-graphite-900">
        {/* Доступность: ссылка «к основному содержимому» */}
        <a
          href="#main"
          className="sr-only rounded-md bg-gold-400 px-4 py-2 font-semibold text-graphite-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          {locale === "ru" ? "К основному содержимому" : "Skip to main content"}
        </a>

        <Header
          locale={locale}
          otherLocalePath={`/${other}`}
          strings={strings}
          phoneHref={`tel:${SITE.phone}`}
        />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer strings={strings} locale={locale} />
        <OrganizationJsonLd locale={locale} />
      </body>
    </html>
  );
}
