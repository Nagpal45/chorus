"use client"

import { useEffect, useState } from "react"

export default function LikedSongs({session}) {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const f = async () =>{
      const response = await fetch('https://api.spotify.com/v1/me/tracks',{
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      const data = await response.json();
      console.log(data.items);
      setLikedSongs(data.items);
    }
    f();
  }, [session])
  return (
    <div className="container">
      {likedSongs?.map((item)=>(
        <div key = {item.id}>
          <p>{item?.track?.name}</p>
        </div>
      ))}
    </div>
  )
}
