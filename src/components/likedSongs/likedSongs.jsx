"use client"
import Image from "next/image";
import styles from "./liked.module.css";
import { useEffect, useState } from "react";
import { useGlobalSong } from "@/app/globalSongContext";

export default function LikedSongs({ session }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [showMenu, setShowMenu] = useState(false)

  const { setGlobalSongID, setGlobalSongs, setGlobalIndex, globalIndex} = useGlobalSong();

  const handlePlaying = (index, trackId) => {
    setGlobalSongID(trackId);
    setGlobalSongs(likedSongs);
    setGlobalIndex(index);
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

  const handleAddToPlaylist = async (playlistId, trackId) => {
    setSelectedTrack(null);
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`],
      }),
    });

    if (response.ok) {
      console.log("Track added to playlist successfully.");
    } else {
      console.error("Failed to add track to playlist.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserPlaylists(data.items);
        } else {
          console.error("Failed to fetch user playlists.");
        }
      } catch (error) {
        console.error("Error fetching user playlists:", error);
      }
    };

    fetchData();
  }, [session]);

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
            {globalIndex === index ? (
              <Image className={styles.num} src="/equaliser.gif" height={20} width={15} style={{opacity:"0.9"}} alt=""/>
            ) : (
              <p className={styles.num}>{index + 1}</p>
            )}
            <div className={styles.song} onClick={() => handlePlaying(index,item.track.id)}>
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
              <>
              <div className={styles.dropdown1}>
                <div onClick={() => handleRemove(item.track.id)}>Remove from Liked Songs</div>
              </div>
              <div className={styles.dropdown2}>
                <div onClick={() => setShowMenu(true)}>Add to Playlist</div>
              </div>
                {showMenu && (
                  <div className={styles.menu}>
                  {userPlaylists.map((playlist) => (
                    <div key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id, item.track.id)}>
                      {playlist.name}
                    </div>
                  ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
