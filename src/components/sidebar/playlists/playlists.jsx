"use client";
import styles from "./playlist.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Playlists({ session }) {
  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.json();
      setPlaylists(data.items);
    };
    fetchData();
  }, [session]);

  const handleOpenPage = (id) =>{
    router.push(`/playlist/${id}`)
  }

  return (
    <div className={styles.playlist}>
      {playlists?.map((item) => (
        <div key={item.id} className={styles.playlistItem} onClick={()=>handleOpenPage(item.id)}>
          <Image src={item?.images[0]?.url || "/newPlaylist.png" } alt="" width={40} height={40} />
          <div className={styles.playlistName}>
            <p>{item?.name.slice(0,17)}{item?.name?.length > 17 ? '...':''}</p>
            <p>{item?.owner?.display_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
