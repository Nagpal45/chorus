import {handleSpotifyLogin} from '@/lib/actions'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import styles from './login.module.css'
import Image from 'next/image';

export default async function Login(){
    const session = await auth();
    if(session){
        redirect('/')
    }
    return(
        <div className="main">

        <div className={styles.login}>
        <div className={styles.homeButton}>
          <Image width="30" height="30" src="/audio-waves.png" alt="" />
          <p>Chorus</p>
        </div>
        <div className={styles.right}>
        <div className={styles.rightContainer}>
        <p>Join Us</p>
        <form action={handleSpotifyLogin} className={styles.loginButton}>
            <button>Login with Spotify</button>
        </form>
        <form className={styles.register}>
            <input type="text" placeholder='name'/>
            <input type="text" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <button>Register</button>
        </form>
        </div>
        </div>
        <div className={styles.left}>
            <Image src='/banner.jpg' width={1000} height={1000} alt=''/>
        </div>
        
        </div>
        </div>
    )
}