"use client"
import React, { createContext, useContext, useState } from 'react';

const GlobalSongContext = createContext();

export const useGlobalSong = () => useContext(GlobalSongContext);

export const GlobalSongProvider = ({ children }) => {
  const [globalSongID, setGlobalSongID] = useState('');
  const [globalSongs, setGlobalSongs] = useState([]);
  const [globalIndex, setGlobalIndex] = useState(null);
  const [currGest, setCurrGest] = useState(null);

  return (
    <GlobalSongContext.Provider value={{ globalSongID, setGlobalSongID, globalSongs, setGlobalSongs, globalIndex, setGlobalIndex, currGest, setCurrGest }}>
      {children}
    </GlobalSongContext.Provider>
  );
};
