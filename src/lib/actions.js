'use server'
const { signOut, signIn, auth } = require("./auth");

export const handleSpotifyLogin  = async () =>{
    await signIn("spotify",{redirectTo: '/'});
}

export const handleSpotifyLogout = async () =>{
    await signOut({redirectTo:'/'});
}


export const getUserId = async () =>{
    const session = await auth();
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await response.json();
    return data.id;
  }