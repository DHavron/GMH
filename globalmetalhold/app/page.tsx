import { redirect } from "next/navigation";

// Корень → основная локаль (RU)
export default function Root() {
  redirect("/ru");
}
