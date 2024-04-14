'use server'

import { User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt"

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


  export const register = async(formData) =>{
    const {username, email, password, passwordRepeat} = Object.fromEntries(formData);

    if(password != passwordRepeat){
        return "Password doesn't match";
    }

    try{
        connectToDb();
        const user = await User.findOne({username});
        if(user){
            return "User exists";
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword
        })
        await newUser.save();
        console.log("saved");
    }catch(err){
        console.log(err);
    }
  }

  export const login = async(previousState, formData) =>{
    const {username, password} = Object.fromEntries(formData);

    try{
        await signIn("credentials",{
            username, password
        })
    }catch(err){
        if(err.message.includes("CredentialsSignin")){
            return {error: "Invalid username or password"}
        }
        throw err;
        //prevent NEXT_REDIRECT error
    }
}