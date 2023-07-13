"use client"

import React, { useContext } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import useSWR from 'swr';
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext';

const Blog = () => {
 
  const { showLoader, hideLoader } = useContext(ThemeContext);

  const fetcher = (...args: any) => fetch(...[args] as const).then(res => res.json())

  const { data, error, isLoading } = useSWR('http://localhost:3000/api/posts', fetcher)

  if(isLoading) {
    showLoader();
  } else {
    hideLoader();
  }
 
  
  return (
    <div  className={styles.mainContainer}>
      { !isLoading && data && data.map((item: any) => {
        return <Link href={`/blog/${item._id}`} key={item._id} className={styles.container} >
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.desc}</p>
            </div>
        </Link>
      })
      }
    </div>
  )
}

export default Blog