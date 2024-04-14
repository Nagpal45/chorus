import LoginRegister from "@/components/loginRegister/loginRegister";
import { auth } from "@/lib/auth";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return(
    <LoginRegister />
  )
}