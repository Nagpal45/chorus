"use client"
import { handleSpotifyLogin, login, register } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";
import styles from './loginRegister.module.css'

export default function LoginRegister() {
  const [loginForm, setLoginForm] = useState(false);
  

  const handleChangeToLogin = () => {
    setLoginForm(true);
  };
  return (
    <div className="main">
      <div className={styles.login}>
        <div className={styles.homeButton}>
          <Image width="30" height="30" src="/audio-waves.png" alt="" />
          <p>Chorus</p>
        </div>
        <div className={styles.right}>
          <div className={styles.rightContainer}>
            <p>Join Us</p>
            <form action={handleSpotifyLogin} className={styles.loginButton}>
              <button>Login with Spotify</button>
            </form>
            {loginForm ? (<form className={styles.register} action={login}>
              <input type="text" placeholder="username" name="username" />
              <input type="password" placeholder="password" name="password" />
              <button onClick={handleChangeToLogin}>Login</button>
            </form>):(
                <form className={styles.register} action={handleSpotifyLogin}>
              <input type="text" placeholder="username" name="username" />
              <input type="text" placeholder="email" name="email" />
              <input type="password" placeholder="password" name="password" />
              <input
                type="password"
                placeholder="confirm password"
                name="passwordRepeat"
              />
              <button>Register</button>
            </form>
            )}
          </div>
        </div>
        <div className={styles.left}>
          <Image src="/banner.jpg" width={1000} height={1000} alt="" />
        </div>
      </div>
    </div>
  );
}
