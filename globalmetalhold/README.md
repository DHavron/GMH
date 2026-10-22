# ГлобалМеталлХолд — сайт-визитка (B2B, металлообработка)

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. Одностраничный адаптивный сайт RU/EN.

## Запуск
```bash
npm install
cp .env.example .env   # указать BITRIX24_WEBHOOK_URL
npm run dev            # http://localhost:3000 → редирект на /ru
npm run build && npm start
```

## Структура
- app/page.tsx — редирект / → /ru
- app/[locale]/layout.tsx — <html lang>, мета/OG/hreflang, JSON-LD Organization, Header/Footer
- app/[locale]/page.tsx — секции: Hero, About, Services, Equipment, Advantages, Portfolio, Process, LeadForm, Contacts
- app/[locale]/api/lead/route.ts — серверная валидация + отправка лида в Битрикс24
- lib/bitrix.ts — crm.lead.add + прикрепление чертежа к лиду
- lib/i18n/{config,ru,en,index}.ts — словари RU/EN (контракт SiteStrings)
- lib/site.ts — контакты/адрес (Логойск) и лимиты загрузки (.pdf/.dwg/.dxf/.zip/.rar, 20 МБ)

## TODO перед боем
Реальные фото/og-cover.jpg, телефон/email/адрес/УНП, домен SITE.url, BITRIX24_WEBHOOK_URL.
SEO-роуты (sitemap.xml/robots.txt) намеренно не подключены — режим «сайт-визитка».
