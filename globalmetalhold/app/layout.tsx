import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1e1e",
};

// Минимальный корневой layout: страницы /[locale]/* имеют собственный <html lang>.
// Этот layout нужен только для app/page.tsx (редирект на /ru).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
