import type { NextConfig } from "next";

// Деплой-режим: DEPLOY_BUILD=1 → статический экспорт (out/index.html, out/ru.html, out/en.html)
// для заливки на обычный файловый/статический хостинг.
const isDeployBuild = process.env.DEPLOY_BUILD === "1";

const shared: NextConfig = {
  experimental: { agentFeedback: true },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

if (isDeployBuild) {
  // Статический экспорт: серверный API Битрикс24 в статику не входит —
  // pageExtensions исключает route.ts из маршрутизации.
  module.exports = {
    ...shared,
    output: "export",
    images: { unoptimized: true },
    pageExtensions: ["tsx.deploy", "ts.deploy"],
    trailingSlash: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } satisfies NextConfig & Record<string, any>;
} else {
  // Серверный режим: dev/production с живым API-роутом /api/lead (Битрикс24).
  module.exports = { ...shared, pageExtensions: ["tsx", "ts"] };
}
