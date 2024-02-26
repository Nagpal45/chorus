import HomeContent from "@/components/home/home";
import { auth } from "@/lib/auth";

export default async function Home(){
  const session = await auth();
  return (
    <div className="container">
      <HomeContent session={session}/>
    </div>
  )
}