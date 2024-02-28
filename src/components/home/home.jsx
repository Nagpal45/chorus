"use client";
import Image from "next/image";
import styles from "./home.module.css";
import { useEffect, useState } from "react";

export default function HomeContent({ session }) {
  const [liked, setLiked] = useState([]);
  const [recents, setRecents] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const[playingIndex, setPlayingIndex] = useState();
  const handleLike = (index) => {
    const updatedLikedItems = [...liked];
    updatedLikedItems[index] = !updatedLikedItems[index];
    setLiked(updatedLikedItems);
  };

  const [playing, setPlaying] = useState(false);
  const handlePlaying = (index) => {
    setPlayingIndex(index)
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
    const fetchRecommend = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.tracks);
      setRecommend(data.tracks);
    };
    fetchRecommend();
  }, [session]);

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
          <Image src={session.user.image} width="40" height="40" alt="" />
          <p>Hello, {session.user.name}</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.mainImg}>
          <p>Releases for You</p>
          <Image
            src={recommend[0]?.album?.images[0]?.url}
            width={280}
            height={260}
            alt=""
          />
        </div>
        <div className={styles.songsList}>
          {recommend.slice(0, 5).map((item,index) => (
            <div className={styles.songsListItem} key={item.id}>
              {playingIndex === index ? (
                <Image src="/sound-waves.png" height={25} width={25} alt="" />
              ) : (
                <p className={styles.songNum}>{index+1}</p>
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
              <div className={styles.song} onClick={() => handlePlaying(index)}>
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
                <p>{item?.track?.name}</p>
                <p>
                  {item?.track?.artists.length > 1
                    ? `${item?.track?.artists[0]?.name}, ${item?.track?.artists[1]?.name}`
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
