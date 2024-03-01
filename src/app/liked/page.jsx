import LikedSongs from '@/components/likedSongs/likedSongs'
import MainLayout from '../mainLayout'
import { auth } from '@/lib/auth'
export default async function Liked() {
    const session = await auth()
  return (
    <MainLayout>
    <LikedSongs session = {session}/>
    </MainLayout>
  )
}
