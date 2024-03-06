
import MainLayout from "@/app/mainLayout";
import PlaylistPage from "@/components/playlistPage/playlistPage";
PlaylistPage
import { getUserId } from "@/lib/actions";

import { auth } from "@/lib/auth";


export default async function NewPlaylist() {
  const session = await auth();
  return (
    <MainLayout>
    <div className="container">
      <PlaylistPage session={session}/>
    </div>
    </MainLayout>
  )
}
