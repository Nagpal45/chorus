import HomeContent from "@/components/home/home";
import { auth } from "@/lib/auth";
import MainLayout from "./mainLayout";
import { redirect } from "next/navigation";

export default async function Home(){
  const session = await auth();
  if(!session){
    redirect('/login')
  }
  return (
    <MainLayout>
    <div className="container">
      <HomeContent session={session}/>
    </div>
    </MainLayout>
  )
}