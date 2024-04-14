"use client";

import Image from "next/image";
import styles from "./playSection.module.css";
import { useState, useRef, useEffect } from "react";
import { useGlobalSong } from "@/app/globalSongContext";
export default function PlaySection({ session }) {
  const { globalSongID, globalSongs, globalIndex, setGlobalSongID } =
    useGlobalSong();
  const [songData, setSongData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const songs = globalSongs;
  useEffect(() => {
    setCurrentSongIndex(globalIndex);
  }, [globalIndex]);
  console.log(songData);
  console.log(songs);
  console.log(currentSongIndex);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const nextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setGlobalSongID(songs[currentSongIndex].track.id);
  };

  const prevSong = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setGlobalSongID(songs[currentSongIndex].track.id);
  };

  useEffect(() => {
    const fetchSongData = async () => {
      if (globalSongID) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/tracks/${globalSongID}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setSongData(data);
            setIsPlaying(true);
          } else {
            console.error("Failed to fetch song data.");
          }
        } catch (error) {
          console.error("Error fetching song data:", error);
        }
      }
    };
    fetchSongData();
  }, [globalSongID, session]);

  useEffect(() => {
    if (songData) {
      audioRef.current.play();
    }
  }, [songData]);

  const updateTime = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className={styles.section}>
      <div className={styles.player}>
        <div className={styles.song}>
          <Image
            className={styles.songimage}
            src={songData?.album?.images[0]?.url || "/newPlaylist.png"}
            alt={songData?.name}
            width={45}
            height={45}
          />
          <div className={styles.songinfo}>
            <p className={styles.name}>{songData?.name}</p>
            <p className={styles.artist}>{songData?.artists[0]?.name}</p>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={songData?.preview_url}
          onTimeUpdate={updateTime}
          onEnded={() => setIsPlaying(false)}
        ></audio>
        <div className={styles.controls}>
          <button onClick={prevSong}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="bi bi-skip-backward"
              viewBox="0 0 16 16"
            >
              <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m7 1.133L1.696 8 7.5 11.367zm7.5 0L9.196 8 15 11.367z" />
            </svg>
          </button>
          <button className={styles.play} onClick={togglePlay}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                className="bi bi-pause-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                className="bi bi-play-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
              </svg>
            )}{" "}
          </button>
          <button onClick={nextSong}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="bi bi-skip-forward"
              viewBox="0 0 16 16"
            >
              <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5M1 4.633v6.734L6.804 8zm7.5 0v6.734L14.304 8z" />
            </svg>
          </button>
        </div>
        <div
          className={styles.progress}
          style={{
            width: `${progress}% `,
          }}
        ></div>
        <div className={styles.right}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgb(150, 150, 150)"
            className="bi bi-volume-up"
            viewBox="0 0 16 16"
          >
            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
            <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11" />
          </svg>
          <input
            className={styles.volume}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
