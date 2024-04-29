
import Recommendations from '@/components/recommendations/recommend';
import MainLayout from '../mainLayout'
import { auth } from '@/lib/auth'
export default async function Liked() {
    const session = await auth();
  return (
    <MainLayout>
    <div className="container">
    <Recommendations session = {session}/>
    </div>
    </MainLayout>
  )
}
