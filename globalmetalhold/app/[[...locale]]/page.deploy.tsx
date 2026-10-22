// Деплой-точка входа для статического экспорта (активна только при DEPLOY_BUILD=1,
// см. next.config.ts: pageExtensions=["deploy.tsx"]). Даёт "/" -> index.html,
// "/ru" -> ru.html, "/en" -> en.html (плоские файлы для файлового хостинга).
import SitePageContent from "@/lib/site-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: [] }, { locale: ["ru"] }, { locale: ["en"] }];
}

export default function DeployPage({
  params,
}: {
  params?: { locale?: string[] };
}) {
  const raw = (params?.locale ?? []).join("/"); // "" | "ru" | "en"
  return <SitePageContent locale={raw === "en" ? "en" : "ru"} />;
}
