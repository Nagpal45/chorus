"use client"
import Image from "next/image";
import styles from "./liked.module.css";
import { useEffect, useState } from "react";

export default function LikedSongs({ session }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState();
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handlePlaying = (index) => {
    setPlayingIndex(index);
  };

  const handleDropdown = (index) => {
    setSelectedTrack(index === selectedTrack ? null : index);
  };

  const handleRemove = async (trackId) => {
    setSelectedTrack(null);
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (response.ok) {
      const updatedLikedSongs = likedSongs.filter((item) => item.track.id !== trackId);
      setLikedSongs(updatedLikedSongs);
    } else {
      console.error("Failed to remove track from liked songs.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLikedSongs(data.items);
        } else {
          console.error("Failed to fetch liked songs.");
        }
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className={styles.likedContainer}>
      <div className={styles.headSection}>
        <Image src="heart-fill.svg" width={30} height={30} alt=''/>
        <p className={styles.heading}>Liked Songs</p>
      </div>
      <div className={styles.likedSongs}>
        <div className={styles.likedSongHead}>
          <p className={styles.num}>#</p>
          <div className={styles.song}>
            <p>Track</p>
          </div>
          <p className={styles.album}>Album</p>
          <p className={styles.date}>Date Added</p>
          <p>Duration</p>
        </div>
        <div className={styles.sepLine}></div>
        {likedSongs?.map((item, index) => (
          <div key={item.id} className={styles.likedSongItem}>
            {playingIndex === index ? (
              <Image className={styles.num} src="/sound-waves.png" height={25} width={25} alt="" />
            ) : (
              <p className={styles.num}>{index + 1}</p>
            )}
            <div className={styles.song} onClick={() => handlePlaying(index)}>
              <Image className={styles.songImg} src={item?.track?.album?.images[0]?.url} alt='' width={50} height={50}/>
              <div className={styles.songDesc}>
                <p>{item?.track?.name}</p>
                <p>
                  {item?.track?.artists.length > 1
                    ? `${item?.track?.artists[0]?.name}, ${item?.track?.artists[1]?.name}`
                    : item?.track?.artists[0]?.name}
                </p>
              </div>
            </div>
            <p className={styles.album}>{item?.track?.album?.name}</p>
            <p className={styles.date}>{item?.added_at.slice(0, 10)}</p>
            <p className={styles.duration}>
              {item?.track?.duration_ms &&
                `${Math.floor(item.track.duration_ms / 60000)}:${(
                  (item.track.duration_ms % 60000) /
                  1000
                )
                  .toFixed(0)
                  .padStart(2, "0")}`}
            </p>
            <Image className={styles.dots} src="three-dots.svg" width={15} height={15} alt="" onClick={() => handleDropdown(index)} />
            {selectedTrack === index && (
              <div className={styles.dropdown}>
                <div onClick={() => handleRemove(item.track.id)}>Remove from Liked Songs</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
