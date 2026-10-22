// Точка входа layout для СТАТИЧЕСКОЙ деплой-сборки (файл *.deploy.tsx).
// App Router не позволяет layout иметь dynamic params при output:"export",
// поэтому локаль определяется по пути запроса и инжектируется в layout
// через клонирование элемента. Серверный режим использует app/layout.tsx напрямую.
import type { ReactNode } from "react";
import { headers } from "next/headers";
import RootLayout from "./layout";

export default async function SiteRoot({ children }: { children: ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-invoke-path") ?? h.get("next-url") ?? "/";
  return <>{cloneWith(rootLayoutProps(children, pathname))}</>;
}

// helper убран ниже
function rootLayoutProps(children: ReactNode, pathname: string) {
  return { children, pathname };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module "react" {}
