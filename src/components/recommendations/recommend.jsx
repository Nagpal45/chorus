"use client"
import { useState, useEffect } from 'react';
import styles from './recommend.module.css';
import Image from 'next/image';
import { useGlobalSong } from '@/app/globalSongContext';

const emotion_mapping = {
  "happy": ["pop", "upbeat", "dance"],
  "sad": ["acoustic", "piano", "sad"],
  "angry": ["rock", "metal", "rap"],
  "relaxed": ["chill", "ambient", "jazz"],
  "energetic": ["electronic", "party", "hip-hop"]
};

export default function Recommendations({ session }) {
  const [genres, setGenres] = useState(emotion_mapping["happy"]);
  const [recommendations, setRecommendations] = useState([]);
  const [liked, setLiked] = useState([]);
  const [selectedMood, setSelectedMood] = useState("happy");
  const { setGlobalSongID, setGlobalIndex, setGlobalSongs, globalIndex } = useGlobalSong();

  const handleLike = async (index) => {
    try {
      const trackId = recommend[index]?.id;
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
    setGlobalSongs(recommendations);
    setGlobalIndex(index);
  };

  useEffect(() => {
    const fetchRecommend = async () => {
      if (genres) {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(',')}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setRecommendations(data.tracks);
      }
    };
    fetchRecommend();
  }, [session, genres]);

  const handleMoodClick = (mood) => {
    setGenres(emotion_mapping[mood]);
    setSelectedMood(mood);
  };

  return (
    <div className={styles.recommend}>
    <h3>How&apos;s your mood today?</h3>
    <div className={styles.moods}>
        {Object.keys(emotion_mapping).map((mood) => (
          <div
            key={mood}
            className={`${styles.moodItem} ${selectedMood === mood ? styles.selectedMood : ''}`}
            onClick={() => handleMoodClick(mood)}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </div>
        ))}
      </div>
      <div className={styles.recommendations}>
      {recommendations?.map((item, index) => (
            <div className={styles.songsListItem} key={item.id}>
              {globalIndex === index ? (
                <Image className={styles.num} src="/equaliser.gif" height={20} width={27} style={{opacity:"0.9"}} alt=""/>
              ) : (
                <p className={styles.songNum}>{index + 1}</p>
              )}
              {liked[index] ? (
                <Image
                  src="heart-fill.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                />
              ) : (
                <Image
                  src="heart-outline.svg"
                  width={15}
                  height={15}
                  alt=""
                  onClick={() => handleLike(index)}
                />
              )}
              <div className={styles.song} onClick={() => handlePlaying(index, item.id)}>
                <p>{item?.name}</p>
                <p>
                  {item?.artists.length > 1
                    ? `${item?.artists[0]?.name}, ${item?.artists[1]?.name}`
                    : item?.artists[0]?.name}
                </p>
              </div>
              <Image src="three-dots.svg" width={15} height={15} alt="" className={styles.dots}/>
              <p className={styles.time}>3:05</p>
            </div>
          ))}
      </div>
    </div>
  );
}
