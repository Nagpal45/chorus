import {handleSpotifyLogin} from '@/lib/actions'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
// import styles from './login.module.css'

export default async function Login(){
    const session = await auth();
    if(session){
        redirect('/')
    }
    return(
        <div>
        <form action={handleSpotifyLogin}>
            <button>Login with Spotify</button>
        </form>
        </div>
    )
}