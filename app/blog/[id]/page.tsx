import Image from "next/image"
import styles from "./page.module.css"
import React from 'react'
import { notFound } from "next/navigation";

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    return notFound();
  }
  return res.json()
}

export async function generateMetadata({ params }: {
  params: {
    id: string
  }
}) {

  const post = await getData(params.id)

  return {
    title: post.title,
    description: post.desc
  }
}

const BlogPost = async({
  params
}: {
  params: {
    id: string
  }
}) => {

  const data = await getData(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data?.title}</h1>
          <p className={styles.desc}>
          {data?.desc}
          </p>
          <div className={styles.author}>
            <Image
              src="/1.png"
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data?.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data?.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data?.content}
        </p>
      </div>
    </div>
  )
}

export default BlogPost