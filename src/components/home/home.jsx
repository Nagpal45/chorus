"use client"
import Image from "next/image";
import styles from "./home.module.css";
import { useState } from "react";

export default function HomeContent({session}) {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  }

  const [playing, setPlaying] = useState(false);
  const handlePlaying = () =>{
    setPlaying(true);
  }

  

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div className={styles.searchBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 15.800781 33 8 27.199219 8 20 C 8 12.800781 15.800781 7 21 7 Z"></path>
          </svg>
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles.accountInfo}>
            <Image src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' width='40' height='40' alt=''/>
            <p>Hello, Alisha</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.mainImg}>
            <p>Releases for You</p>
            <Image src='https://images.pexels.com/photos/7464827/pexels-photo-7464827.jpeg?auto=compress&cs=tinysrgb&w=600' width={280} height={260} alt=""/>
        </div>
        <div className={styles.songsList}>
            <div className={styles.songsListItem}>
               {
                playing ? ( <Image src='/sound-waves.png' height={25} width={25} alt=''/>) : (<p className={styles.songNum}>1</p>)
               }
                {liked ? (<Image src='heart-fill.svg' width={15} height={15} alt='' onClick={() => handleLike()}/>) : (<Image src='heart-outline.svg' width={15} height={15} alt='' onClick={() => handleLike()}/>)}
                <div className={styles.song}onClick={() => handlePlaying()}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
                <Image src='three-dots.svg' width={15} height={15} alt=''/>
                <p className={styles.time}>3:05</p>
            </div>
            <div className={styles.songsListItem}>
                <p className={styles.songNum}>2</p>
                <Image src='heart-outline.svg' width={15} height={15} alt=''/>
                <div className={styles.song}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
                <Image src='three-dots.svg' width={15} height={15} alt=''/>
                <p className={styles.time}>3:05</p>
            </div>
            <div className={styles.songsListItem}>
                <p className={styles.songNum}>3</p>
                <Image src='heart-outline.svg' width={15} height={15} alt=''/>
                <div className={styles.song}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
                <Image src='three-dots.svg' width={15} height={15} alt=''/>
                <p className={styles.time}>3:05</p>
            </div>
            <div className={styles.songsListItem}>
                <p className={styles.songNum}>4</p>
                <Image src='heart-outline.svg' width={15} height={15} alt=''/>
                <div className={styles.song}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
                <Image src='three-dots.svg' width={15} height={15} alt=''/>
                <p className={styles.time}>3:05</p>
            </div>
            <div className={styles.songsListItem}>
                <p className={styles.songNum}>5</p>
                <Image src='heart-outline.svg' width={15} height={15} alt=''/>
                <div className={styles.song}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
                <Image src='three-dots.svg' width={15} height={15} alt=''/>
                <p className={styles.time}>3:05</p>
            </div>
        </div>
      </div>
      <div className={styles.bottom}>
      <p>Recently Played</p>
        <div className={styles.recently}>   
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
            <div className={styles.recentItem}>
                <Image src='https://images.pexels.com/photos/4200742/pexels-photo-4200742.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' height={135} width={135}/>
                <div className={styles.recent}><p>Sleep4ever</p><p> Andrew, Blackbear</p></div>
            </div>
        </div>
      </div>
    </div>
  );
}
