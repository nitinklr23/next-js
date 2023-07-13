"use client"

import { createContext, useState } from "react";

interface IThemeContext {
  mode: string
  isActiveLoader: boolean
  toggle(): void
  showLoader(): void
  hideLoader(): void
}

export const ThemeContext = createContext<IThemeContext>({
  mode: '',
  toggle() {},
  showLoader() {},
  hideLoader() {},
  isActiveLoader: false
});

export const ThemeProvider = ({children}: {
  children: React.ReactNode
}) =>  {

  const [mode, setMode] = useState('dark');

  const [isActiveLoader, setActiveLoader] = useState(false);

  const toggle = () => {
     setMode(mode === 'dark' ? 'light': 'dark')
  };

  const showLoader = () => {
    setActiveLoader(true)
  };

  const hideLoader = () => {
    setActiveLoader(false)
  };

  return (
    <ThemeContext.Provider value={{mode, toggle, isActiveLoader, showLoader, hideLoader}}>
      <div className={`theme ${mode}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )

};