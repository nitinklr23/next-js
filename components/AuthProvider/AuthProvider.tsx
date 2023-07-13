"use client"

import React from 'react'
import { useState, useCallback, useContext } from 'react';
import { SessionProvider } from "next-auth/react"
import LoadingOverlay from 'react-loading-overlay-ts';
import { ThemeContext } from '@/context/ThemeContext';

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const { isActiveLoader } = useContext(ThemeContext);

  return (
    <SessionProvider>
       <LoadingOverlay
          active={isActiveLoader}
          spinner
          text='Please Wait...'
        >
        {children}
      </LoadingOverlay>
    </SessionProvider>
  )
}

export default AuthProvider