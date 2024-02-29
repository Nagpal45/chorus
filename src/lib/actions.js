'use server'
const { signOut, signIn } = require("./auth");

export const handleSpotifyLogin  = async () =>{
    await signIn("spotify",{redirectTo: '/'});
}

export const handleSpotifyLogout = async () =>{
    await signOut({redirectTo:'/'});
}