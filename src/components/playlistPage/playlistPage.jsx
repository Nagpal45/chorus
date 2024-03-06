"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from './playlistPage.module.css';
import { usePathname } from "next/navigation";

export default function PlaylistPage({ session }) {
  const [input, setInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState(null);
  const [realImg, setRealImg] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([])
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState();
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handlePlaying = (index) => {
    setPlayingIndex(index);
  };

  const handleDropdown = (index) => {
    setSelectedTrack(index === selectedTrack ? null : index);
  };

  const handlePlaylistName = () => {
    setInput(true);
  };

  const pathName = usePathname();
  const playlistId = pathName.replace('/playlist/', '');

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlaylistName(data.name);
          setRealImg(data.images[0].url)
        } else {
          console.error("Failed to fetch playlist details:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId, session?.accessToken]);

  const updatePlaylistName = async () => {
    try {
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
        }),
      });
    } catch (error) {
      console.error("Error updating playlist name:", error);
    }
  };

  const updatePlaylistImage = async () => {
    try {
      if (!playlistImage) return;

      const reader = new FileReader();
    reader.readAsDataURL(playlistImage);
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];
  
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: base64Data,
      });
      
      if (!response.ok) {
        console.error("Failed to update playlist image:", response.status, response.statusText);
      }
    }
    } catch (error) {
      console.error("Error updating playlist image:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaylistImage(file);
    }
  };

  useEffect(()=>{
    updatePlaylistImage();
  },[handleImageChange])

  const handleClickOutside = async (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setInput(false);
      updatePlaylistName();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePlaylistName]);

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  };
useEffect(()=>{
  const playlistSongs = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setPlaylistItems(data.items);
    } else {
      console.error("Failed to fetch playlist details:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error fetching playlist details:", error);
  }
}
playlistSongs();
},[session])

const handleRemove = async (trackId) => {
  setSelectedTrack(null);
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ "tracks": [{ "uri": `spotify:track:${trackId}` }] }),
  });

  if (response.ok) {
    const updatedPlaylistItems = playlistItems.filter((item) => item.track.id !== trackId);
    setPlaylistItems(updatedPlaylistItems);
  } else {
    console.error("Failed to remove track from liked songs.");
  }
};

  return (
    <div className={styles.createPlaylist}>
      <div className={styles.top}>
        <div className={styles.imageWrapper} onClick={() => imageInputRef.current.click()}>
          {playlistImage || realImg ? (
            <Image src={playlistImage ? URL.createObjectURL(playlistImage) : realImg} alt="Playlist Image" width={200} height={200} />
          ) : (
            <Image src="/newPlaylist.png" width={200} height={200} alt="" />
          )}
        </div>
        <div className={styles.topText}>
          {input ? (
            <input
              type="text"
              ref={inputRef}
              value={playlistName}
              onChange={handleChange}
            />
          ) : (
            <h1 onClick={handlePlaylistName}>{playlistName}</h1>
          )}
          <div className={styles.userInfo}>
            <Image src={session?.user?.image} width={35} height={35} alt="" />
            <p>{session?.user?.name}</p>
          </div>
        </div>
        <input
          type="file"
          ref={imageInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className={styles.bottom}>
      <div className={styles.playlistSongs}>
        {playlistItems.length > 0 && (<div className={styles.playlistSongsHead}>
          <p className={styles.num}>#</p>
          <div className={styles.song}>
            <p>Track</p>
          </div>
          <p className={styles.album}>Album</p>
          <p className={styles.date}>Date Added</p>
          <p>Duration</p>
        </div>)}
        <div className={styles.sepLine}></div>
        {playlistItems?.map((item, index) => (
          <div key={item.id} className={styles.playlistSongItem}>
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
            <Image className={styles.dots} src="/three-dots.svg" width={15} height={15} alt="" onClick={() => handleDropdown(index)} />
            {selectedTrack === index && (
              <div className={styles.dropdown}>
                <div onClick={() => handleRemove(item.track.id)}>Remove from Playlist</div>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
