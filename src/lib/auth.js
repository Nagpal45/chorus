import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";


const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-library-read",
  "user-library-modify",
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "ugc-image-upload"
].join(",");

const params = {
  scope: scopes,
};

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", token.refreshToken)
  const response = await fetch('https://accounts.spotify.com/api/token',{
    method:"POST",
    headers:{
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: params
  })
  const data = await response.json()
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  pages:{
    signIn:"/login"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
