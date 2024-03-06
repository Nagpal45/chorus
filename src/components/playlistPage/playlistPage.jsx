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
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);

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

 

  return (
    <div className={styles.createPlaylist}>
      <div className={styles.top}>
        <div className={styles.imageWrapper} onClick={() => imageInputRef.current.click()}>
          {playlistImage || realImg ? (
            <Image src={playlistImage ? URL.createObjectURL(playlistImage) : realImg} alt="Playlist Image" width={220} height={220} />
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
      <div className={styles.bottom}></div>
    </div>
  );
}
