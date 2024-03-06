import { getUserId } from "@/lib/actions";
import MainLayout from "../mainLayout";
import CreatePlaylist from "@/components/createPlaylist/createPlaylist";
import { auth } from "@/lib/auth";

const userId = getUserId();

export default async function NewPlaylist() {
  const session = await auth();
  return (
    <MainLayout>
    <div className="container">
      <CreatePlaylist session={session} userId={userId}/>
    </div>
    </MainLayout>
  )
}
