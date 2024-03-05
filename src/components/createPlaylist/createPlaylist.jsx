"use client"
import Image from "next/image";
import styles from './createPlaylist.module.css'
import { useState } from "react";

export default function CreatePlaylist({session, userId}) {
  const [input, setInput] = useState(false);

  const handlePlaylistName = () =>{
    setInput(true);
  }

  return (
    <div className={styles.createPlaylist}>
      <div className={styles.top}>
        <Image src='/newPlaylist.svg' width={50} height={50} alt='' on/>
        <div className={styles.topText}>
        {
          input ? (
            <input type="text" /> 
          ): (<h1 onClick={handlePlaylistName}>New playlist</h1>)
        }
        <div className={styles.userInfo}>
        <Image src={session?.user?.image} width={35} height={35} alt=''/>
        <p>{session?.user?.name}</p>
        </div>
        </div>
      </div>
      <div className={styles.bottom}>
        
      </div>

    </div>
  )
}
