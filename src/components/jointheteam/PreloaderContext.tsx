"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface PreloaderCtx {
  done: boolean;
  markDone: () => void;
}

const PreloaderContext = createContext<PreloaderCtx>({
  done: false,
  markDone: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const markDone = useCallback(() => setDone(true), []);

  return (
    <PreloaderContext.Provider value={{ done, markDone }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
