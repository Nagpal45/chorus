import HomeContent from "@/components/home/home";
import { auth } from "@/lib/auth";
import MainLayout from "./mainLayout";

export default async function Home(){
  const session = await auth();
  return (
    <MainLayout>
    <div className="container">
      <HomeContent session={session}/>
    </div>
    </MainLayout>
  )
}