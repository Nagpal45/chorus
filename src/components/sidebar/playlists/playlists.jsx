"use client";
import styles from "./playlist.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Playlists({ session }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data.items);
      setPlaylists(data.items);
    };
    fetchData();
  }, [session]);

  return (
    <div className={styles.playlist}>
      {playlists?.map((item) => (
        <div key={item.id} className={styles.playlistItem}>
          <Image src={item?.images[0]?.url} alt="" width={40} height={40} />
          <div className={styles.playlistName}>
            <p>{item?.name}</p>
            <p>{item?.owner?.display_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
