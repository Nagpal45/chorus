import Sidebar from "@/components/sidebar/sidebar";
import PlaySection from "@/components/playSection/playSection";
import { auth } from "@/lib/auth";
import { GlobalSongProvider } from "./globalSongContext";
import { GestureControl } from "@/components/gestureControl/gestureControl";

export default async function MainLayout({children}) {
  const session = await auth();
  return (
    <GlobalSongProvider>
    <div className="main">
      <div className="mainContainer">
      <Sidebar session={session}/>
      {children}
      <GestureControl/>
      </div>
      <div className="playContainer">
        <PlaySection session={session}/>
      </div>
      </div>
    </GlobalSongProvider>
  )
}
