import React, { useContext } from 'react'
import styles from './darkmode.module.css'
import { ThemeContext } from '@/context/ThemeContext';

const Darkmode = () => {

  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
        <div className={styles.icon}>★</div>
        <div className={styles.icon}>&#127769;</div>
        <div className={`${styles.ball} ${mode === 'dark' ? styles.left : styles.right}`}  onClick={() => {
          toggle();
        }}></div>
    </div>
  )
}

export default Darkmode