import { redirect } from "next/navigation";

export default function DefaultPage() {
  redirect("/homepage/home");
}
