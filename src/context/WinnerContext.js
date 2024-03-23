// WinnerContext.js
"use client";
import React, { createContext, useState, useContext } from "react";

const WinnerContext = createContext();

export const WinnerProvider = ({ children }) => {
  const [winner, setWinner] = useState(null);

  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  );
};

export const useWinner = () => useContext(WinnerContext);
