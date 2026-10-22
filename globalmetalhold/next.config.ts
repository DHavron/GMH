import type { NextConfig } from "next";

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
  // Статический экспорт для файлового хостинга: out/index.html + ru.html + en.html.
  // pageExtensions включает *.deploy.tsx (catch-all страница) и исключает
  // app/api/**/route.ts (серверный API Битрикс24 не может быть в статике).
  module.exports = {
    ...shared,
    output: "export",
    images: { unoptimized: true },
    pageExtensions: ["tsx", "ts"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } satisfies NextConfig & Record<string, any>;
} else {
  // Серверный режим: dev/production с API-роутом /api/lead (Битрикс24).
  // Файлы *.deploy.* игнорируются маршрутизацией.
  module.exports = { ...shared, pageExtensions: ["tsx", "ts"] };
}
