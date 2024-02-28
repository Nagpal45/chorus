import {handleSpotifyLogin, handleSpotifyLogout} from '@/lib/actions'
import { auth } from '@/lib/auth'

export default async function Login(){
    const session = await auth();
    return(
        <div>
        <form action={handleSpotifyLogin}>
            <button>Login with Spotify</button>
        </form>
        {session?.user && <form action={handleSpotifyLogout}>
        <button>Logout</button>
        </form>}
        </div>
    )
}