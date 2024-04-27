'use client'
import styles from "./library.module.css";
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

  const handleOpenPage = (id) => {
    router.push(`/playlist/${id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.headSection}>
      <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                className={styles.svg}
                viewBox="0 0 16 16"
              >
                <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                <path d="M9 3v10H8V3z" />
                <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
              </svg> <p className={styles.heading}>Library</p>
      </div>
      <div className={styles.playlistGrid}>
        {playlists.map((item) => (
          <div className={styles.playlistItem} key={item.id} onClick={() => handleOpenPage(item.id)}>
            <div className={styles.playlistTile}>
              <div className={styles.playlistImage}>
                {item.images && item.images.length > 0 ? (
                  <Image src={item.images[0].url} alt="" width={200} height={200} />
                ) : (
                  <Image src="/newPlaylist.png" alt="" width={100} height={100} />
                )}
              </div>
              <div className={styles.playlistDetails}>
                <p className={styles.playlistTitle}>{item.name}</p>
                <p className={styles.playlistAuthor}>{item.owner.display_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
