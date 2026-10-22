// Серверный режим: "/" → "/ru". В статической сборке файл игнорируется
// (pageExtensions=["deploy.tsx"]), а "/" отдаёт index.html из catch-all-страницы.
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect("/ru");
}
