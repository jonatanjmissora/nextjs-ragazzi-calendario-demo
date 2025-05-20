import { redirect } from "next/navigation";
import getUserFromCookie from "../_lib/utils/getUserFromCookies";
import LoginForm from "../_components/Auth/LoginForm";

export default async function Home() {

  const user = await getUserFromCookie()
  if (user) redirect("/pendientes")

  return (
    <section className="h-[95dvh] flex justify-center items-center relative bg-blue-400">

      <LoginForm />

    </section>
  );
}
