import Sidebar from "@/components/sidebar/sidebar";
import PlaySection from "@/components/playSection/playSection";
import FriendSection from "@/components/friendSection/friendSection";
import { auth } from "@/lib/auth";

export default async function MainLayout({children}) {
  const session = await auth();
  return (
    <div className="main">
      <div className="mainContainer">
      <Sidebar session={session}/>
      {children}
      <FriendSection/>
      </div>
      <div className="playContainer">
        <PlaySection/>
      </div>
      </div>
  )
}
