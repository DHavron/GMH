// Серверный режим: корневой маршрут "/" → редирект на "/ru".
// В статической деплой-сборке файл игнорируется (pageExtensions=["deploy.tsx"]),
// а "/" отдаёт index.html из catch-all-страницы app/[[...locale]].
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect("/ru");
}
