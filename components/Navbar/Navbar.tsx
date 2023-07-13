"use client"

import styles from "./page.module.css"
import Link from 'next/link'
import React from 'react'
import { useSession, signOut  } from "next-auth/react"
import Darkmode from "@/components/Darkmode/Darkmode"

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {

  const session = useSession();
  
  return (
    <div className={styles.container}>
      <div>
        <Link href="/" className={styles.logo}>Nitin</Link>
      </div>
      <div className={styles.links}>
          <Darkmode></Darkmode>
          {
          links.map(link => {
            return <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
          })
          }
          { session.status === 'authenticated' &&
            <div className={styles.logout} onClick={() => {
              signOut();
            }}>Logout</div>
          }
      </div>
    </div>
  )
}

export default Navbar