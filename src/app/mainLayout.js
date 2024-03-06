import Sidebar from "@/components/sidebar/sidebar";
import PlaySection from "@/components/playSection/playSection";
import GestureControl from "@/components/gestureControl/gestureControl";
import { auth } from "@/lib/auth";

export default async function MainLayout({children}) {
  const session = await auth();
  return (
    <div className="main">
      <div className="mainContainer">
      <Sidebar session={session}/>
      {children}
      <GestureControl/>
      </div>
      <div className="playContainer">
        <PlaySection src={"/sample.mp3"}/>
      </div>
      </div>
  )
}
