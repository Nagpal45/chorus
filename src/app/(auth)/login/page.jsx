import {handleGithubLogin, handleGithubLogout} from '@/lib/actions'
import { auth } from '@/lib/auth'

export default async function Login(){
    const session = await auth();
    return(
        <div>
        <form action={handleGithubLogin}>
            <button>Login with Spotify</button>
        </form>
        {session?.user && <form action={handleGithubLogout}>
        <button>Logout</button>
        </form>}
        </div>
    )
}