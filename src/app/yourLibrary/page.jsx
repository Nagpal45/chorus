import Library from '@/components/library/library'
import MainLayout from '../mainLayout'
import { auth } from '@/lib/auth'
export default async function yourLibrary() {
    const session = await auth();
  return (
    <MainLayout>
    <div className="container">
    <Library session = {session}/>
    </div>
    </MainLayout>
  )
}
