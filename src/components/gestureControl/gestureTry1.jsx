"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './gestureControl.module.css';

export default function Gesture() {
  const [gesture, setGesture] = useState('No Gesture Detected');
  const videoRef = useRef(null);

  useEffect(() => {
    const handleGestureRecognition = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const sendFrame = async (frame) => {
              try {
                const base64Data = frame.split(',')[1]; 
                const response = await fetch('http://localhost:5000/api/recognize-gesture', {
                  method: 'POST',
                  body: base64Data,
                });

                const recognizedGesture = await response.json();
                setGesture(recognizedGesture.gesture);
              } catch (error) {
                console.error('Error communicating with backend:', error);
              }
            };

            const drawFrame = () => {
              if (videoRef.current.paused || videoRef.current.ended) return;

              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              context.drawImage(videoRef.current, 0, 0);

              // Capture frame data (adjust quality as needed)
              const frame = canvas.toDataURL('image/jpeg', 0.5); 

              sendFrame(frame);

              requestAnimationFrame(drawFrame);
            };

            drawFrame();
          })
          .catch(error => {
            console.error('Error accessing webcam:', error);
          });
      } else {
        console.error('getUserMedia not supported');
      }
    };

    handleGestureRecognition();
  }, []);

  return (
    <div className={styles.section}>
      <video ref={videoRef} width="250" autoPlay muted />
      <p>Detected Gesture: {gesture}</p>
    </div>
  );
}
