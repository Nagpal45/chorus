"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../likedSongs/liked.module.css'
import { useGlobalSong } from '@/app/globalSongContext';

export default function Searches({searchResults, session}) {
    const { setGlobalSongID, setGlobalSongs, setGlobalIndex, globalIndex} = useGlobalSong();
    const [selectedTrack, setSelectedTrack] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [showMenu, setShowMenu] = useState(false)
  const [liked, setLiked] = useState([]);

  const handleLike = async (index) => {
    try {
      const trackId = searchResults[index]?.id;
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
        setGlobalSongs(searchResults);
        setGlobalIndex(index);
      };
    
      const handleDropdown = (index) => {
        setSelectedTrack(index === selectedTrack ? null : index);
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

  return (
    <div className={styles.searches}>
          {searchResults?.map((track, index) => (
            <div key={track.id} className={styles.likedSongItem}>
            {globalIndex === index ? (
              <Image className={styles.num} src="/equaliser.gif" height={20} width={27} style={{opacity:"0.9"}} alt=""/>
            ) : (
              <p className={styles.num}>{index + 1}</p>
            )}
            {liked[index] ? (
                <Image
                  src="heart-fill.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                  className={styles.likeImage}
                />
              ) : (
                <Image
                  src="heart-outline.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                  className={styles.likeImage}
                />
              )}
            <div className={styles.song} onClick={() => handlePlaying(index, track.id)}>
              <Image className={styles.songImg} src={track?.album?.images[0]?.url} alt='' width={50} height={50}/>
              <div className={styles.songDesc}>
                <p>{track?.name}</p>
                <p>
                  {track?.artists.length > 1
                    ? `${track?.artists[0]?.name}, ${track?.artists[1]?.name}`
                    : track?.artists[0]?.name}
                </p>
              </div>
            </div>
            <p className={styles.album}>{track?.album?.name}</p>
            <p className={styles.duration}>
              {track?.duration_ms &&
                `${Math.floor(track.duration_ms / 60000)}:${(
                  (track.duration_ms % 60000) /
                  1000
                )
                  .toFixed(0)
                  .padStart(2, "0")}`}
            </p>
            <Image className={styles.dots} src="three-dots.svg" width={15} height={15} alt="" onClick={() => handleDropdown(index)} />
            {selectedTrack === index && (
              <>
              <div className={styles.dropdown2}>
                <div onClick={() => setShowMenu(true)}>Add to Playlist</div>
              </div>
                {showMenu && (
                  <div className={styles.menu}>
                  {userPlaylists.map((playlist) => (
                    <div key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id, track.id)}>
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
  )
}
