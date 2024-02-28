const { signOut, signIn } = require("./auth");

export const handleSpotifyLogin  = async () =>{
    "use server"
    await signIn("spotify",{callbackUrl: '/'});
}

export const handleSpotifyLogout = async () =>{
    "use server"
    await signOut();
}