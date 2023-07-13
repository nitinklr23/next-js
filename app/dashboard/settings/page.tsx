"use client"

import styles from "./page.module.css"
import React, {useEffect, useState } from 'react'
import useSWR from 'swr'


const Settings = () => {

  const fetcher = (...args: any) => fetch(...[args] as const).then(res => res.json())

  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)
 
  console.log(data);
  
  return (
    <div>Settings</div>
  )
}

export default Settings