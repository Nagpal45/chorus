"use client";
import Image from "next/image";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { handleSpotifyLogout } from "@/lib/actions";
import { useGlobalSong } from "@/app/globalSongContext";

export default function HomeContent({ session }) {
  const [liked, setLiked] = useState([]);
  const [recents, setRecents] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [dropdown, setDropdown] = useState();

  const{setGlobalSongID, setGlobalIndex, setGlobalSongs, globalIndex} = useGlobalSong();

  const handleDropdown = () =>{
    setDropdown(!dropdown);
  } 

  const handleLike = async (index) => {
    try {
      const trackId = recommend[index]?.id;
      if (!trackId) return;
  
      const isLiked = liked[index];
      const method = isLiked ? 'DELETE' : 'PUT';
  
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        const updatedLikedItems = [...liked];
        updatedLikedItems[index] = !isLiked;
        setLiked(updatedLikedItems);
      } else {
        console.error('Failed to like/unlike the track');
      }
    } catch (error) {
      console.error('Error occurred while liking/unliking the track:', error);
    }
  };
  const handlePlaying = (index, trackId) => {
    setGlobalSongID(trackId);
    setGlobalSongs(recommend);
    setGlobalIndex(index);
  };

  useEffect(() => {
    const fetchRecently = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setRecents(data.items);
    };
    fetchRecently();
  }, [session]);

  useEffect(()=>{
    const fetchRecommend = async () => {
      const seed_artists = recents[0]?.track?.artists[0]?.id
      const seed_tracks = recents[0]?.track?.id
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setRecommend(data.tracks);
    };
    fetchRecommend();
  },[session,recents])

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
        <div className={styles.accountInfo} onClick={handleDropdown}>
          <Image src={session?.user?.image} width="40" height="40" alt="" />
          <p>Hello, {session?.user?.name}</p>
        </div>
        {dropdown && (<div className={styles.dropdown}>
          <form action={handleSpotifyLogout}>
        <button>Logout</button>
        </form>
        </div>)}
      </div>
      <div className={styles.center}>
        <div className={styles.mainImg}>
          <p>Recommended for You</p>
          {recommend?.length > 0 && (
            <Image
              src={recommend[0]?.album?.images[0]?.url}
              width={280}
              height={260}
              alt=""
            />
          )}
        </div>
        <div className={styles.songsList}>
          {recommend?.slice(0, 5).map((item, index) => (
            <div className={styles.songsListItem} key={item.id}>
              {globalIndex === index ? (
                <Image src="/sound-waves.png" height={25} width={25} alt="" />
              ) : (
                <p className={styles.songNum}>{index + 1}</p>
              )}
              {liked[index] ? (
                <Image
                  src="heart-fill.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                />
              ) : (
                <Image
                  src="heart-outline.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                />
              )}
              <div className={styles.song} onClick={() => handlePlaying(index, item.id)}>
                <p>{item?.name}</p>
                <p>
                  {item?.artists.length > 1
                    ? `${item?.artists[0]?.name}, ${item?.artists[1]?.name}`
                    : item?.artists[0]?.name}
                </p>
              </div>
              <Image src="three-dots.svg" width={15} height={15} alt="" />
              <p className={styles.time}>3:05</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Recently Played</p>
        <div className={styles.recently}>
          {recents?.slice(0, 6).map((item) => (
            <div className={styles.recentItem} key={item.id}>
              <Image
                src={item?.track?.album?.images[0]?.url}
                alt=""
                height={135}
                width={135}
              />
              <div className={styles.recent}>
                <p>{item?.track?.name.slice(0,20)}</p>
                <p>
                  {item?.track?.artists.length > 1
                    ? `${item?.track?.artists[0]?.name}, ${item?.track?.artists[1]?.name}`.slice(0,23)
                    : item?.track?.artists[0]?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
