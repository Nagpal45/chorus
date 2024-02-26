const { signOut, signIn, LOGIN_URL } = require("./auth");


export const handleGithubLogin  = async () =>{
    "use server"
    await signIn("spotify");
}

export const handleGithubLogout = async () =>{
    "use server"
    await signOut();
}