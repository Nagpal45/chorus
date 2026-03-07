# 🎵 Chorus - AI Gesture-Controlled Music Player

**Chorus** is a modern music streaming application that completely redefines the listening experience. Built with Next.js 14 and powered by the Spotify Web API, it directly integrates cutting-edge AI hand-gesture recognition locally inside the browser. Users can play, pause, change tracks, and adjust volume purely through webcam capture—without touching a single key.

## ✨ Key Features
- **Hands-Free AI Control:** Uses TensorFlow.js and Fingerpose to analyze real-time video feeds from your webcam and trigger media player actions (Play/Pause, Next/Prev, Volume).
- **Spotify Ecosystem:** Seamlessly fetches track details, libraries, albums, playlists, and user metadata entirely via the Spotify Web API.
- **Full Authentication Stack:** Native credentials tracking built into a MongoDB database seamlessly paired with NextAuth sessions to persist Spotify Access Tokens.
- **Rich Media Library:** Navigate through dedicated views for Audiobooks, Albums, Artists, Playlists, Liked Songs, and user Profiles.
- **Global Audio State:** Persistent background music play and Context API logic (`GlobalSongContext`) meaning music rarely stops as you navigate.

## 🛠️ Technologies & Concepts Used

| Concept / Layer | Technology | Description |
| --- | --- | --- |
| **Framework** | [**Next.js 14**](https://nextjs.org/) | Leverages the modern App Router architecture (`src/app/` for layouts, pages, loading states, and API routes). |
| **UI Library & State** | [**React 18**](https://reactjs.dev/) | Utilizes Hooks (`useState`, `useRef`, `useEffect`) and Context API to seamlessly thread the current song and gestures globally. |
| **Machine Learning** | [**TensorFlow.js**](https://www.tensorflow.org/js) | In-browser machine learning running `@tensorflow-models/handpose` for rapid 21-point 3D hand map generation without heavy server latency. |
| **Gesture Estimation** | [**Fingerpose**](https://github.com/andypotato/fingerpose) | Defines specific combinations of finger curls and directions (e.g. thumb up, pinch) to trigger actual media commands. |
| **Authentication** | [**NextAuth.js (v5 Beta)**](https://authjs.dev/) | Secure multi-provider capabilities specifically handling Spotify OAuth access tokens securely in `session`. |
| **Database** | [**MongoDB** & **Mongoose**](https://mongoosejs.com/) | NoSQL database connection handling custom internal users schema logic (`src/lib/models.js`). |
| **Styling** | **CSS Modules** | Strict component-level scoping ensuring that styles for sidebars, the player, and libraries do not conflict or cascade poorly. |
| **Media Fetching** | **Spotify Web API** | Native REST endpoints using `fetch` to retrieve tracks, artwork, and profile features directly from the client and server. |

## ✌️ Supported Hand Gestures
Once camera permissions are enabled in-browser, the TFJS model tracks your hand movements and runs predictions every 10 milliseconds:
*   **Play Symbol:** Resumes track execution.
*   **Pause Symbol:** Halts media.
*   **Swipe/Point Left/Right:** Navigates to the Previous or Next item in your global tracks queue. 
*   **Volume Modifiers:** Upward / Downward logic alters HTML Audio element properties seamlessly.

*(Note: Python backend scripts such as `app.py` using MediaPipe logic are also included for deeper experimentation/development testing inside the `gestureModel` directory).*

## 🚀 Setup & Installation

### Prerequisites
1. **Node.js**: Version 18.x or above.
2. **MongoDB**: A local instance or cloud URI (MongoDB Atlas).
3. **Spotify Developer App**: Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and note down the Client ID and Secret.

### Local Development Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd chorus
   ```

2. **Install Dependencies**
   Running NPM cleanly pulls down TFJS, NextAuth, Mongoose, and more:
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` or `.env.local` file at the root level. Be sure to replace the placeholder values:
   ```env
   AUTH_SECRET="your_nextauth_secret_random_string"
   MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/chorus"
   
   SPOTIFY_CLIENT_ID="your_spotify_app_id"
   SPOTIFY_CLIENT_SECRET="your_spotify_app_secret"
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

5. **Start Grooving!**
   Navigate to [http://localhost:3000](http://localhost:3000). Log in, open the gesture controls window, grant webcam access, and play your music completely hands-free!
   
---
*Built intricately with modern React concepts and JavaScript Ecosystem tools.*

