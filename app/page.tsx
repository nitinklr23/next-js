import Image from 'next/image'
import styles from "./page.module.css"; 
import Hero from "public/hero.png";
import React from 'react'
import Button from "@/components/Button/Button"


const Home = () => {
  return (
    <div>
      <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url="/portfolio" text="See Our Works"></Button>
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} />
      </div>
    </div>
    </div>
  )
}

export default Home