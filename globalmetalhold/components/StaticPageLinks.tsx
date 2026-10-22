"use client";
// В статической деплой-сборке (out/index.html + ru.html + en.html) ссылки вида
// "/ru", "/en" не резолвятся браузером — нужен явный ".html". Этот компонент
// в рантайме переписывает внутренние ссылки на *.html (кроме корня "/").
// На серверном хостинге (Next.js) компонент не рендерится и ничего не меняет.
import { useEffect } from "react";

export default function StaticPageLinks({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const fix = () => {
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href") ?? "";
        const m = href.match(/^\/(ru|en)(\/|#|$)/);
        if (!m) return;
        const lang = m[1];
        const rest = href.slice(3); // "", "/", "#anchor..."
        const hash = rest.startsWith("#") ? rest : "";
        a.setAttribute("href", `/${lang}.html${hash}`);
      });
    };
    fix();
    // Страховка на случай ссылок, добавленных после монтирования
    const mo = new MutationObserver(fix);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [enabled]);
  return null;
}
