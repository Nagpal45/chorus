"use client"
import React, { createContext, useContext, useState } from 'react';

const GlobalSongContext = createContext();

export const useGlobalSong = () => useContext(GlobalSongContext);

export const GlobalSongProvider = ({ children }) => {
  const [globalSongID, setGlobalSongID] = useState('5bJ1DrEM4hNCafcDd1oxHx');

  return (
    <GlobalSongContext.Provider value={{ globalSongID, setGlobalSongID }}>
      {children}
    </GlobalSongContext.Provider>
  );
};
