from flask import Flask, request, jsonify
import cv2
import numpy as np
import mediapipe as mp
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.5)

def calculate_gesture(landmarks):
  thumb_tip = landmarks[mp_hands.HandLandmark.THUMB_TIP.value]
  index_tip = landmarks[mp_hands.HandLandmark.INDEX_FINGER_TIP.value]
  middle_tip = landmarks[mp_hands.HandLandmark.MIDDLE_FINGER_TIP.value]

  distance = np.linalg.norm(np.array([thumb_tip.x, thumb_tip.y]) - np.array([index_tip.x, index_tip.y]))

  if thumb_tip.y < index_tip.y and thumb_tip.y < middle_tip.y:
    return "Play"

  if thumb_tip.y > index_tip.y and thumb_tip.y > middle_tip.y:
    return "Pause"

  if thumb_tip.x < index_tip.x:
    return "Volume Up"
  if thumb_tip.x > index_tip.x:
    return "Volume Down"

  if index_tip.y < middle_tip.y:
    if index_tip.x < middle_tip.x:
      return "Previous"
    if index_tip.x > middle_tip.x:
      return "Next"

  return "No Gesture Detected"

@app.route('/api/recognize-gesture', methods=['POST'])
def recognize_gesture():
  data = request.get_data()

  # Decode image data from base64 (adjust based on your encoding)
  try:
    image_bytes = base64.b64decode(data)
    image_arr = np.frombuffer(image_bytes, dtype=np.uint8)
    img = cv2.imdecode(image_arr, cv2.IMREAD_COLOR)
  except Exception as e:
    print(f"Error decoding image: {e}")
    return jsonify({'gesture': 'Error Decoding Image'}), 400  # Bad request

  # Process the image for gesture recognition
  image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB for MediaPipe
  results = hands.process(image)

  if results.multi_hand_landmarks:
    for hand_landmarks in results.multi_hand_landmarks:
      gesture = calculate_gesture(hand_landmarks.landmark)
      return jsonify({'gesture': gesture})

  return jsonify({'gesture': 'No Gesture Detected'})

if __name__ == '__main__':
  app.run(debug=True)

