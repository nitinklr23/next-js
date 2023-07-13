import styles from "./page.module.css"
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>@2023 All Right Reserverd</div>
      <div className={styles.social}>
        <Image src="/1.png" width={15} height={15} className={styles.icon} alt='Facebook'></Image>
        <Image src="/2.png" width={15} height={15} className={styles.icon} alt='Facebook'></Image>
        <Image src="/3.png" width={15} height={15} className={styles.icon} alt='Facebook'></Image>
        <Image src="/4.png" width={15} height={15} className={styles.icon} alt='Facebook'></Image>
      </div>
    </div>
  )
}

export default Footer